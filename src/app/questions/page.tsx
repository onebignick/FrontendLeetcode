import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "./questionsTable";
import { columns } from "./questionsColumns";

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
            <DataTable columns={columns} data={questions} />
        </div>
    )
}
