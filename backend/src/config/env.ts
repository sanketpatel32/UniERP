import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	PORT: z.coerce.number().int().positive().default(3001),
	LOG_LEVEL: z.string().default("info"),
	DATABASE_URL: z.string().min(1),
	JWT_ACCESS_SECRET: z.string().min(32),
	JWT_REFRESH_SECRET: z.string().min(32),
	JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
	JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
	COOKIE_DOMAIN: z.string().optional(),
	COOKIE_SECURE: z
		.enum(["true", "false"])
		.default("false")
		.transform((value) => value === "true"),
});

const seedEnvSchema = envSchema.extend({
	SEED_ADMIN_EMAIL: z.string().email(),
	SEED_ADMIN_PASSWORD: z.string().min(8),
	SEED_COMPANY_NAME: z.string().min(2),
});

const formatIssues = (issues: z.ZodIssue[]) =>
	issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");

const parseEnv = <T extends z.ZodTypeAny>(schema: T): z.infer<T> => {
	const parsed = schema.safeParse(process.env);
	if (!parsed.success) {
		throw new Error(`Invalid environment configuration: ${formatIssues(parsed.error.issues)}`);
	}
	return parsed.data;
};

export const env = parseEnv(envSchema);

export const getSeedEnv = () => parseEnv(seedEnvSchema);
