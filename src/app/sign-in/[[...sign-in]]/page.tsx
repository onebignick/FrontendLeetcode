import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { SkeletonPage } from "./skeleton"

export default function Page() {
    return (
        <main className="w-full h-lvh flex justify-center items-center">
            <ClerkLoading>
                <SkeletonPage/>
            </ClerkLoading>
            <ClerkLoaded>
                <SignIn/>
            </ClerkLoaded>
        </main>
    );
}