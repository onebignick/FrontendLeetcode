import React from 'react';
import Image from 'next/image';
import { passionOne } from '@/app/fonts';

export default function Footer() {
  return (
    <>
      <footer id="footer" className="flex justify-center items-center p-3 border-t-2 gap-x-3">
        <p className={`${passionOne.className} text-base font-semibold`}>FRONTEND RACERS</p>
        <Image
          src="/logo.png"
          width={30}
          height={30}
          alt="logo"
        />
      </footer>
    </>
  )
}
