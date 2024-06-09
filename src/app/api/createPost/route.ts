import { QuestionPostRepository } from "@/lib/repository/questionPost/QuestionPostRepository";

export const dynamic = "force-dynamic";
const questionPostRepository: QuestionPostRepository = new QuestionPostRepository();

export async function POST(request: Request) {
	const data = await request.json();
	const response = await questionPostRepository.create(data);
	return Response.json(response);
}
