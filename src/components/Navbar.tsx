"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { ModeToggle } from './general/theme-toggle';

const DotIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			fill="currentColor"
		>
			<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
		</svg>
	)
}

export default function Navbar() {
	return (
		<nav className="flex w-full items-center justify-between p-4 px-6 border-b-2">
			<Link href="/">
				<div className="flex flex-row items-center">
					<Image src="/logo.png" width={30} height={30} alt="logo" className='mx-2' />
					<h1 className="text-xl font-semibold">FRONTEND RACERS</h1>
				</div>
			</Link>

			<div className="flex gap-x-4 text-lg font-medium">
				<Button asChild>
					<Link href="/questions">Problems</Link>
				</Button>
				<ModeToggle />
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<UserButton>
						<UserButton.UserProfilePage
							label="My Stats"
							labelIcon={<DotIcon />}
							url="stats"
						>
							<div>Hello world!</div>
						</UserButton.UserProfilePage>
						<UserButton.UserProfilePage label="account" />
						<UserButton.UserProfilePage label="security" />
					</UserButton>
				</SignedIn>
			</div>
		</nav>
	);
}
