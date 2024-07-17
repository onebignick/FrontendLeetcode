"use server"
import { IQuestionPost, QuestionPostRepository } from "@/lib/repository/questionPost/QuestionPostRepository";

export async function questionPost({ params }: { params: { id: string } }) {
	const questionPostRepository: QuestionPostRepository = new QuestionPostRepository();
	const questionPost: IQuestionPost = await questionPostRepository.get(params.id);

	return (
		<div>
			{questionPost.description}
		</div>
	);
}
