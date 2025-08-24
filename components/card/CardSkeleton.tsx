import { Skeleton } from '../ui/skeleton'

function CardSkeleton() {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 items-center space-x-4 bg-white shadow-lg rounded-lg p-4">
                {/* Left image skeleton */}
                <Skeleton className="lg:h-[240px] h-[200px] w-full  rounded-lg" />

                <div className="space-y-2 ">
                    {/* Title skeleton */}
                    <Skeleton className="h-10 w-full" />


                    {/* Price skeleton */}
                    <Skeleton className="h-6 w-[60%]" />
                    <Skeleton className="h-6 w-[40%]" />

                    {/* Button skeleton */}
                    <Skeleton className="h-0.5 w-[100%] " />
                    <div className='flex justify-between w-full'>
                        <div>

                            <Skeleton className="h-5 w-36 mb-1  rounded-sm" />
                            <Skeleton className="h-4 w-30  rounded-sm" />
                        </div>
                        <Skeleton className="h-10 w-36  rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardSkeleton
