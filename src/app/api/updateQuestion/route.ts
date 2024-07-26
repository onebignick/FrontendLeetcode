import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";

export const dynamic = "force-dynamic";
const questionRepository = new QuestionRepository();

export async function PUT(request: Request) {
    const data = await request.json();
    const response = await questionRepository.updatePending(data.id);
    return Response.json(response)
}