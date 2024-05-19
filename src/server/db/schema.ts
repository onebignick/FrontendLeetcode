import { sql } from "drizzle-orm";
import { integer, pgTableCreator, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `frontendLeetcode_${name}`)

export const questions = createTable("question", {
    id: serial("id").primaryKey(),
    title: varchar("title", {length: 1024}).notNull(),
    question: varchar("question", {length: 10000}).notNull(),
    createdAt: timestamp("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updatedAt")
});


export const user = createTable("user", {
    username: varchar("username", {length: 32}).primaryKey()
});


export const submission = createTable("submission", {
    id: serial("id").primaryKey(),
    username: varchar("username", {length: 32}).references(()=>user.username),
    questionId: integer("question_id").references(()=>questions.id),
    language: varchar("language", {length: 256}).notNull(),
    code: varchar("code", {length:10000}).notNull(),
    createdAt: timestamp("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull()
});