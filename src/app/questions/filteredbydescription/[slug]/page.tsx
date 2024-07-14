import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuestionRepository } from '@/lib/repository/question/QuestionRepository';
import { columns } from "../../questionsColumns";
import { DataTable } from '../../questionsTable';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbLink } from "@/components/ui/breadcrumb";

export default async function page({ params }: { params: { slug: string } }) {

    // this route filters by description
    const descriptionFilterValue = decodeURIComponent(params.slug);

    const questionRepository: QuestionRepository = new QuestionRepository();
    const data = await questionRepository.getByDescriptionValue(descriptionFilterValue);

    const QuestionBreadcrumb = () => {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`./${params.slug}`}>{`${descriptionFilterValue} Problems`}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <QuestionBreadcrumb/>
            <div className='flex flex-row justify-between'>
                <h1 className='text-xl lg:text-2xl font-semibold'>{`${descriptionFilterValue} Problems`}</h1>
                <Button className='w-1/5'>
                    <Link href="/questions">
                        See All Problems
                    </Link>
                </Button>
            </div>
            <DataTable data={data} columns={columns} hideFilterAndDropdown={true}/>
        </div>
    )
}
