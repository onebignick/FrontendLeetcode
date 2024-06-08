import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import QuestionCard from "../../components/questions/QuestionCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// export const dynamic = "force-dynamic";

export default async function QuestionPage() {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.getAll();

    return (
        <>
            <Button>
                <Link href="/contribute">Contribute</Link>
            </Button>
            {questions?.map((question: any, index: number) => (<QuestionCard key={question.id} question={question} index={index + 1} />))}
        </>
    )
}
