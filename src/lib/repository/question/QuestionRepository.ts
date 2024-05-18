import { IBaseRepository } from "../BaseRepository";

export interface IQuestion {
    id: string;
    title: string;
    question: string;
}

export class QuestionRepository implements IBaseRepository<IQuestion> {
    private questions: IQuestion[];

    constructor() {
        this.questions = [
            {
                id: "1",
                title: "one",
                question: "testing this question"
            },
            {
                id: "2",
                title: "two",
                question: "hello world"
            },
            {
                id: "3",
                title: "three",
                question: "hello world"
            },
            {
                id: "4",
                title: "four",
                question: "hello world"
            },
            {
                id: "5",
                title: "five",
                question: "hello world"
            },
        ]
    }

    get(id: string): any {
        return this.questions[0];
    };
    getAll(): any {
        return this.questions;
    };
    create(): any {};
    update(): any {};
    delete(): any {};
}