import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from '@/components/ui/Spinner';

export default function ValidationResultSkeletonCard() {
  return (
    <>
        <h1 className="text-lg lg:text-xl font-bold px-1 py-2">Validation result:</h1>
        <div className="flex flex-col gap-x-2 justify-start border-2 rounded-lg py-3 lg:py-5 px-5 lg:px-7 gap-y-3">
            <div className="flex flex-row gap-x-2 items-center">
                <div className="w-fit">
                    <Spinner />
                </div>
                <div className="font-semibold">
                    Validating Code
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-col space-y-5">
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-1/2" />
                        <Skeleton className="h-5 w-1/2" />
                    </div>
                </div>
            </div>        
        </div>
    </>
  )
}
