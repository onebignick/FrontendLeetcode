import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { result, status, submission } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

export interface Submission {
    userId: string,
    questionId: number,
    language: string,
    code: string,
}

export class SubmissionRepository implements IBaseRepository<any> {
    async get(id: string): Promise<any> {
        const result = await db.select().from(submission).where(eq(submission.id, id));
        return result;
    };

    async getByUserId(userId: string | null, questionId: string): Promise<any> {
        const results = await db.select()
            .from(submission)
            .where(and(
                eq(submission.userId, userId),
                eq(submission.questionId, questionId)
            ))
            .leftJoin(status, eq(submission.status, status.id))
            .leftJoin(result, eq(submission.result, result.id));
        return results;
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
                questionId: newSubmission.questionId,
                language: newSubmission.language,
                code: newSubmission.code,
            })
            .returning();
        return result[0];
    };

    async update(): Promise<any> { };
    async delete(): Promise<any> { };
}
