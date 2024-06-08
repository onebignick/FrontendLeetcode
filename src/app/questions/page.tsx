import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import QuestionCard from "../../components/questions/QuestionCard";

// export const dynamic = "force-dynamic";

export default async function QuestionPage() {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.getAll();

    return (
        <>
            <div className="flex flex-col gap-y-4">
                {questions?.map((question: any, index: number) => (<QuestionCard key={question.id} question={question} index={index + 1} />))}
            </div>
        </>

    )
}
