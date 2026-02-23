import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { AuthClaims, Role } from "../types/auth";
import { AppError } from "../utils/AppError";

const extractBearerToken = (authorizationHeader?: string) => {
	if (!authorizationHeader) {
		return null;
	}
	const [scheme, token] = authorizationHeader.split(" ");
	if (scheme !== "Bearer" || !token) {
		return null;
	}
	return token;
};

const parseClaims = (payload: string | jwt.JwtPayload): AuthClaims => {
	if (typeof payload === "string") {
		throw new AppError("Invalid token payload", 401);
	}

	const { sub, companyId, role, sessionId, iat, exp } = payload as Partial<AuthClaims>;
	if (
		!sub ||
		!companyId ||
		!role ||
		!sessionId ||
		typeof iat !== "number" ||
		typeof exp !== "number"
	) {
		throw new AppError("Invalid token claims", 401);
	}

	return { sub, companyId, role, sessionId, iat, exp };
};

export const requireAuth: RequestHandler = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const token = extractBearerToken(req.headers.authorization);
		if (!token) {
			throw new AppError("Missing or invalid authorization header", 401);
		}

		const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
		const claims = parseClaims(payload);

		req.auth = {
			userId: claims.sub,
			companyId: claims.companyId,
			role: claims.role,
			sessionId: claims.sessionId,
		};

		next();
	} catch (error) {
		next(error);
	}
};

export const requireRoles = (allowedRoles: Role[]): RequestHandler => {
	return (req: Request, _res: Response, next: NextFunction) => {
		try {
			if (!req.auth) {
				throw new AppError("Unauthorized", 401);
			}
			if (!allowedRoles.includes(req.auth.role)) {
				throw new AppError("Forbidden", 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};
