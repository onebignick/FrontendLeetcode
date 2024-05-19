import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import QuestionCard from "../components/questions/questionCard";

export const dynamic = "force-dynamic";

export default async function QuestionPage() {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.getAll();

    return(
        <main className="">
            {questions?.map(function (question: any) {return <QuestionCard key={question.id} question={question}/>})}
        </main>
    )
}