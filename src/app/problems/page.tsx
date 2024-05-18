"use client"

import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import { useRouter } from "next/navigation";

export default function ProblemsPage() {
    const router = useRouter();
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = questionRepository.getAll();

    return(
        <main className="">
            {questions?.map(function (question: any) {return <div key={question.id} onClick={() => router.push(`problems/${question.id}`)}>question {question.title}</div>})}
        </main>
    )
}