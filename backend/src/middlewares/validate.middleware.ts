import type { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { AppError } from "../utils/AppError";

type RequestSchemas = {
	body?: z.ZodTypeAny;
	params?: z.ZodTypeAny;
	query?: z.ZodTypeAny;
};

const parseOrThrow = (schema: z.ZodTypeAny, value: unknown) => {
	const parsed = schema.safeParse(value);
	if (!parsed.success) {
		const message = parsed.error.issues
			.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
			.join("; ");
		throw new AppError(`Validation failed: ${message}`, 400);
	}
	return parsed.data;
};

export const validate =
	(schemas: RequestSchemas): RequestHandler =>
	(req: Request, _res: Response, next: NextFunction) => {
		try {
			if (schemas.body) {
				req.body = parseOrThrow(schemas.body, req.body);
			}
			if (schemas.params) {
				req.params = parseOrThrow(schemas.params, req.params) as typeof req.params;
			}
			if (schemas.query) {
				req.query = parseOrThrow(schemas.query, req.query) as typeof req.query;
			}
			next();
		} catch (error) {
			next(error);
		}
	};
