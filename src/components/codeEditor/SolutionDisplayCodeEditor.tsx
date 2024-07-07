"use client"
import React, { useState, useEffect } from 'react'
import { Editor } from "@monaco-editor/react";
import prettier from 'prettier';
import parserHtml from 'prettier/parser-html';

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

    const [open, setOpen] = useState<boolean>(true);
    const [formattedHtmlCode, setFormattedHtmlCode] = useState<string>("");

    useEffect(() => {
        const formatCode = async () => {
            try {
                const formatted = await prettier.format(value, {
                    parser: 'html',
                    plugins: [parserHtml],
                });
                setFormattedHtmlCode(formatted);
            } catch (error) {
                console.error("Failed to format code", error);
                setFormattedHtmlCode(value);
            }
        };
        formatCode();
    }, [value]);
    

    return (
        <div className={`w-full ${open ? '' : 'collapsed'} rounded`}>
            <div className="flex items-center justify-between text-md border-2 border-b-0 border-purple-600 rounded-t-xl bg-white text-black font-medium px-3 py-2">
                {displayName}
                <button
                    type="button"
                    className="bg-white"
                    onClick={() => setOpen(!open)}
                >
                    {/* <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                </button>
            </div>
            {open &&
            <Editor
                options={{
                    minimap: {
                        enabled: false,
                    },
                    readOnly: true
                }}
                height="65vh"
                theme="vs-dark"
                value={formattedHtmlCode}
                language={language}
                // onMount={onMount}
                // onChange={(value) => setValue(value)}
            />
            }
        </div>
    )
}