import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/DataTableColumns";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbLink } from "@/components/ui/breadcrumb";


export default async function QuestionPage() {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.getAllWithQuestionType();

    const QuestionBreadcrumb = () => {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/questions">Problems</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <QuestionBreadcrumb />
            <Alert>
                <AlertTitle className="flex justify-between items-center">
                    Want to contribute your own question?
                    <Button>
                        <Link href="/contribute">Contribute Question</Link>
                    </Button>
                </AlertTitle>
            </Alert>
            <DataTable columns={columns} data={questions} />
        </div>
    )
}
