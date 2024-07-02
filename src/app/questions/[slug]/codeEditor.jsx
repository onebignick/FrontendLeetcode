"use client"
import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const defaultValues = {
    "html": "<html>\n<head>\n\t<style>\n\t</style>\n</head>\n<body>\n</body>\n</html>"
}

const CodeEditor = ({ questionId, userId }) => {
    const editorRef = useRef();
    const [language, setLanguage] = useState("html");
    const [value, setValue] = useState(defaultValues[language]);
    const { toast } = useToast();

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const handleSubmit = async () => {
        const response = await fetch("/api/createSubmission", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userId,
                questionId: questionId,
                language: "html",
                code: value
            })
        })
        console.log(await response.json())
    }

    return (
        <>
            <Editor
                options={{
                    minimap: {
                        enabled: false,
                    },
                }}
                height="75vh"
                theme="vs-dark"
                value={value}
                language={language}
                onMount={onMount}
                onChange={(value) => setValue(value)}
            />
            <div className="flex flex-col gap-y-5">
                <h1 className="text-lg lg:text-xl">Output</h1>
                <iframe
                    className='bg-white rounded-lg h-full'
                    srcDoc={value}
                    title="output"
                    sandbox="allow-scripts"
                />
            </div>
            <Button onClick={() => { userId ? handleSubmit() : toast({ description: "Please logi n before submitting" }) }}>
                Submit
            </Button>
        </>
    );
};
export default CodeEditor;
