"use client"

import { useRouter } from "next/navigation";

interface Props {
    question: Question,
}

interface Question {
    id: number,
    title: string,
    question: string,
}

export default function QuestionCard({question} : Props) {
    const router = useRouter();

    return (
        <section onClick={() => router.push(`questions/${question.id}`)}>
            {question.id}. {question.title}
        </section>
    )
}