"use client"
import React, { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CombinedCodeEditorProps {
    questionId: string,
    userId: string | null
}

export default function CombinedCodeEditor({ questionId, userId }: CombinedCodeEditorProps) {
    const API_URL = process.env.NEXT_PUBLIC_FRONTEND_CODE_VALIDATION_SERVICE_API_ENDPOINT
    const [html, setHtml] = useLocalStorage('html_qn' + questionId, '')
    const [css, setCss] = useLocalStorage('css_qn' + questionId, '')
    const [js, setJs] = useLocalStorage('js_qn' + questionId, '')
    const [srcDoc, setSrcDoc] = useState<string>('')
    const [validationOutcome, setValidationOutcome] = useState<boolean>()
    const [validationErrorMessage, setValidationErrorMessage] = useState<string>()
    const [loadingSubmission, setLoadingSubmission] = useState<boolean>(false)
    const { toast } = useToast();

    // can post this srcDoc as a json payload to our validation service

    useEffect(() => {
        setSrcDoc(`
            <html>
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script>
            </html>
        `)
    }, [html, css, js])

    const handleSubmit = async () => {
        try {
            setLoadingSubmission(true);
            const response = await fetch("/api/createSubmission", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userId,
                    questionId: questionId,
                    language: "html/css/javascript",
                    code: srcDoc
                })
            });
            console.log(response.json());
            const res = await fetch(`${API_URL}/process_html/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: srcDoc }),
            });
            const jsonResponse = await res.json();
            // console.log(jsonResponse);
            const validationOutcomeObject = jsonResponse.validation_outcome
            setValidationOutcome(validationOutcomeObject.isCorrectSolution)
            if (validationOutcomeObject.isCorrectSolution === false) {
                setValidationErrorMessage(validationOutcomeObject.error_message)
            }
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoadingSubmission(false)
        }
    }

    return (
        <>
            <div className='flex flex-col gap-y-5'>
                <div className='flex flex-row gap-x-5 flex-1 overflow-y-auto'>
                    <CodeEditor
                        language="xml"
                        displayName="HTML"
                        value={html}
                        onChange={setHtml}
                    />
                    <CodeEditor
                        language="css"
                        displayName="CSS"
                        value={css}
                        onChange={setCss}
                    />
                    <CodeEditor
                        language="javascript"
                        displayName="Javascript"
                        value={js}
                        onChange={setJs}
                    />
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-xl font-medium pb-2'>Output:</h1>
                    <div className='bg-white rounded-xl flex-1 min-h-96 h-full'>
                        <iframe
                            className='w-full h-full'
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                        />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button onClick={() => { userId ? handleSubmit() : toast({ description: "Please log in before submitting" }) }}>
                        Submit
                    </Button>
                </div>
                <div>
                    {(validationOutcome === false) && (
                        <div>
                            <h1 className='text-xl font-bold'>Validation Failed</h1>
                            <h2 className='text-lg font-medium'>Error StackTrace:</h2>
                            <p>{validationErrorMessage}</p>
                        </div>
                        
                    )}
                    {(validationOutcome === true) && (
                        <div>
                            <h1 className='text-xl font-bold'>Validation Successful!</h1>
                            <h2 className='text-lg font-medium'>Good Job!</h2>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
