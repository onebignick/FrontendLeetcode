"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export function ApproveButton({id}:{id: string}) {

    const router = useRouter();
    const [isLoading, setLoading] = useState<boolean>(false);
    
    async function handleClick(id: string) {
        setLoading(true);
        try {
            const res = await fetch("/api/updateQuestion", {
                method: "PUT",
                body: JSON.stringify({id: id})
            })
            console.log(res);
        } catch(error) {
            console.error(error);
        } finally {
            router.refresh();
            setLoading(false);
        }
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