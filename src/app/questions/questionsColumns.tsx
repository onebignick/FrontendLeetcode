"use client"
import { IQuestion } from "@/lib/repository/question/QuestionRepository";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<IQuestion>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <Button variant="link" asChild>
                    <Link href={`questions/${row.original.id}`}>{row.getValue("title")}</Link>
                </Button>
            )
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
]
