import type { Request, Response } from "express";
import { sendSuccess } from "../../../utils/response";

export const checkHealth = (_req: Request, res: Response) => {
	const data = {
		timestamp: new Date().toISOString(),
	};
	sendSuccess(res, 200, "Server is healthy", data);
};
