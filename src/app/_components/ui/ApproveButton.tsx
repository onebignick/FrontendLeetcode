"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export function ApproveButton({id}:{id: string}) {
    const [isLoading, setLoading] = useState<boolean>(false);
    
    async function handleClick(id: string) {
        setLoading(!isLoading);
        const res = await fetch("/api/updateQuestion", {
            method: "PUT",
            body: JSON.stringify({id: id})
        })
        console.log(res);
        setLoading(!isLoading);
    }
    
    if (isLoading) {
        return (
            <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </Button>
        )
    } else {
        return (<Button onClick={()=>handleClick(id)}>Approve</Button>);
    }
}