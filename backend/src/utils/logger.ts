import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize } = winston.format;

// Define custom log format for the console
const consoleFormat = combine(
	colorize(),
	timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	printf(({ level, message, timestamp }) => {
		return `[${timestamp}] ${level}: ${message}`;
	}),
);

// Define custom log format for files
const fileFormat = combine(
	timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	printf(({ level, message, timestamp }) => {
		return `[${timestamp}] ${level}: ${message}`;
	}),
);

// Configure Daily Rotate File Transports
const createRotateTransport = (filename: string, level: string) => {
	return new DailyRotateFile({
		filename: `logs/${filename}-%DATE%.log`,
		datePattern: "YYYY-MM-DD",
		zippedArchive: true,
		maxSize: "20m",
		maxFiles: "14d",
		level,
		format: fileFormat,
	});
};

const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || "info",
	transports: [
		new winston.transports.Console({
			format: consoleFormat,
		}),
		createRotateTransport("error", "error"),
		createRotateTransport("combined", "info"),
	],
});

export default logger;
