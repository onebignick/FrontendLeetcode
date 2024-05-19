"use server"

import { SubmissionRepository } from "@/lib/repository/submission/SubmissionRepository";

interface Props {
    languages: any,
    codes: any,
    questionId: number
}

export default async function QuestionSubmit ({languages, codes, questionId}: Props) {

    const submissionRepository: SubmissionRepository = new SubmissionRepository();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        for(let i=0;i<languages.length;i++) {
            const result = await submissionRepository.create({
                username: "admin",
                questionId: questionId,
                language: languages[i],
                code: codes[languages[i]]
            });
            console.log(result);
        }
        return;
    }

    return (
        <button onClick={(e) => handleSubmit(e)}>
            Submit
        </button>
    )
}