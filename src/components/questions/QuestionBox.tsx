import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";

interface Props {
    id: number
}

export default async function QuestionBox({id}:Props) {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.get(id)
    const question = questions[0];

    return (
        <section>
            <div>{question.id}. {question.title}</div>
            <div>{question.question}</div>
        </section>
    )
}