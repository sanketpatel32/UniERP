import { Router } from "express";
import { checkDatabaseHealth, checkHealth } from "../controllers/health.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API server
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get("/", checkHealth);

/**
 * @openapi
 * /api/v1/health/db:
 *   get:
 *     summary: Database health check endpoint
 *     description: Verifies database connectivity
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Database is reachable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get("/db", checkDatabaseHealth);

export default router;
