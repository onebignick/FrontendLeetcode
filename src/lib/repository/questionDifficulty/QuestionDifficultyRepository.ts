import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { questionDifficulty } from "@/server/db/schema";


export interface IQuestionDifficulty {
    id: string;
    name: string;
}


export class QuestionDifficultyRepository implements IBaseRepository<any> {

    async get(): Promise<any> { };


    async getAll(): Promise<any> {
        const result = await db.select().from(questionDifficulty);
        return result
    };

    create(): any { };
    update(): any { };
    delete(): any { };
}
