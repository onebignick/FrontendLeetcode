import CombinedCodeEditor from "@/components/codeEditor/CombinedCodeEditor";
import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@clerk/nextjs/server";
import { SubmissionRepository } from "@/lib/repository/submission/SubmissionRepository";

export default async function QuestionPage({ params }: { params: { slug: string } }) {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.get(params.slug);
    const question = questions[0];
    const { userId } = auth();

    return (
        <>
            <QuestionBreadcrumb />
            <Tabs defaultValue="question">
                <TabsList>
                    <TabsTrigger value="question">Question</TabsTrigger>
                    <TabsTrigger value="solution">Solution</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                    <TabsTrigger value="submission">Submissions</TabsTrigger>
                </TabsList>
                <TabsContent value="question">
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
                    <CombinedCodeEditor questionId={params.slug} userId={userId} />
                </TabsContent>
                <TabsContent value="solution">{question.expectedOutput}</TabsContent>
                <TabsContent value="discussion">
                    <DiscussionList />
                </TabsContent>
                <TabsContent value="submission">
                    <SubmissionList userId={userId} questionId={params.slug} />
                </TabsContent>
            </Tabs>
        </>
    )
}

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

const SubmissionList = async ({ userId, questionId }: { userId: string | null, questionId: string }) => {
    const submissionRepository: SubmissionRepository = new SubmissionRepository();
    const submissions = await submissionRepository.getByUserId(userId, questionId);
    return (
        <>
            {
                submissions.map((submission: any) => (
                    <Card key={submission.submission.id}>
                        <CardHeader>
                            <CardTitle>{submission.status.name}</CardTitle>
                            <CardDescription>{submission.submission.createdAt.toString()}</CardDescription>
                        </CardHeader>
                    </Card>
                ))
            }
        </>
    );
}

const DiscussionList = async () => {
    return (
        <div>Hello this is the discussion list</div>
    );
}
