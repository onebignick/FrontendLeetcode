import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPage() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[275px] w-[400px] rounded-xl"/> 
        </div>
    )
}