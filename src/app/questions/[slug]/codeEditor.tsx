"use client"
import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from 'usehooks-ts';
import { submission } from "@/server/db/schema";
import ValidationResultSkeletonCard from "@/components/questions/ValidationResultSkeletonCard";
import ValidationResultCard from "@/components/questions/ValidationResultCard";
import ErrorPopUp from "@/components/general/ErrorPopUp";

interface codeEditorProps {
    questionId: string;
    userId: string | null;
}

const defaultValues: any = {
    "html": "<html>\n<head>\n\t<style>\n\t\t/* write your CSS code here */\n\t</style>\n</head>\n<body>\n\t<!-- Write your HTML code here -->\n\t<script>\n\t\t// write your Javascript code here\n\t</script>\n</body>\n</html>"
}

const CodeEditor = ({ questionId, userId } : codeEditorProps) => {
    const editorRef = useRef();
    const [language, setLanguage] = useState<string>("html");
    const [value, setValue] = useLocalStorage<string | undefined>("userCodeForQuestion-" + questionId, defaultValues[language]);
    const { toast } = useToast();
    const [windowWidth, setWindowWidth] = useState<number>();
    const [isLargeViewport, setIsLargeViewport] = useState<boolean>(true);

    // for code validation
    const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_CODE_VALIDATION_SERVICE_API_ENDPOINT;
    const [submissionId, setSubmissionId] = useState<string>();
    const [status, setStatus] = useState<string>('idle');
    const [logs, setLogs] = useState<string[] | null>(null);
    const [stackTrace, setStackTrace] = useState<string>("");
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
    const [errorString, setErrorString] = useState<string>("");

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }

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

    const onMount = (editor: any) => {
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
        if (!response.ok) {
            setErrorString("Unable to submit code, please try again");
            setStatus("fail");
            const errorResponse = await response.json();
            console.error("Failed to submit code for validation to backend service");
            console.error(errorResponse);
            return;
        }
        else if (response.ok) {
            const data = await response.json();
            console.log(data);
            setSubmissionId(data.id);
            setStatus('processing');
            toast({ description: "Submission Received! We are processing it." });
            scrollToBottom();
            return;
        }
        else {
            setErrorString("Unable to submit code, please try again");
            setStatus("fail");
        }
        
    }

    useEffect(() => {
        const pollSubmissionStatus = async (submissionId: string) => {
            const pollingInterval = 1000; // 1 second
            const timeout = 15000; // 15 seconds
            const startTime = Date.now();

            while (Date.now() - startTime < timeout) {
                console.log("Polling for status update");
                try {
                    const response = await fetch(`${apiUrl}/submission_status/${submissionId}`);
                    if (!response.ok) {
                        setErrorString("Failed to validate code, please try again.");
                        setStatus("fail");
                        const errorResponse = await response.json();
                        console.error("Failed to get submission status");
                        console.error(errorResponse);
                        return;
                    }
                    const statusData = await response.json();
                    if ("isCorrectAnswer" in statusData) {
                        setIsCorrectAnswer(statusData.isCorrectAnswer);
                        setStackTrace(statusData.errorStackTrace);
                        setLogs(statusData.logs); 
                        setStatus("processed");
                        toast({ description: "Completed Code Validation!" });
                        return;
                    }
                } catch (error) {
                    setStatus("idle");
                    console.error('Failed to get submission status:', error);
                    return;
                }
                // Wait for the next polling interval
                await new Promise(resolve => setTimeout(resolve, pollingInterval));
            }

            console.log("Timed out after 15 seconds");
            setErrorString("Timed out after 15 seconds: unable to validate code, please try again");
            setStatus('fail');
        };

        if (status === 'processing' && submissionId) {
            pollSubmissionStatus(submissionId);
        }
    }, [status, submissionId]);

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-5">
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
            {(status !== "processing") && (
                <div className="flex justify-end py-2">
                    <Button onClick={() => { userId ? handleSubmit() : toast({ description: "Please login before submitting" }) }}>
                        Submit
                    </Button>
                </div>
            )}
            
            {(status === "processing") && (
                <ValidationResultSkeletonCard/>
            )}
            {(status === "processed") && ( 
                <ValidationResultCard
                    isCorrectAnswer={isCorrectAnswer}
                    stackTrace={stackTrace}
                    logs={logs}
                /> 
            )}
            {(status == "fail") && (
                <ErrorPopUp error={errorString}/>
            )}
        </>
    );
};
export default CodeEditor;