import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <main className="w-full h-lvh flex justify-center items-center">
            <SignUp/>
        </main>
    );
}