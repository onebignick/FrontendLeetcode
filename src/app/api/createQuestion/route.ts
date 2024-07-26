import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";

export const dynamic = "force-dynamic";
const questionRepository = new QuestionRepository()

export async function POST(request: Request) {
    const data = await request.json();
    const response = await questionRepository.createNew(data);
    return Response.json(response);
}