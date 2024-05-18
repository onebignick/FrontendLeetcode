import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";

export default function QuestionPage({params}: {params: {slug: string}}) {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const question = questionRepository.get(params.slug)
    return(
        <section>
            <div>{question.id}</div>
            <div>{question.title}</div>
            <div>{question.question}</div>
        </section>
    )
}