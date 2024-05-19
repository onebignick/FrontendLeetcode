"use client"

import { useState } from "react";

interface Props {
    editorTypes: string[],
    questionId: number
}

export default function IdeContainer({editorTypes, questionId}:Props) {
    const [currentEditor, setCurrentEditor] = useState(editorTypes[0]);
    const [codeCache, setCodeCache] = useState({});

    const createSubmission = async (url: string, data={}) => {
        const response = await fetch(url, {
            method:"POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const handleCurrentEditor = (editorType: string) => {
        setCurrentEditor(editorType);
        return;
    }

    
    const handleCodeCache = (e: any) => {
        const newCodeCache = {...codeCache, [e.target.name]: e.target.value};
        setCodeCache(newCodeCache);
        return;
    }

    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        for (let i=0;i<editorTypes.length;i++) {
            createSubmission("http://localhost:3000/api/createSubmission", {
                username: "admin",
                questionId: questionId,
                language: editorTypes[i],
                code: codeCache[editorTypes[i]] ? codeCache[editorTypes[i]] : ""
            }).then((data) => {console.log(data)})
        }
    }

    
    const handleReset = () => {
        setCodeCache({});
    }

    return (
        <section>
            <div className="flex flex-row gap-4 p-4">
                {editorTypes.map(function(editorType) {
                    return (<div key={editorType} onClick={() => handleCurrentEditor(editorType)}>{editorType}</div>)
                })}
            </div>
            Currently selected: {currentEditor}
            <div>
                <textarea name={currentEditor} value={codeCache[currentEditor] || ""} onChange={(e) => {handleCodeCache(e)}} className="text-black"/>
                <div className="flex flex-row gap-4 p-4">
                    <button>Run</button>
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
                    <button onClick={() => handleReset()}>Reset</button>
                </div>
            </div>
        </section>
    );
}