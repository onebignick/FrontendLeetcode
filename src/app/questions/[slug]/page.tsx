import CombinedCodeEditor from "@/components/codeEditor/CombinedCodeEditor";
import IdeContainer from "@/components/questions/IdeContainer";
import QuestionBox from "@/components/questions/QuestionBox";


export default function QuestionPage({params}: {params: {slug: number}}) {

    return(
        <>
           <div className="flex flex-col gap-y-3">
                <QuestionBox id={params.slug}/>
                {/* <IdeContainer editorTypes={["html", "css", "javascript"]} questionId={params.slug}/> */}
                <CombinedCodeEditor question_id={params.slug}/>
            </div>
        </>
     
    )
}