import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function WelcomeCard() {
    return (
        <div className='space-y-20 md:mt-5'>
            <div className='w-full flex flex-col md:flex-row px-2'>
                <div className='md:w-1/2 flex flex-col gap-y-5 lg:gap-y-7 justify-center items-center py-4 lg:py-8 md:px-5'>
                    <div className='w-full flex justify-start text-5xl lg:text-6xl xl:text-7xl uppercase lg:text-5xl font-bold italic'>
                        WELCOME, DEVELOPER
                    </div>
                    <div className="w-full flex justify-start text-3xl lg:text-4xl font-semibold">
                        Trying to learn Web Development?
                    </div>
                    <div className="w-full flex justify-start text-[17px] lg:text-[21px] font-medium">
                        You've come to the right place. We will help you master basic HTML/CSS/JS with our suite of frontend leetcode-styled questions
                    </div>
                </div>
                <div className='md:w-1/2 flex flex-col justify-center items-center gap-y-3'>
                        <div className='w-full flex justify-center'>
                            <Image
                                src="/htmlcssjsImage.png"
                                width={400}
                                height={400}
                                alt="htmlcssjsImage"
                            />
                        </div>
                            <button className="w-full md:w-2/3 bg-white px-8 py-2 rounded-xl text-lg md:text-xl font-extrabold text-black hover:bg-gray-300">
                                <Link href="/questions">
                                    START CODING!
                                </Link>
                            </button>
                    </div>
            </div>
            <div className='w-full flex flex-col justify-center gap-y-5 md:gap-y-8'>
                <div className='w-full flex justify-center'>
                    <Image
                        src="/dev-brain.svg"
                        width={200}
                        height={200}
                        alt="developerBrainPng"
                    />
                </div>
                <div className='w-full flex flex-col justify-center'>
                    <div className="flex font-extrabold text-5xl lg:text-6xl xl:text-7xl uppercase mb-8 text-center">Wire HTML/CSS/JS into your developer brain</div>
                    <div className='text-center'>Get your basics down</div>
                </div>
            </div>
            {/* <div>
                Cards for each language here.
            </div> */}
        </div>
    )
}
