import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { result, status, submission } from "@/server/db/schema";
import { eq, and, sql, desc } from "drizzle-orm";

export interface Submission {
    userId: string,
    questionId: number,
    language: string,
    code: string,
}

export interface SubmissionRecord {
    date: Date;
    count: number;
}

export class SubmissionRepository implements IBaseRepository<any> {
    async get(id: string): Promise<any> {
        const result = await db.select().from(submission).where(eq(submission.id, id));
        return result;
    };

    async getByUserId(userId: string | null, questionId: string): Promise<any> {
        if (userId === null) {
            console.error("Error in querying submissions from db: User ID cannot be null");
            return;
        }
        const results = await db.select()
            .from(submission)
            .where(and(
                eq(submission.userId, userId),
                eq(submission.questionId, questionId)
            ))
            .leftJoin(status, eq(submission.status, status.id))
            .leftJoin(result, eq(submission.result, result.id))
            .orderBy(desc(submission.createdAt));;
        return results;
    }

    async getSubmissionRecords(userId: string): Promise<any> {
        const records = await db
            .select({
                date: sql`TO_CHAR(DATE_TRUNC('day', ${submission.createdAt}), 'YYYY-MM-DD')`.as('date'),
                count: sql`COUNT(*)`.as('count'),
            })
            .from(submission)
            .where(eq(submission.userId, userId))
            .groupBy(sql`DATE_TRUNC('day', ${submission.createdAt})`)
            .orderBy(sql`DATE_TRUNC('day', ${submission.createdAt})`);
        return records.map(record => ({
            date: new Date(record.date as string),
            count: parseInt(record.count as string)
        })) ;
    }

    async getAll(): Promise<any> {
        const result = await db.select().from(submission);
        return result;
    };


    async create(newSubmission: Submission): Promise<any> {
        "use server"
        const result = await db
            .insert(submission)
            .values({
                userId: newSubmission.userId,
                questionId: newSubmission.questionId.toString(),
                language: newSubmission.language,
                code: newSubmission.code,
            })
            .returning();
        return result[0];
    };

    async update(): Promise<any> { };
    async delete(): Promise<any> { };
}
