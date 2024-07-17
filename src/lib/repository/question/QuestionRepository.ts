import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { questionType, question_questionType, questions } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

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

    async getAllWithQuestionType(): Promise<any> {
        const temp = await db.select().from(questions)
            .leftJoin(question_questionType, eq(questions.id, question_questionType.questionId))
            .leftJoin(questionType, eq(question_questionType.questionTypeId, questionType.id))
            .orderBy(questions.id);

        const result: any = [];
        for (let i = 0; i < temp.length; i++) {
            let question = temp[i].question;
            let questionType = temp[i].questionType;
            if (i === 0 || result[result.length - 1].question.id != question.id) {
                result.push({ question: question, questionTypes: questionType ? [questionType] : [] })
            } else {
                result[result.length - 1].questionTypes.push(questionType);
            }
        }
        return result;
    }

    async getByDescriptionValue(descriptionValue: string): Promise<any> {
        const lowerDescriptionValue = descriptionValue.toLowerCase();
        const result = await db.select().from(questions).where(sql`LOWER(${questions.description}) LIKE ${`%${lowerDescriptionValue}%`}`);
        return result
    };

    create(): any { };
    update(): any { };
    delete(): any { };
}
