"use client"
import React, { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import useLocalStorage from '../../hooks/useLocalStorage'

interface CombinedCodeEditorProps {
    question_id: number
}

export default function CombinedCodeEditor({ question_id }: CombinedCodeEditorProps) {

    const [html, setHtml] = useLocalStorage('html_qn' + question_id, '')
    const [css, setCss] = useLocalStorage('css_qn' + question_id, '')
    const [js, setJs] = useLocalStorage('js_qn' + question_id, '')
    const [srcDoc, setSrcDoc] = useState<string>('')
    // can post this srcDoc as a json payload to our validation service

    useEffect (() => {
        setSrcDoc(`
            <html>
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script>
            </html>
        `)
    }, [html, css, js])

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
                            frameBorder="0"
                        />
                    </div>
                </div>
            </div>  
        </>
    )
}
