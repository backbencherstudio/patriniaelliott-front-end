import { Skeleton } from '../ui/skeleton'

function BigCardSkleton() {
    return (
        <div>
            <div className="lg:grid grid-cols-8 gap-6 items-center space-x-4 bg-white shadow-lg rounded-lg p-4">
                {/* Left image skeleton */}
                <Skeleton className="lg:h-[220px] h-[200px] w-full col-span-3 rounded-lg" />

                <div className="space-y-2 col-span-5">
                    {/* Title skeleton */}
                    <Skeleton className="h-14 w-full" />

                    {/* Description skeleton */}
                    <Skeleton className="h-4 w-[80%]" />

                    {/* Price skeleton */}
                    <Skeleton className="h-6 w-[60%]" />

                    {/* Button skeleton */}
                    <Skeleton className="h-10 w-36 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export default BigCardSkleton
