"use client"
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
interface Props {
    question: Question,
    index: number
}

interface Question {
    id: number,
    title: string,
    description: string,
    question: string,
}

export default function QuestionCard({ question, index }: Props) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/questions/${question.id}`)
    }

    return (
        <>
            <Card onClick={() => { handleClick() }}>
                <CardHeader>
                    <CardTitle>{index}. {question.title}</CardTitle>
                        <CardDescription>
                            {question.description}
                        </CardDescription>
                </CardHeader>
            </Card>
        </>
    )
}
