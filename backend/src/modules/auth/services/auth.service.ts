import argon2 from "argon2";
import { createHash } from "node:crypto";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { v7 as uuidv7 } from "uuid";
import { env } from "../../../config/env";
import { db } from "../../../db";
import { createAuthRepository } from "../repositories/auth.repository";
import type { LoginBody, SignupCompanyBody } from "../schemas/auth.schema";
import type { AuthClaims, Role } from "../../../types/auth";
import { AppError } from "../../../utils/AppError";

type RequestMeta = {
	userAgent?: string;
	ipAddress?: string;
};

type AuthResult = {
	accessToken: string;
	refreshToken: string;
	refreshExpiresAt: Date;
	user: {
		id: string;
		fullName: string;
		email: string;
		companyId: string;
		role: Role;
	};
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const slugify = (value: string) =>
	value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);

const hashToken = (token: string) =>
	createHash("sha256").update(token).digest("hex");

const decodeExpiry = (token: string, secret: string) => {
	const decoded = jwt.verify(token, secret) as JwtPayload;
	if (typeof decoded.exp !== "number") {
		throw new AppError("Token missing expiration", 401);
	}
	return new Date(decoded.exp * 1000);
};

const buildClaims = (
	userId: string,
	companyId: string,
	role: Role,
	sessionId: string,
): Omit<AuthClaims, "iat" | "exp"> => ({
	sub: userId,
	companyId,
	role,
	sessionId,
});

const signAccessToken = (claims: Omit<AuthClaims, "iat" | "exp">) =>
	jwt.sign(claims, env.JWT_ACCESS_SECRET, {
		expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"],
	});

const signRefreshToken = (claims: Omit<AuthClaims, "iat" | "exp">) =>
	jwt.sign(claims, env.JWT_REFRESH_SECRET, {
		expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
	});

const issueSession = async (
	repository: ReturnType<typeof createAuthRepository>,
	userId: string,
	companyId: string,
	role: Role,
	meta: RequestMeta,
): Promise<AuthResult> => {
	const sessionId = uuidv7();
	const claims = buildClaims(userId, companyId, role, sessionId);
	const accessToken = signAccessToken(claims);
	const refreshToken = signRefreshToken(claims);
	const refreshExpiresAt = decodeExpiry(refreshToken, env.JWT_REFRESH_SECRET);

	await repository.createRefreshSession({
		id: sessionId,
		userId,
		companyId,
		tokenHash: hashToken(refreshToken),
		expiresAt: refreshExpiresAt,
		userAgent: meta.userAgent,
		ipAddress: meta.ipAddress,
	});

	const userRecord = await repository.findUserInCompany(userId, companyId);
	if (!userRecord) {
		throw new AppError("User not found in company context", 401);
	}

	return {
		accessToken,
		refreshToken,
		refreshExpiresAt,
		user: {
			id: userRecord.userId,
			fullName: userRecord.fullName,
			email: userRecord.email,
			companyId,
			role: userRecord.role as Role,
		},
	};
};

const parseRefreshClaims = (token: string): Omit<AuthClaims, "iat" | "exp"> => {
	const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);
	if (typeof payload === "string") {
		throw new AppError("Invalid token payload", 401);
	}
	const { sub, companyId, role, sessionId } = payload as Partial<AuthClaims>;
	if (!sub || !companyId || !role || !sessionId) {
		throw new AppError("Invalid token claims", 401);
	}
	return { sub, companyId, role, sessionId };
};

export const authService = {
	async signupCompany(input: SignupCompanyBody, meta: RequestMeta): Promise<AuthResult> {
		const companySlug = input.companySlug ?? slugify(input.companyName);
		if (!companySlug) {
			throw new AppError("Company slug is invalid", 400);
		}

		const emailNormalized = normalizeEmail(input.email);

		try {
			return await db.transaction(async (tx) => {
				const repository = createAuthRepository(tx as unknown as typeof db);

				const existingCompany = await repository.findCompanyBySlug(companySlug);
				if (existingCompany) {
					throw new AppError("Company slug already exists", 409);
				}

				const existingUser = await repository.findUserByEmailNormalized(emailNormalized);
				if (existingUser) {
					throw new AppError("Email already exists", 409);
				}

				const companyId = uuidv7();
				const userId = uuidv7();
				const membershipId = uuidv7();
				const passwordHash = await argon2.hash(input.password, {
					type: argon2.argon2id,
				});

				await repository.createSignupContext({
					companyId,
					companyName: input.companyName.trim(),
					companySlug,
					userId,
					membershipId,
					fullName: input.fullName.trim(),
					email: input.email.trim(),
					emailNormalized,
					passwordHash,
					role: "company_admin",
				});

				return issueSession(
					repository,
					userId,
					companyId,
					"company_admin",
					meta,
				);
			});
		} catch (error) {
			if (error instanceof AppError) {
				throw error;
			}
			if (
				typeof error === "object" &&
				error !== null &&
				"code" in error &&
				(error as { code?: string }).code === "23505"
			) {
				throw new AppError("Account data already exists", 409);
			}
			throw new AppError("Unable to create account", 500);
		}
	},

	async login(input: LoginBody, meta: RequestMeta): Promise<AuthResult> {
		const repository = createAuthRepository();
		const emailNormalized = normalizeEmail(input.email);
		const profile = await repository.findLoginProfile(emailNormalized);

		if (!profile) {
			throw new AppError("Invalid credentials", 401);
		}

		const passwordValid = await argon2.verify(profile.passwordHash, input.password);
		if (!passwordValid) {
			throw new AppError("Invalid credentials", 401);
		}

		if (!profile.isActive || profile.membershipStatus !== "active") {
			throw new AppError("Account is not active", 403);
		}

		return issueSession(
			repository,
			profile.userId,
			profile.companyId,
			profile.role as Role,
			meta,
		);
	},

	async refreshSession(refreshToken: string, meta: RequestMeta): Promise<AuthResult> {
		const claims = parseRefreshClaims(refreshToken);
		const currentTokenHash = hashToken(refreshToken);

		return db.transaction(async (tx) => {
			const repository = createAuthRepository(tx as unknown as typeof db);
			const currentSession = await repository.findActiveRefreshSession(
				claims.sessionId,
				currentTokenHash,
			);

			if (!currentSession) {
				throw new AppError("Refresh session is invalid", 401);
			}

			const nextRefreshToken = signRefreshToken(claims);
			const nextRefreshExpiresAt = decodeExpiry(
				nextRefreshToken,
				env.JWT_REFRESH_SECRET,
			);
			const nextTokenHash = hashToken(nextRefreshToken);

			const rotated = await repository.rotateRefreshSession(
				claims.sessionId,
				currentTokenHash,
				nextTokenHash,
				nextRefreshExpiresAt,
				meta.userAgent,
				meta.ipAddress,
			);

			if (!rotated) {
				throw new AppError("Refresh session rotation failed", 401);
			}

			const accessToken = signAccessToken(claims);
			const userRecord = await repository.findUserInCompany(
				currentSession.userId,
				currentSession.companyId,
			);

			if (!userRecord) {
				throw new AppError("User not found", 401);
			}

			return {
				accessToken,
				refreshToken: nextRefreshToken,
				refreshExpiresAt: nextRefreshExpiresAt,
				user: {
					id: userRecord.userId,
					fullName: userRecord.fullName,
					email: userRecord.email,
					companyId: currentSession.companyId,
					role: userRecord.role as Role,
				},
			};
		});
	},

	async logout(refreshToken: string | undefined) {
		if (!refreshToken) {
			return;
		}

		try {
			const claims = parseRefreshClaims(refreshToken);
			const tokenHash = hashToken(refreshToken);
			const repository = createAuthRepository();
			await repository.revokeRefreshSession(claims.sessionId, tokenHash);
		} catch {
			// Logging out should be idempotent and safe if token is already invalid.
		}
	},

	async getMe(userId: string, companyId: string) {
		const repository = createAuthRepository();
		const userRecord = await repository.findUserInCompany(userId, companyId);

		if (!userRecord) {
			throw new AppError("User not found", 404);
		}

		if (userRecord.membershipStatus !== "active") {
			throw new AppError("Membership is not active", 403);
		}

		return {
			id: userRecord.userId,
			fullName: userRecord.fullName,
			email: userRecord.email,
			companyId,
			role: userRecord.role as Role,
		};
	},
};
