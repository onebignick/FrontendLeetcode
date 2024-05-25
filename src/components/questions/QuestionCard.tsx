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
    const router = useRouter()

    const handleClick = () => {
        router.push(`/questions/${question.id}`)
    }

    return (
        <>
            <div className='border-2 rounded-lg border-gray-200 p-2 sm:p-3 cursor-pointer hover:bg-gray-100 hover:text-black flex'
                onClick={() => { 
                    handleClick()
                }}
            >
                <p className="text-lg font-medium">{question.id}. {question.title}</p>
            </div>
        </>
    )
}