import { Router } from "express";
import {
	adminOnlyCheck,
	login,
	logout,
	me,
	refresh,
	signupCompany,
} from "../controllers/auth.controller";
import { requireAuth, requireRoles } from "../../../middlewares/auth.middleware";
import { validate } from "../../../middlewares/validate.middleware";
import { loginBodySchema, signupCompanyBodySchema } from "../schemas/auth.schema";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/signup/company:
 *   post:
 *     summary: Sign up a new company and admin user
 *     description: Creates company, admin user, membership, and issues access/refresh tokens
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupCompanyRequest'
 *     responses:
 *       201:
 *         description: Company account created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Company slug or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/signup/company", validate({ body: signupCompanyBodySchema }), signupCompany);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     description: Validates credentials and issues access/refresh tokens
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", validate({ body: loginBodySchema }), login);

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Rotates refresh session and returns a new access token (requires refresh token cookie)
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Missing or invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/refresh", refresh);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout current session
 *     description: Revokes refresh session and clears refresh cookie
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.post("/logout", logout);

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     summary: Get authenticated user profile
 *     description: Returns current user from access token context
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/me", requireAuth, me);

/**
 * @openapi
 * /api/v1/auth/admin-check:
 *   get:
 *     summary: Verify company admin access
 *     description: Requires valid access token and company_admin role
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminCheckResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden (insufficient role)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/admin-check", requireAuth, requireRoles(["company_admin"]), adminOnlyCheck);

export default router;
