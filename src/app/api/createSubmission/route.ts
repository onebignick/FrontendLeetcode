import { SubmissionRepository } from "@/lib/repository/submission/SubmissionRepository";

export const dynamic = "force-dynamic";
const submissionRepository: SubmissionRepository = new SubmissionRepository();

export async function POST(request: Request) {
    const data = await request.json();
    const response = await submissionRepository.create(data);
    return Response.json(response)
}