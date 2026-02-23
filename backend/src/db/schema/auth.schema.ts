import { sql } from "drizzle-orm";
import {
	boolean,
	check,
	index,
	inet,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";

export const companies = pgTable(
	"companies",
	{
		id: uuid("id").primaryKey().notNull(),
		name: text("name").notNull(),
		slug: text("slug").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [uniqueIndex("companies_slug_unique").on(table.slug)],
);

export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().notNull(),
		email: text("email").notNull(),
		emailNormalized: text("email_normalized").notNull(),
		passwordHash: text("password_hash").notNull(),
		fullName: text("full_name").notNull(),
		isActive: boolean("is_active").notNull().default(true),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [uniqueIndex("users_email_normalized_unique").on(table.emailNormalized)],
);

export const memberships = pgTable(
	"memberships",
	{
		id: uuid("id").primaryKey().notNull(),
		companyId: uuid("company_id")
			.notNull()
			.references(() => companies.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		role: text("role").notNull(),
		status: text("status").notNull().default("active"),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("memberships_company_user_unique").on(table.companyId, table.userId),
		index("memberships_company_id_idx").on(table.companyId),
		index("memberships_user_id_idx").on(table.userId),
		index("memberships_company_role_idx").on(table.companyId, table.role),
		check(
			"memberships_role_check",
			sql`${table.role} in ('company_admin', 'employee')`,
		),
		check(
			"memberships_status_check",
			sql`${table.status} in ('active', 'invited', 'disabled')`,
		),
	],
);

export const refreshSessions = pgTable(
	"refresh_sessions",
	{
		id: uuid("id").primaryKey().notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		companyId: uuid("company_id")
			.notNull()
			.references(() => companies.id, { onDelete: "cascade" }),
		tokenHash: text("token_hash").notNull(),
		expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
		revokedAt: timestamp("revoked_at", { withTimezone: true }),
		lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
		userAgent: text("user_agent"),
		ipAddress: inet("ip_address"),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("refresh_sessions_token_hash_unique").on(table.tokenHash),
		index("refresh_sessions_user_id_idx").on(table.userId),
		index("refresh_sessions_company_id_idx").on(table.companyId),
		index("refresh_sessions_expires_at_idx").on(table.expiresAt),
		index("refresh_sessions_active_idx")
			.on(table.userId, table.companyId)
			.where(sql`${table.revokedAt} is null`),
	],
);

export type Role = "company_admin" | "employee";

export type MembershipStatus = "active" | "invited" | "disabled";
