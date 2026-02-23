import express, { type Express, type Request, type Response } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import healthRoutes from "./src/modules/common/routes/health.route";
import { loggerMiddleware } from "./src/middlewares/logger.middleware";
import { errorHandler } from "./src/middlewares/error.middleware";
import { sendSuccess } from "./src/utils/response";
import logger from "./src/utils/logger";
import { swaggerSpec } from "./src/utils/swagger";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// API Documentation Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api/v1/health", healthRoutes);

/**
 * @openapi
 * /:
 *   get:
 *     summary: Root endpoint
 *     description: Returns a welcome message
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Welcome message received
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
app.get("/", (_req: Request, res: Response) => {
	sendSuccess(res, 200, "Hello from Express + TypeScript + Bun!");
});

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
	logger.info(`[server]: Server is running at http://localhost:${port}`);
});
