import CombinedCodeEditor from "@/components/codeEditor/CombinedCodeEditor";
import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbLink } from "@/components/ui/breadcrumb";

export default async function QuestionPage({ params }: { params: { slug: number } }) {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.get(params.slug)
    const question = questions[0];

    return (
        <>
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
            <Card>
                <CardHeader>
                    <CardTitle>{question.title}</CardTitle>
                </CardHeader>
                <CardContent>{question.question}</CardContent>
                <CardHeader>
                    <CardTitle>Expected Output:</CardTitle>
                    <iframe
                        className='w-full bg-white rounded-lg'
                        srcDoc={question.expectedOutput}
                        title="output"
                        sandbox="allow-scripts"
                    />
                </CardHeader>
            </Card>
            <CombinedCodeEditor question_id={params.slug} />
        </>
    )
}
