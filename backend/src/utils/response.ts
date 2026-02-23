import type { Response } from "express";

type SuccessResponse<T> = {
	message: string;
	data: T | null;
	status: number;
};

type ErrorResponse = {
	message: string;
	status: number;
	data: null;
};

export const sendSuccess = <T>(
	res: Response,
	statusCode: number,
	message: string,
	data: T | null = null,
) => {
	const response: SuccessResponse<T> = {
		message,
		data,
		status: statusCode,
	};
	res.status(statusCode).json(response);
};

export const sendError = (
	res: Response,
	statusCode: number,
	message: string,
) => {
	const response: ErrorResponse = {
		message,
		data: null,
		status: statusCode,
	};
	res.status(statusCode).json(response);
};
