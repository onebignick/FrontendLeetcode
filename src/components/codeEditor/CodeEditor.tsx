import React, { useState, useRef } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import { Controlled as ControlledEditor } from 'react-codemirror2'

type CodeEditorProps = {
    language: string,
    displayName: string,
    value: string,
    onChange: (value: string) => void
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

    function handleChange(editor: any, data: any, value: string) {
        onChange(value)
    } 
    const unmountDuplicateEditor = () => {
        // unmount the duplicate wrapper (Need to force this this as the editor will render twice for no reason)
        editor.current.display.wrapper.remove()
    }
    return (
        <div className={`w-full ${open ? '' : 'collapsed'} rounded`}>
            <div className="flex items-center justify-between text-md border-2 border-purple-600 rounded-t-xl bg-white text-black font-medium px-3 py-2">
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
                <ControlledEditor
                    onBeforeChange={handleChange}
                    value={value}
                    className="border-2 border-t-0 border-white rounded-b-sm"
                    options={{
                        lineWrapping: true,
                        lint: true,
                        mode: language,
                        theme: 'material',
                        lineNumbers: true
                    }}
                    // do not delete below 2 lines (needed to stop duplicate code editor renders)
                    editorDidMount={(e) => editor.current = e}
                    editorWillUnmount={unmountDuplicateEditor}
                />
            }
        </div>
    )
}
