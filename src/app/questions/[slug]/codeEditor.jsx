"use client"
import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from 'usehooks-ts';

const defaultValues = {
    "html": "<html>\n<head>\n\t<style>\n\t\t/* write your CSS code here */\n\t</style>\n</head>\n<body>\n\t<!-- Write your HTML code here -->\n\t<script>\n\t\t// write your Javascript code here\n\t</script>\n</body>\n</html>"
}

const CodeEditor = ({ questionId, userId }) => {
    const editorRef = useRef();
    const [language, setLanguage] = useState("html");
    const [value, setValue] = useLocalStorage("userCodeForQuestion-" + questionId, defaultValues[language]);
    const { toast } = useToast();
    const [windowWidth, setWindowWidth] = useState();
    const [isLargeViewport, setIsLargeViewport] = useState(true);

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth >= 1024) {
                setIsLargeViewport(true);
            } else {
                setIsLargeViewport(false);
            }
            setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 500);
        }
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }
    });

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
        toast({ description: "Submission Received! We are processing it." })
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col w-full lg:w-1/2 h-1/2 lg:h-fit">
                    <div className="flex flex-row gap-x-3 items-center p-2 border-2 border-gray-500 rounded-t-xl">
                        <div className="font-bold">{`</>`}</div>
                        <div className="font-semibold text-xl">Code</div>
                    </div>
                    <Editor
                        key = {windowWidth}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                        }}
                        height="65vh"
                        theme="vs-dark"
                        value={value}
                        language={language}
                        onMount={onMount}
                        onChange={(value) => setValue(value)}
                    />
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                    <div className="flex flex-row gap-x-3 items-center p-2 border-2 border-gray-500 rounded-t-xl">
                        <div className="font-semibold text-xl">Output</div>
                    </div>
                    <iframe
                        className={`bg-white w-full overflow-y-auto ${(isLargeViewport) ? 'h-full' : 'h-[500px]'}`}
                        srcDoc={value}
                        title="output"
                        sandbox="allow-scripts allow-forms"
                    />
                </div>
            </div>
            <div className="flex justify-end py-2">
                <Button onClick={() => { userId ? handleSubmit() : toast({ description: "Please login before submitting" }) }}>
                    Submit
                </Button>
            </div>
        </>
    );
};
export default CodeEditor;