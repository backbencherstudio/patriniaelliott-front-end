import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function DateFilter() {
    const [dateRange, setDateRange] = React.useState<" " | "7days" | "15days" | "30days">(" ")
   const searchParams= useSearchParams()
   const router = useRouter()
   const pathname = usePathname()
   const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value as " " | "7days" | "15days" | "30days")
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("dateFilter", e.target.value)
    router.replace(`${pathname}?${currentParams.toString()}`,  { scroll: false });
   }
   


  return (
    <div>
       <div className=" items-center flex gap-1  md:gap-2 text-sm text-[#0068ef] border p-2 rounded">
            <Image
              src="/dashboard/icon/filter.svg"
              alt="filter"
              width={14}
              height={14}
            />
            <select
              aria-label="Date range"
              value={dateRange}
                onChange={handleDateRangeChange}
              className="bg-transparent text-[#0068ef] text-sm md:text-base  cursor-pointer"
            >
                <option className="text-xs" value="">All Time</option>
              <option className="text-xs" value="7days">7 days</option>
              <option className="text-xs" value="15days">15 days</option>
              <option className="text-xs" value="30days">30 days</option>
            </select>
          </div>
    </div>
  )
}

export default DateFilter
