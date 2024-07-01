import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import QuestionCard from "../../components/questions/QuestionCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";

// export const dynamic = "force-dynamic";

export default async function QuestionPage() {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.getAll();

    return (
        <div className="flex flex-col gap-4">
            <Alert>
                <AlertTitle className="flex justify-between items-center">
                    Want to contribute a question?
                    <Button>
                        <Link href="/contribute">Contribute Question</Link>
                    </Button>
                </AlertTitle>
            </Alert>
            {questions?.map((question: any, index: number) => (<QuestionCard key={question.id} question={question} index={index + 1} />))}
        </div>
    )
}
