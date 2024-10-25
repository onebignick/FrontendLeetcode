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
import Split from 'react-split';
import { passionOne } from "@/app/fonts";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    // for code validation
    // const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_CODE_VALIDATION_SERVICE_API_ENDPOINT;
    const apiUrl = "https://frontendcodevalidationservice-cyz3lynf7q-uc.a.run.app/";
    const [submissionId, setSubmissionId] = useState<string>();
    const [status, setStatus] = useState<string>('idle');
    const [logs, setLogs] = useState<string[] | null>(null);
    const [stackTrace, setStackTrace] = useState<string>("");
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
    const [errorString, setErrorString] = useState<string>("");

    const scrollToBottom = () => {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }, 100);
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
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }
    }, []);

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    };

    const handleSubmit = async () => {
        try {
            setStatus('submissionRequested');
            scrollToBottom();
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
                return;
            }
            else {
                setErrorString("Unable to submit code, please try again");
                setStatus("fail");
                return;
            }
        } catch(error) {
            console.error("Error in code submission", error)
        } finally {
            router.refresh();
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
                } finally {
                    router.refresh();
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
            {isLargeViewport ? (
                <Split className="split" gutterSize={7}>
                    <div className="flex flex-col w-full lg:w-1/2 h-1/2 lg:h-fit">
                        <div className="flex flex-row gap-x-3 items-center p-2 border-2 border-r-0 border-gray-500 rounded-tl-lg">
                            <div className={`${passionOne.className} font-bold text-xl`}>{`</>`}</div>
                            <div className={`${passionOne.className} font-semibold text-xl md:text-2xl`}>Code</div>
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
                        <div className="flex flex-row gap-x-3 items-center p-2 border-2 border-l-0 border-gray-500 rounded-tr-lg">
                            <div className={`${passionOne.className} font-semibold text-xl md:text-2xl px-2`}>Output</div>
                        </div>
                        <iframe
                            className={`bg-white w-full overflow-y-auto ${(isLargeViewport) ? 'h-full' : 'h-[500px]'}`}
                            srcDoc={value}
                            title="output"
                            sandbox="allow-scripts allow-forms"
                        />
                    </div>
                </Split>) : (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-full lg:w-1/2 h-1/2 lg:h-fit">
                        <div className="flex flex-row gap-x-3 items-center p-2 border-2 border-gray-500 rounded-t-lg">
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
                        <div className="flex flex-row gap-x-3 items-center p-2 border-2 border-gray-500 rounded-t-lg">
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
            )}

            {(status !== "submissionRequested" && status !== "processing") && (
                <div className="flex justify-end py-2">
                    <Button onClick={() => { userId ? handleSubmit() : toast({ description: "Please login before submitting" }) }} className="w-1/4">
                        Submit
                    </Button>
                </div>
            )}
            
            {(status === "submissionRequested" || status === "processing") && (
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