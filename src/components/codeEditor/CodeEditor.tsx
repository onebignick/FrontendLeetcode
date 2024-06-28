"use client"
import React, { useState, useRef } from 'react'
import MonacoEditor from 'react-monaco-editor'

interface CodeEditorProps  {
    language: string,
    displayName: string,
    value: string,
    onChange?: (value: string) => void
}

export default function CodeEditor(props : CodeEditorProps) {
    // This editor is for HTML/CSS/JS only (for now...)
    const {
        language,
        displayName,
        value,
        onChange
    } = props

    const editor = useRef<any>()
    const [open, setOpen] = useState<boolean>(true)

    const handleChange = (editor: any, data: any, value: string) => {
        if (onChange) {
            onChange(value)
        }
    } 

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
            <MonacoEditor
                // width="800"
                height="600"
                language={language}
                theme="vs-dark"
                value={value}
                onChange={onChange}
                options={{
                    selectOnLineNumbers: true,
                    automaticLayout: true,
                }}
            />
            }
        </div>
    )
}
