"use client"
import React, { useState, useEffect } from 'react'
import { Editor } from "@monaco-editor/react";
import prettier from 'prettier';
import parserHtml from 'prettier/plugins/html';

interface SolutionDisplayCodeEditorProps  {
    language: string,
    displayName: string,
    value: string,
}

export default function SolutionDisplayCodeEditor(props : SolutionDisplayCodeEditorProps) {
    const {
        language,
        displayName,
        value,
    } = props

    const [showCode, setShowCode] = useState<boolean>(false);
    const [formattedCode, setFormattedCode] = useState<string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);

    useEffect(() => {
        const formatCode = async () => {
            try {
                // below is our formatting logic that formats code pulled from database
                let formatted = await prettier.format(value, {
                    parser: 'html',
                    plugins: [parserHtml],
                });
                // formatted = formatted.replaceAll("                 ", "\n\t\t\t\t");
                // formatted = formatted.replaceAll("             ", "\n\t\t\t");
                // formatted = formatted.replaceAll("        ", "\n\t\t");
                // formatted = formatted.replaceAll("     ", "\n\t");
                // formatted = formatted.replaceAll("> ", ">\n");
                formatted = formatted.replaceAll("                      ", "\n\t\t\t\t\t\t");
                formatted = formatted.replaceAll("                  ", "\n\t\t\t\t\t");
                formatted = formatted.replaceAll("              ", "\n\t\t\t\t");
                formatted = formatted.replaceAll("          ", "\n\t\t\t");
                formatted = formatted.replaceAll("      ", "\n\t\t");
                
                setFormattedCode(formatted);
            } catch (error) {
                console.error("Failed to format code", error);
                setFormattedCode(value);
            }
        };
        formatCode();
    }, [value]);

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(formattedCode);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        } catch (e) {
            console.error(
                "Unable to copy to clipboard.",
                e
            );
            alert("Copy to clipboard failed.");
        }
    };
    
    return (
        <div className={`w-full h-full ${showCode ? '' : 'collapsed'} rounded`}>
            <div className="flex flex-row gap-x-3 items-center p-2 border-2 border-gray-500 rounded-t-xl justify-between">
                <div className='flex flex-row'>
                    <div className="font-bold">{`</>`}</div>
                    <div className="font-semibold text-xl px-2">Solution Code</div>
                </div>
                
                {isCopied ? (
                    <div className='py-[5px] text-sm'>
                        Copied Successfully!
                    </div>
                ) :  (showCode && (
                        <button
                            type="button"
                            className="rounded-lg p-0.5 border-[1px] border-transparent hover:border-gray-300"
                            onClick={handleCopyClick}
                            // onClick={() => setShowCode(!showCode)}
                        >
                            <div className='rounded-xl'>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                    />
                                </svg>
                            </div>
                        </button>
                    )
                )}
                
            </div>
            {showCode ?
                <Editor
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        readOnly: true
                    }}
                    height="75vh"
                    theme="vs-dark"
                    value={formattedCode}
                    language={language}
                />
            : (
                <div className='min-h-[585px] border-4 flex flex-col justify-center items-center'>
                    <button 
                        className='text-base lg:text-lg font-medium rounded-lg bg-muted hover:bg-white hover:text-black hover:border-[3px] hover:border-slate-600 p-4'
                        onClick={() => {setShowCode(true)}}
                    >
                        Show Solution Code
                    </button>
                </div>
            )}
        </div>
    )
}