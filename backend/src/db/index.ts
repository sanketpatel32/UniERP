import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { sqlClient } from "./client";
import * as schema from "./schema";

export const db = drizzle(sqlClient, { schema });

export const pingDatabase = async () => {
	await db.execute(sql`select 1`);
};

export { schema };
