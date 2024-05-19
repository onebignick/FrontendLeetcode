import { sql } from "drizzle-orm";
import { pgTableCreator, serial, timestamp, varchar } from "drizzle-orm/pg-core";

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