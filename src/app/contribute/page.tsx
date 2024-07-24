"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	title: z.string()
		.min(5, {
			message: "Title must be at least 5 characters"
		})
		.max(1000),
	difficulty: z.string(),
})

export default function Contribute() {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}
	return (
		<div className="px-10 py-5">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Question Title</FormLabel>
								<FormControl>
									<Input placeholder="Title of your question" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="difficulty"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Question Difficulty</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a difficulty" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="cea62e47-0250-428d-b8c3-ff9a90f0b32a">Easy</SelectItem>
										<SelectItem value="389e9322-6cd9-42e3-a2cf-ab483fa773b5">Medium</SelectItem>
										<SelectItem value="5b842ade-c0aa-4a5f-97f1-b86f92e0d273">Hard</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
