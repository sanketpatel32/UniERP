import type { Request, Response } from "express";
import { sendSuccess } from "../../../utils/response";
import { pingDatabase } from "../../../db";

export const checkHealth = (_req: Request, res: Response) => {
	const data = {
		timestamp: new Date().toISOString(),
	};
	sendSuccess(res, 200, "Server is healthy", data);
};

export const checkDatabaseHealth = async (_req: Request, res: Response) => {
	await pingDatabase();
	sendSuccess(res, 200, "Database is healthy", {
		timestamp: new Date().toISOString(),
	});
};
