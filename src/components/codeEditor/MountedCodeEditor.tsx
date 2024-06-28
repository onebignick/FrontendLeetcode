"use client"
import { useEffect, useState } from "react";
import CombinedCodeEditor from "./CombinedCodeEditor";

interface Props {
    questionId: number
};

export function MountedCodeEditor({questionId}: Props) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted ? <CombinedCodeEditor questionId={questionId.toString()} userId={"test"}/> : "hello world"; 
}
