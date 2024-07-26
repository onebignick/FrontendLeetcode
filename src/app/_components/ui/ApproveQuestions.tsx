import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";
import { ApproveButton } from "./ApproveButton";

export default async function ApproveQuestions() {
    const questionRepository = new QuestionRepository();
    const results = await questionRepository.getAllPending();
    console.log(results);

    async function handleClick(id: string) {
        console.log(id);
    }
    return (
        <Card>
            <CardTitle className="px-2 py-4">Questions Pending Approval</CardTitle>
            <div className="flex flex-col space-y-8 p-8">
            {
                results.map((elem: any, idx: number) => {
                    return(
                        <Card key={idx}>
                            <CardHeader>
                                <CardTitle>{elem.title}</CardTitle>
                                <CardDescription>{elem.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {elem.question}
                            </CardContent>
                            <CardFooter><ApproveButton id={elem.id}/></CardFooter>
                        </Card>
                    )
                })
            }
            </div>
        </Card>
    )
}