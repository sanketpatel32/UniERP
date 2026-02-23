import express, { type Express, type Request, type Response } from "express";

import healthRoutes from "./src/modules/common/routes/health.route";
import { loggerMiddleware } from "./src/middlewares/logger.middleware";
import { errorHandler } from "./src/middlewares/error.middleware";
import { sendSuccess } from "./src/utils/response";
import logger from "./src/utils/logger";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);

// API Routes
app.use("/api/v1/health", healthRoutes);

app.get("/", (req: Request, res: Response) => {
	sendSuccess(res, 200, "Hello from Express + TypeScript + Bun!");
});

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
	logger.info(`[server]: Server is running at http://localhost:${port}`);
});
