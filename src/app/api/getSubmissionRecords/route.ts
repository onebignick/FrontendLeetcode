import { SubmissionRepository } from '@/lib/repository/submission/SubmissionRepository';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
    // needs fixing
    console.log("in getSubmissionRecords route")
    const data = await request.json();
    console.log(data)
	const submissionRepository = new SubmissionRepository();
    const res = await submissionRepository.getSubmissionRecords(data.userId);
	return Response.json({res});
}