import argon2 from "argon2";
import { and, eq } from "drizzle-orm";
import { v7 as uuidv7 } from "uuid";
import { getSeedEnv } from "../config/env";
import { db } from "./index";
import { memberships, companies, users } from "./schema";
import { sqlClient } from "./client";

const slugify = (value: string) =>
	value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);

const run = async () => {
	const seedEnv = getSeedEnv();
	const companySlug = slugify(seedEnv.SEED_COMPANY_NAME);
	const emailNormalized = seedEnv.SEED_ADMIN_EMAIL.trim().toLowerCase();

	await db.transaction(async (tx) => {
		let companyId = uuidv7();
		let userId = uuidv7();

		const existingCompany = await tx
			.select({ id: companies.id })
			.from(companies)
			.where(eq(companies.slug, companySlug))
			.limit(1);

		if (existingCompany[0]) {
			companyId = existingCompany[0].id;
		} else {
			await tx.insert(companies).values({
				id: companyId,
				name: seedEnv.SEED_COMPANY_NAME,
				slug: companySlug,
			});
		}

		const existingUser = await tx
			.select({ id: users.id })
			.from(users)
			.where(eq(users.emailNormalized, emailNormalized))
			.limit(1);

		if (existingUser[0]) {
			userId = existingUser[0].id;
		} else {
			const passwordHash = await argon2.hash(seedEnv.SEED_ADMIN_PASSWORD, {
				type: argon2.argon2id,
			});
			await tx.insert(users).values({
				id: userId,
				email: seedEnv.SEED_ADMIN_EMAIL,
				emailNormalized,
				fullName: "Seed Company Admin",
				passwordHash,
			});
		}

		const existingMembership = await tx
			.select({ id: memberships.id })
			.from(memberships)
			.where(
				and(
					eq(memberships.companyId, companyId),
					eq(memberships.userId, userId),
				),
			)
			.limit(1);

		if (!existingMembership[0]) {
			await tx.insert(memberships).values({
				id: uuidv7(),
				companyId,
				userId,
				role: "company_admin",
				status: "active",
			});
		}
	});

	console.log("Seed completed successfully.");
};

run()
	.then(async () => {
		await sqlClient.end();
		process.exit(0);
	})
	.catch(async (error) => {
		console.error("Seed failed:", error);
		await sqlClient.end();
		process.exit(1);
	});
