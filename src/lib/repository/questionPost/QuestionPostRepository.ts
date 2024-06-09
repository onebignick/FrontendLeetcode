import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { questionPost } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export class QuestionPostRepository implements IBaseRepository<any> {
    async get(id: string): Promise<any> {
        const result = await db.select().from(questionPost).where(eq(questionPost.id, id));
        return result;
    };

    async getByQuestion(questionId: string): Promise<any> {
        const results = await db.select()
            .from(questionPost)
            .where(
                eq(questionPost.questionId, questionId)
            )
        return results;
    }


    async getAll(): Promise<any> {
        const result = await db.select().from(questionPost);
        return result;
    };


    async create(newQuestionPost: any): Promise<any> {
        "use server"
        const result = await db
            .insert(questionPost)
            .values({
                authorId: newQuestionPost.authorId,
                questionId: newQuestionPost.questionId,
                title: newQuestionPost.title,
                description: newQuestionPost.description
            })
            .returning();
        return result;
    };

    async update(): Promise<any> { };

    async incrementVotes(questionPostId: string): Promise<any> {
        const result = await db.update(questionPost)
            .set({ votes: sql`${questionPost.votes} + 1` })
            .where(eq(questionPost.id, questionPostId));
        return result;
    };
    async delete(): Promise<any> { };
}
