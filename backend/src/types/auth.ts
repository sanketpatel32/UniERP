import type { Request } from "express";

export type Role = "company_admin" | "employee";

export type AuthClaims = {
	sub: string;
	companyId: string;
	role: Role;
	sessionId: string;
	iat: number;
	exp: number;
};

export type AuthContext = {
	userId: string;
	companyId: string;
	role: Role;
	sessionId: string;
};

export interface AuthenticatedRequest extends Request {
	auth?: AuthContext;
}
