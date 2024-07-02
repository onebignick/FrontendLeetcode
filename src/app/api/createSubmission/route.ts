import { SubmissionRepository } from "@/lib/repository/submission/SubmissionRepository";

export const dynamic = "force-dynamic";
const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_CODE_VALIDATION_SERVICE_API_ENDPOINT
const submissionRepository: SubmissionRepository = new SubmissionRepository();

export async function POST(request: Request) {
    const data = await request.json();
    const response = await submissionRepository.create(data);
    const validation_service_response = await fetch(`${apiUrl}/submission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response)
    })
    return Response.json(response)
}
