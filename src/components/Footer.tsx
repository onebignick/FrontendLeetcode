import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
      <footer id="footer" className="flex justify-center items-center p-3 border-t-2 gap-x-3">
        <p className='text-sm font-semibold'>FRONTEND RACERS</p>
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
