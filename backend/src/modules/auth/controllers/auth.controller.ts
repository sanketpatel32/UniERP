import type { CookieOptions, Request, Response } from "express";
import { env } from "../../../config/env";
import { sendSuccess } from "../../../utils/response";
import { AppError } from "../../../utils/AppError";
import { authService } from "../services/auth.service";

const REFRESH_COOKIE_NAME = "refresh_token";

const getRefreshCookieOptions = (expiresAt: Date): CookieOptions => ({
	httpOnly: true,
	secure: env.COOKIE_SECURE,
	sameSite: "lax",
	path: "/api/v1/auth",
	expires: expiresAt,
	...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
});

const getRequestMeta = (req: Request) => ({
	userAgent: req.get("user-agent"),
	ipAddress: req.ip,
});

export const signupCompany = async (req: Request, res: Response) => {
	const result = await authService.signupCompany(req.body, getRequestMeta(req));

	res.cookie(
		REFRESH_COOKIE_NAME,
		result.refreshToken,
		getRefreshCookieOptions(result.refreshExpiresAt),
	);

	sendSuccess(res, 201, "Company account created", {
		accessToken: result.accessToken,
		user: result.user,
	});
};

export const login = async (req: Request, res: Response) => {
	const result = await authService.login(req.body, getRequestMeta(req));

	res.cookie(
		REFRESH_COOKIE_NAME,
		result.refreshToken,
		getRefreshCookieOptions(result.refreshExpiresAt),
	);

	sendSuccess(res, 200, "Login successful", {
		accessToken: result.accessToken,
		user: result.user,
	});
};

export const refresh = async (req: Request, res: Response) => {
	const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
	if (!refreshToken) {
		throw new AppError("Refresh token missing", 401);
	}

	const result = await authService.refreshSession(refreshToken, getRequestMeta(req));

	res.cookie(
		REFRESH_COOKIE_NAME,
		result.refreshToken,
		getRefreshCookieOptions(result.refreshExpiresAt),
	);

	sendSuccess(res, 200, "Token refreshed", {
		accessToken: result.accessToken,
		user: result.user,
	});
};

export const logout = async (req: Request, res: Response) => {
	const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
	await authService.logout(refreshToken);

	res.clearCookie(REFRESH_COOKIE_NAME, {
		httpOnly: true,
		secure: env.COOKIE_SECURE,
		sameSite: "lax",
		path: "/api/v1/auth",
		...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
	});

	sendSuccess(res, 200, "Logout successful");
};

export const me = async (req: Request, res: Response) => {
	if (!req.auth) {
		throw new AppError("Unauthorized", 401);
	}

	const user = await authService.getMe(req.auth.userId, req.auth.companyId);
	sendSuccess(res, 200, "Authenticated user", user);
};

export const adminOnlyCheck = (req: Request, res: Response) => {
	if (!req.auth) {
		throw new AppError("Unauthorized", 401);
	}

	sendSuccess(res, 200, "Admin access verified", {
		userId: req.auth.userId,
		companyId: req.auth.companyId,
		role: req.auth.role,
	});
};
