import CombinedCodeEditor from "@/components/codeEditor/CombinedCodeEditor";
import CodeEditor from "@/components/codeEditor/CodeEditor";
import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@clerk/nextjs/server";
import { SubmissionRepository } from "@/lib/repository/submission/SubmissionRepository";
import { QuestionPostRepository } from "@/lib/repository/questionPost/QuestionPostRepository";
import { DiscussionForm } from "@/components/questions/DiscussionForm";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

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
                                className='w-full bg-white rounded-lg overflow-y-auto'
                                srcDoc={question.expectedOutput}
                                title="output"
                                sandbox="allow-scripts"
                            />
                        </CardHeader>
                    </Card>
                    <Separator className="my-4" />
                    <CombinedCodeEditor questionId={params.slug} userId={userId} />
                </TabsContent>
                <TabsContent value="solution">
                    {/* {question.expectedOutput} */}
                    <div className="flex flex-col lg:flex-row gap-x-5">
                        <div className="w-1/2">
                            <CodeEditor
                                language="html"
                                displayName="Solution Code:"
                                value={question.expectedOutput}
                                // onChange={setHtml}
                            />
                        </div>
                        
                        <div className="flex flex-col w-1/2 gap-y-5">
                            <h1 className="text-lg lg:text-xl">Expected Solution Behaviour:</h1>
                            <iframe
                                className='bg-white rounded-lg h-full'
                                srcDoc={question.expectedOutput}
                                title="output"
                                sandbox="allow-scripts"
                            />
                        </div>
                        
                    </div>
                </TabsContent>
                <TabsContent value="discussion">
                    <DiscussionList questionId={params.slug} userId={userId} />
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

const DiscussionList = async ({ userId, questionId }: { userId: string | null, questionId: string }) => {
    const questionPostRepository: QuestionPostRepository = new QuestionPostRepository();
    const questionPosts = await questionPostRepository.getByQuestion(questionId);

    return (
        <>
            <DiscussionForm userId={userId} questionId={questionId} />
            <Separator className="my-4" />
            {questionPosts.map((post: any) => (
                <Card key={post.id}>
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.authorId} on {post.createdAt.toString()}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </>
    );
}
