import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { inter } from "./fonts";
import { auth } from "@clerk/nextjs/server";
import { SubmissionRepository } from '@/lib/repository/submission/SubmissionRepository';

export const metadata: Metadata = {
	title: 'Frontend Racers',
	description:
		'Come sharpen your Frontend Development skills with Frontend racers',
	icons: {
		icon: 'logo.png',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { userId } = auth();
	let userSubmissionRecords = [];
    if (userId) {
        const submissionRepository = new SubmissionRepository();
        userSubmissionRecords = await submissionRepository.getSubmissionRecords(userId);
    }

	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${inter.className}`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar submissionRecords={userSubmissionRecords}/>
						<div className="min-h-screen">{children}</div>
						<Toaster />
						<Footer />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
