import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "../../../db";
import { companies, memberships, refreshSessions, users } from "../../../db/schema";
import type { Role } from "../../../types/auth";

type DbExecutor = typeof db;

export type SignupContext = {
	companyId: string;
	companyName: string;
	companySlug: string;
	userId: string;
	membershipId: string;
	fullName: string;
	email: string;
	emailNormalized: string;
	passwordHash: string;
	role: Role;
};

type RefreshSessionInsert = {
	id: string;
	userId: string;
	companyId: string;
	tokenHash: string;
	expiresAt: Date;
	userAgent?: string;
	ipAddress?: string;
};

export const createAuthRepository = (executor: DbExecutor = db) => {
	return {
		async findCompanyBySlug(slug: string) {
			const result = await executor
				.select({
					id: companies.id,
				})
				.from(companies)
				.where(eq(companies.slug, slug))
				.limit(1);

			return result[0] ?? null;
		},

		async findUserByEmailNormalized(emailNormalized: string) {
			const result = await executor
				.select({
					id: users.id,
				})
				.from(users)
				.where(eq(users.emailNormalized, emailNormalized))
				.limit(1);

			return result[0] ?? null;
		},

		async createSignupContext(payload: SignupContext) {
			await executor.insert(companies).values({
				id: payload.companyId,
				name: payload.companyName,
				slug: payload.companySlug,
			});

			await executor.insert(users).values({
				id: payload.userId,
				fullName: payload.fullName,
				email: payload.email,
				emailNormalized: payload.emailNormalized,
				passwordHash: payload.passwordHash,
			});

			await executor.insert(memberships).values({
				id: payload.membershipId,
				companyId: payload.companyId,
				userId: payload.userId,
				role: payload.role,
				status: "active",
			});
		},

		async findLoginProfile(emailNormalized: string) {
			const result = await executor
				.select({
					userId: users.id,
					fullName: users.fullName,
					email: users.email,
					passwordHash: users.passwordHash,
					isActive: users.isActive,
					companyId: memberships.companyId,
					role: memberships.role,
					membershipStatus: memberships.status,
				})
				.from(users)
				.innerJoin(memberships, eq(memberships.userId, users.id))
				.where(
					and(
						eq(users.emailNormalized, emailNormalized),
						eq(users.isActive, true),
						eq(memberships.status, "active"),
					),
				)
				.limit(1);

			return result[0] ?? null;
		},

		async createRefreshSession(payload: RefreshSessionInsert) {
			await executor.insert(refreshSessions).values({
				id: payload.id,
				userId: payload.userId,
				companyId: payload.companyId,
				tokenHash: payload.tokenHash,
				expiresAt: payload.expiresAt,
				userAgent: payload.userAgent,
				ipAddress: payload.ipAddress,
			});
		},

		async findActiveRefreshSession(sessionId: string, tokenHash: string) {
			const now = new Date();
			const result = await executor
				.select({
					id: refreshSessions.id,
					userId: refreshSessions.userId,
					companyId: refreshSessions.companyId,
				})
				.from(refreshSessions)
				.where(
					and(
						eq(refreshSessions.id, sessionId),
						eq(refreshSessions.tokenHash, tokenHash),
						isNull(refreshSessions.revokedAt),
						gt(refreshSessions.expiresAt, now),
					),
				)
				.limit(1);

			return result[0] ?? null;
		},

		async rotateRefreshSession(
			sessionId: string,
			currentTokenHash: string,
			nextTokenHash: string,
			expiresAt: Date,
			userAgent?: string,
			ipAddress?: string,
		) {
			const result = await executor
				.update(refreshSessions)
				.set({
					tokenHash: nextTokenHash,
					expiresAt,
					lastUsedAt: new Date(),
					userAgent,
					ipAddress,
				})
				.where(
					and(
						eq(refreshSessions.id, sessionId),
						eq(refreshSessions.tokenHash, currentTokenHash),
						isNull(refreshSessions.revokedAt),
					),
				)
				.returning({ id: refreshSessions.id });

			return result.length > 0;
		},

		async revokeRefreshSession(sessionId: string, tokenHash: string) {
			await executor
				.update(refreshSessions)
				.set({
					revokedAt: new Date(),
					lastUsedAt: new Date(),
				})
				.where(
					and(
						eq(refreshSessions.id, sessionId),
						eq(refreshSessions.tokenHash, tokenHash),
						isNull(refreshSessions.revokedAt),
					),
				);
		},

		async findUserInCompany(userId: string, companyId: string) {
			const result = await executor
				.select({
					userId: users.id,
					fullName: users.fullName,
					email: users.email,
					isActive: users.isActive,
					role: memberships.role,
					membershipStatus: memberships.status,
				})
				.from(users)
				.innerJoin(memberships, eq(memberships.userId, users.id))
				.where(
					and(
						eq(users.id, userId),
						eq(memberships.companyId, companyId),
						eq(users.isActive, true),
						eq(memberships.status, "active"),
					),
				)
				.limit(1);

			return result[0] ?? null;
		},
	};
};
