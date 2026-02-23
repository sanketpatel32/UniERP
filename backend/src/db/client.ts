import postgres from "postgres";
import { env } from "../config/env";

export const sqlClient = postgres(env.DATABASE_URL, {
	max: 10,
	prepare: false,
});
