"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "../ui/Spinner";
import ErrorPopUp from "../general/ErrorPopUp";

interface Props {
    userId: string | null,
    questionId: string,
}

const formSchema = z.object({
    title: z.string().min(10, {
        message: "title must be at least 10 characters.",
    }),
    description: z.string().min(10, {
        message: "description must be at least 10 characters.",
    }),
});

export const DiscussionForm = ({ userId, questionId }: Props) => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [postSubmissionError, setPostSubmissionError] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await fetch("/api/createPost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    authorId: userId,
                    questionId: questionId,
                    title: values.title,
                    description: values.description
                })
            })
            if (!response.ok) {
                setPostSubmissionError(true);
                console.error("Failed to create post");
                setTimeout(() => {
                    setPostSubmissionError(false);
                }, 3000); // display error pop up for 3 seconds
            }
            form.reset();
            // console.log(response.json());
        } catch (error: any) {
            console.error(error)
        } finally {
            router.refresh();
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title here" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter description here" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className={`${loading ? "disabled pointer-events-none" : ""} w-1/4`}>
                    {loading ? (
                        <Spinner />
                    ) : (
                        "Create Post"
                    )}
                </Button>
                {postSubmissionError && (
                    <ErrorPopUp error={`Error in creating discussion post. Please Try again`}/>
                )}
            </form>
        </Form>
    );
}
