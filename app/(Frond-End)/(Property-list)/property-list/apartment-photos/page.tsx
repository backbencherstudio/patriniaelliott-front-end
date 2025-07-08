"use client"

import { useCallback, useState } from "react"
import { useRouter } from 'next/navigation';


const header = [
    "Name and location",
    "Property setup",
    "Photos",
    "Pricing",
    "Calendar",
]


export default function page() {
    const router = useRouter()
    return (
        <div className="flex justify-center items-center w-full bg-[#F6F7F7]">
            <div className="py-15 px-4 max-w-[1320px] w-full space-y-[48px]">
                <ul className="flex w-full justify-between">
                    {
                        header.map(item => (
                            <li className="space-y-4 w-fit" key={item}>
                                <h3 className={`${item === "Photos" ? "text-[#070707]" : "text-[#777980]"} text-sm text-center`}>{item}</h3>
                                <div className="w-[210px] h-[12px] bg-[#D9D9D9] rounded-full relative">
                                    <div className={`absolute top-0 left-0 h-full w-3/4 bg-[#D6AE29] rounded-full ${item === "Photos" ? "" : "hidden"}`}></div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="flex justify-between w-full space-x-3 px-4">
                    <div className="text-[#0068EF] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#0068EF] rounded-[8px] cursor-pointer" onClick={() => router.back()}>Back</div>
                    <button type="button" className="text-[#fff] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] cursor-pointer" onClick={()=>router.push("/property-list/apartment-pricing")}>Continue</button>
                </div>
            </div>
        </div>
    )
}