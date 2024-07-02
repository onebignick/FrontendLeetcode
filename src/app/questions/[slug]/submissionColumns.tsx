"use client"

import { ColumnDef } from "@tanstack/react-table"

type Status = {
    id: string
    name: string
}

type Result = {
    id: string
    name: string
}

type Submission = {
    id: string
    userId: string
    questionId: string
    language: string
    code: string
    status: string
    result: string
    createdAt: Date
}

export type SubmissionQuery = {
    submission: Submission
    status: Status
    result: Result
}

export const columns: ColumnDef<SubmissionQuery>[] = [
    {
        accessorKey: "submission.createdAt",
        header: "Time Submitted",
    },
    {
        accessorKey: "result.name",
        header: "Result",
    },
    {
        accessorKey: "submission.language",
        header: "Language",
    },
]

