import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";

interface Props {
    id: number
}

export default async function QuestionBox({id}:Props) {
    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.get(id)
    const question = questions[0];
    return (
        <div className="w-full h-full flex flex-row gap-x-5 rounded-xl border-2 p-5">
            <div className="w-1/2">
                <div className="text-lg font-bold">
                    {question.id}. {question.title}
                </div>
                {/* <div>{question.question}</div> */}
                <div>
                    <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
                </div>
            </div>
            <div className="w-1/2">
                <h1 className="text-lg font-semibold">Expected Output:</h1>
                <iframe
                    className='w-full bg-white rounded-lg'
                    srcDoc={question.expectedOutput}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                />
            </div>
        </div>
    )
}