import express, { type Express, type Request, type Response } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./src/config/env";
import healthRoutes from "./src/modules/common/routes/health.route";
import authRoutes from "./src/modules/auth/routes/auth.route";
import { loggerMiddleware } from "./src/middlewares/logger.middleware";
import { errorHandler } from "./src/middlewares/error.middleware";
import { sendSuccess } from "./src/utils/response";
import logger from "./src/utils/logger";
import { swaggerSpec } from "./src/utils/swagger";
import { pingDatabase } from "./src/db";

const app: Express = express();
const port = env.PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);

// API Documentation Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);

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

const bootstrap = async () => {
	await pingDatabase();
	logger.info("[server]: Database connection successful");

	app.listen(port, () => {
		logger.info(`[server]: Server is running at http://localhost:${port}`);
	});
};

bootstrap().catch((error) => {
	if (error instanceof Error) {
		const cause =
			typeof error.cause === "object" && error.cause !== null
				? JSON.stringify(error.cause)
				: error.cause;
		logger.error(
			`[server]: Startup failed - ${error.message}${cause ? ` | cause: ${cause}` : ""}`,
		);
	} else {
		logger.error(`[server]: Startup failed - ${String(error)}`);
	}
	process.exit(1);
});
