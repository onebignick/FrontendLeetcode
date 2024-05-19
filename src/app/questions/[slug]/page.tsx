import Ide from "@/app/components/questions/ide";
import IdeContainer from "@/app/components/questions/ideContainer";
import QuestionBox from "@/app/components/questions/questionBox";
import { QuestionRepository } from "@/lib/repository/question/QuestionRepository";

export default async function QuestionPage({params}: {params: {slug: number}}) {

    const questionRepository: QuestionRepository = new QuestionRepository();
    const questions = await questionRepository.get(params.slug)
    const question = questions[0];

    return(
        <section className="flex flex-row justify-between">
            <QuestionBox id={params.slug}/>
            <IdeContainer editorTypes={["html", "css", "javascript"]} questionId={params.slug}/>
        </section>
    )
}