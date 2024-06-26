import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { questions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export interface IQuestion {
    id: string;
    title: string;
    description: string;
    question: string;
    createdAt: Date;
    updatedAt: Date;
    expectedOutput: string;
}

export class QuestionRepository implements IBaseRepository<any> {

    async get(id: string): Promise<any> {
        const result = await db.select().from(questions).where(eq(questions.id, id));
        // console.log(result)
        return result
    };


    async getAll(): Promise<any> {
        const result = await db.select().from(questions);
        return result
    };


    create(): any { };
    update(): any { };
    delete(): any { };
}
