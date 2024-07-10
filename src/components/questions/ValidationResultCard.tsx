"use client"
import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface ValidationResultCardProps {
    isCorrectAnswer: boolean;
    stackTrace: string
    logs: string[] | null;
}

export default function ValidationResultCard({ isCorrectAnswer, stackTrace, logs} : ValidationResultCardProps) {

    const [resultString, setResultString] = useState<string>();
    const { toast } = useToast();

    useEffect(() => {
        const getResultString = (isCorrectAnswer: boolean) => {
            if (isCorrectAnswer) {
                return "Correct Answer";
            } else {
                return "Wrong Answer"
            }
        }
        setResultString(getResultString(isCorrectAnswer));
    }, []);
    return (
        <>
        <h1 className="text-lg lg:text-xl font-bold px-1 pb-2">Validation result:</h1>
        <div className="flex flex-col gap-x-2 justify-start border-2 rounded-lg py-3 lg:py-5 px-5 lg:px-7 gap-y-3">
            <div className="flex text-base lg:text-lg font-bold items-center">
                {resultString}
            </div>
            <div className="w-full flex flex-col gap-y-3">
                {stackTrace && (
                    <div className='flex flex-col'>
                        <h1 className='font-semibold flex justify-start'>Stack Trace:</h1>
                        <div className='w-full p-3 text-wrap border-2 rounded-lg'>
                            {stackTrace}
                        </div>
                    </div>
                )}
                {(logs !== null && logs.length > 0 && logs[0] !== "") && (
                    <div className='flex flex-col gap-y-1'>
                        {logs.map((value, index) => (
                            <div key={index} className='p-2 border-2'>
                                {value}
                            </div>
                        ))}
                    </div>
                )}
            </div>        
        </div>
    </>
    )
}
