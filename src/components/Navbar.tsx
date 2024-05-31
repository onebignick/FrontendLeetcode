import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
	return (
		<nav className="flex w-full items-center justify-between p-4 px-6 border-b-2">
			<Link href="/">
				<div className="flex flex-row items-center">
					<Image src="/logo.png" width={30} height={30} alt="logo" className='mx-2'/>
					<h1 className="text-xl font-semibold">FRONTEND RACERS</h1>
				</div>
			</Link>

			<div className="flex gap-x-4 text-lg font-medium">
				<Link href="/questions">Problems</Link>
				<Link href="/">Sign in</Link>
			</div>
		</nav>
	);
}
