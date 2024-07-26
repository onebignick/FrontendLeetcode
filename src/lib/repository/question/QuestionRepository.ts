import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { questionDifficulty, questionType, question_questionType, questions } from "@/server/db/schema";
import { eq, ne, sql } from "drizzle-orm";
import { IQuestionType } from "../questionType/QuestionTypeRepository";
import { IQuestionDifficulty } from "../questionDifficulty/QuestionDifficultyRepository";

export interface IQuestion {
    id: string;
    title: string;
    description: string;
    difficultyId: string | null;
    question: string;
    createdAt: Date;
    updatedAt: Date | null;
    expectedOutput: string;
}

export interface QuestionWithTypes {
    id: string;
    title: string;
    description: string;
    difficultyId: string | null;
    question: string;
    createdAt: Date;
    updatedAt: Date | null;
    expectedOutput: string;
    difficulty: string | null;
    questionTypes: string[];
}

export class QuestionRepository implements IBaseRepository<any> {

    async get(id: string): Promise<any> {
        const result = await db.select().from(questions).where(eq(questions.id, id));
        return result
    };


    async getAll(): Promise<any> {
        const result = await db.select().from(questions).where(ne(questions.status, "pending"));
        return result
    };

    async getAllPending(): Promise<any> {
        const result = await db.select().from(questions).where(eq(questions.status, "pending"));
        return result;
    }

    async getAllWithQuestionType(): Promise<QuestionWithTypes[]> {
        const temp = await db.select().from(questions)
            .leftJoin(question_questionType, eq(questions.id, question_questionType.questionId))
            .leftJoin(questionType, eq(question_questionType.questionTypeId, questionType.id))
            .leftJoin(questionDifficulty, eq(questions.difficultyId, questionDifficulty.id))
            .orderBy(questions.id);

        const result: QuestionWithTypes[] = [];
        for (let i = 0; i < temp.length; i++) {
            let question: IQuestion = temp[i].question;
            let questionType: IQuestionType | null = temp[i].questionType;
            let questionDifficulty: IQuestionDifficulty | null = temp[i].questionDifficulty;
            if (i === 0 || result[result.length - 1].id != question.id) {
                result.push({ ...question, difficulty: questionDifficulty ? questionDifficulty.name : null, questionTypes: questionType ? [questionType.name] : [] })
            } else if (questionType?.name) {
                result[result.length - 1].questionTypes.push(questionType.name);
            }
        }
        return result;
    }

    async getByDescriptionValue(descriptionValue: string): Promise<any> {
        const lowerDescriptionValue = descriptionValue.toLowerCase();
        const result = await db.select().from(questions).where(sql`LOWER(${questions.description}) LIKE ${`%${lowerDescriptionValue}%`}`);
        return result
    };

    async createNew(data: any): Promise<any> {
        const result = await db.insert(questions)
        .values({
            title: data.title,
            difficultyId: data.difficultyId,
            description: data.description,
            question: data.question,
            expectedOutput: data.expectedOutput,
            status: "pending"
        })
        .returning({ insertedId: questions.id });
        return result;
    };

    async updatePending(id: string): Promise<any> {
        const result = await db.update(questions).set({
            status: "approved"
        }).where(eq(questions.id, id))
        return result;
    }
    create(): any { };
    update(): any { };
    delete(): any { };
}
