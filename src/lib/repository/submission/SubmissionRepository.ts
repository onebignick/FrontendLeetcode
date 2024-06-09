import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { submission } from "@/server/db/schema";
import { eq } from "drizzle-orm";

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

    async getByUserId(userId: any): Promise<any> {
        console.log(userId);
        const result = await db.select().from(submission).where(eq(submission.userId, userId));
        return result;
    }


    async getAll(): Promise<any> {
        const result = await db.select().from(submission);
        return result;
    };


    async create(newSubmission: Submission): Promise<any> {
        "use server"
        console.log("hello world")
        const result = await db
            .insert(submission)
            .values({
                userId: newSubmission.userId,
                questionId: newSubmission.questionId,
                language: newSubmission.language,
                code: newSubmission.code,
            })
            .returning();
        return result;
    };

    async update(): Promise<any> { };
    async delete(): Promise<any> { };
}
