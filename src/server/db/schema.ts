import { sql } from "drizzle-orm";
import { integer, pgTableCreator, serial, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `frontendLeetcode_${name}`)

export const questions = createTable("question", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 1024 }).notNull(),
    question: varchar("question", { length: 10000 }).notNull(),
    createdAt: timestamp("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updatedAt"),
    expectedOutput: varchar("expected_output", { length: 10000 }).notNull(),
});


export const user = createTable("user", {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updatedAt"),
    clerkUserId: varchar("clerkUserId", { length: 32 }).unique(),
});


export const submission = createTable("submission", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: uuid("username").references(() => user.id),
    questionId: uuid("question_id").references(() => questions.id),
    language: varchar("language", { length: 256 }).notNull(),
    code: varchar("code", { length: 10000 }).notNull(),
    createdAt: timestamp("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull()
});
