import { sql } from "drizzle-orm";
import { integer, pgTableCreator, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `frontendLeetcode_${name}`)

export const questionDifficulty = createTable("questionDifficulty", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 32 }).notNull(),
});

export const questions = createTable("question", {
	id: uuid("id").defaultRandom().primaryKey(),
	difficultyId: uuid("difficultyId").references(() => questionDifficulty.id),
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
	username: varchar("username", { length: 100 }),
	firstName: varchar("firstname", { length: 100 }),
	lastName: varchar("lastname", { length: 100 }),
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
	votes: integer("votes").default(sql`'0'::integer`).notNull(),
	createdAt: timestamp("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updatedAt"),
});

export const questionType = createTable("questionType", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 32 }).notNull(),
});

export const question_questionType = createTable("question_questionType", {
	questionId: uuid("questionId").references(() => questions.id).primaryKey(),
	questionTypeId: uuid("questionTypeId").references(() => questionType.id).primaryKey(),
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
	status: uuid("status").default(sql`'680af830-5898-4cc0-b7eb-21c7ad1ed591'::uuid`).references(() => status.id),
	result: uuid("result").references(() => result.id),
	createdAt: timestamp("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
});

