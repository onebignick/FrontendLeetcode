import React from 'react';
import { passionOne } from '@/app/fonts';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryCardProps {
    category: string;
    description: string;
    callToAction: string;
    callToActionUrl: string;
}

export default function CategoryCard({ category, description, callToAction, callToActionUrl } : CategoryCardProps) {
  return (
    <Link href={callToActionUrl}>
        <div className='h-full border-4 rounded-lg px-7 md:px-10 py-8 hover:bg-white hover:text-black'>
            <div className='flex flex-col justify-between h-full gap-y-3'>
                <Image
                    src={`/${category}.png`}
                    alt={`/${category}.png`}
                    width={80}
                    height={80}
                />
                <div className={`${passionOne.className} text-2xl md:text-3xl`}>
                    {category.toUpperCase()}
                </div>
                <div className='text-left text-lg md:text-xl'>
                    {description}
                </div>
                <div className='text-left text-lg md:text-xl underline underline-offset-3'>
                    {callToAction} →
                </div>
            </div>
        </div>
    </Link>
  )
}
