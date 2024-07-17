import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { questionType } from "@/server/db/schema";


export interface IQuestionType {
    id: string;
    name: string;
}


export class QuestionTypeRepository implements IBaseRepository<any> {

    async get(): Promise<any> { };


    async getAll(): Promise<any> {
        const result = await db.select().from(questionType);
        return result
    };

    create(): any { };
    update(): any { };
    delete(): any { };
}
