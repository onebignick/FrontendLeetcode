import CombinedCodeEditor from "@/components/codeEditor/CombinedCodeEditor";
import IdeContainer from "@/components/questions/IdeContainer";
import QuestionBox from "@/components/questions/QuestionBox";
import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";

export default async function QuestionPage({params}: {params: {slug: number}}) {

    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.get(params.slug)
    const question = questions[0];

    return(
        <>
           <div className="flex flex-col justify-between">
                <QuestionBox id={params.slug}/>
                <IdeContainer editorTypes={["html", "css", "javascript"]} questionId={params.slug}/>
                <CombinedCodeEditor/>
            </div>
        </>
     
    )
}