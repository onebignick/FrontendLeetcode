import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { submission } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export interface Submission {
    username: string,
    questionId: number,
    language: string,
    code: string
}

export class SubmissionRepository implements IBaseRepository<any> {
    async get(id: number): Promise<any> {
        const result = await db.select().from(submission).where(eq(submission.id, id));
        return result;
    };


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
                username: newSubmission.username,
                questionId: newSubmission.questionId,
                language: newSubmission.language,
                code: newSubmission.code
            })
            .returning();
        return result;
    };

    async update(): Promise<any> {};
    async delete(): Promise<any> {};
}