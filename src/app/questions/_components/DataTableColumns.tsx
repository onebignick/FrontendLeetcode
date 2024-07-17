"use client"

import { ColumnDef } from "@tanstack/react-table";
import { QuestionWithTypes } from "@/lib/repository/question/QuestionRepository";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowOptions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<QuestionWithTypes>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Title" />),
        cell: ({ row }) => {
            return (
                <Button variant="link" asChild>
                    <Link href={`/questions/${row.original.id}`}>{row.getValue("title")}</Link>
                </Button>
            );
        }
    },
    {
        accessorKey: "labels",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Labels" />),
        cell: ({ row }) => {
            const questionTypesArray: string[] = row.original.questionTypes;
            return (
                <div className="flex gap-4">
                    {questionTypesArray.map(function(questionType, idx) {
                        return <Badge key={idx}>{questionType}</Badge>
                    })}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const targetArray: string[] = row.original.questionTypes;
            return targetArray.includes(value);
        },
    },
    {
        id: "actions",
        cell: () => <DataTableRowActions />,
    }
];
