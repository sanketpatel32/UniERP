import { z } from "zod";

export const signupCompanyBodySchema = z.object({
	companyName: z.string().min(2).max(120),
	companySlug: z
		.string()
		.min(2)
		.max(80)
		.regex(/^[a-z0-9-]+$/)
		.optional(),
	fullName: z.string().min(2).max(120),
	email: z.string().email(),
	password: z.string().min(8).max(128),
});

export const loginBodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(128),
});

export type SignupCompanyBody = z.infer<typeof signupCompanyBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
