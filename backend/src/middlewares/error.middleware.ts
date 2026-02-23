import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { AppError } from "../utils/AppError";
import { sendError } from "../utils/response";

export const errorHandler = (
	err: Error | AppError,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) => {
	let statusCode = 500;
	let message = "Internal Server Error";

	if (err instanceof AppError) {
		statusCode = err.statusCode;
		message = err.message;
	} else if (err instanceof Error) {
		// Log the full error stack for non-operational errors
		logger.error(`[Unhandled Error] ${err.name}: ${err.message}\n${err.stack}`);
	}

	sendError(res, statusCode, message);
};
