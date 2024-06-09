import { sql } from "drizzle-orm";
import { integer, pgTableCreator, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `frontendLeetcode_${name}`)

export const questions = createTable("question", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: varchar("title", { length: 1024 }).notNull(),
	description: varchar("description", { length: 10000 }).notNull(),
	question: varchar("question", { length: 10000 }).notNull(),
	createdAt: timestamp("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updatedAt"),
	expectedOutput: varchar("expected_output", { length: 10000 }).notNull(),
});


export const user = createTable("user", {
	id: varchar("id", { length: 32 }).primaryKey().unique(),
	createdAt: timestamp("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updatedAt"),
});

export const questionPost = createTable("questionPost", {
	id: uuid("id").defaultRandom().primaryKey(),
	authorId: varchar("authorId", { length: 32 }).references(() => user.id),
	questionId: uuid("questionId").references(() => questions.id),
	title: varchar("title", { length: 256 }).notNull(),
	description: varchar("description", { length: 256 }).notNull(),
	createdAt: timestamp("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updatedAt"),
});

export const status = createTable("status", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
});

export const result = createTable("result", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
});

export const submission = createTable("submission", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: varchar("userId", { length: 32 }).references(() => user.id),
	questionId: uuid("question_id").references(() => questions.id),
	language: varchar("language", { length: 256 }).notNull(),
	code: varchar("code", { length: 10000 }).notNull(),
	status: uuid("status").default(sql`'6c9dd519-46be-4ddc-bc80-700b66bdd5db'::uuid`).references(() => status.id),
	result: uuid("result").references(() => result.id),
	createdAt: timestamp("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
});
