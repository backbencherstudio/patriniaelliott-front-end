'use client'

import Image from "next/image"
import coverImage from "@/public/vendor/apartment-info-cover.jpg"
import { useRouter, useSearchParams } from 'next/navigation';

export default function page() {
    const router = useRouter();
    const steps = [
        "Input host details",
        "Input property setup",
        "Add photos",
        "Pricing and availibility",
        "Create listing",
    ]
    const searchParams = useSearchParams();

    const data = searchParams.get('data');
    console.log(data)
    return (
        <div className="py-30 flex items-center justify-center bg-[#F6F7F7]">
            <div className="space-y-6">
                <div className="space-y-[32px] bg-white p-6 rounded-[24px]">
                    <div className="space-y-3 flex flex-col lg:flex-row space-x-3">
                        <h3 className="text-[#23262F] text-sm sm:text-2xl font-medium">Follow a few steps to create your listing now!</h3>
                        <div className="flex gap-1 bg-[#FFFBEE] rounded-[12px] p-4 text-[#070707]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14.6673 8.00065C14.6673 4.31875 11.6825 1.33398 8.00065 1.33398C4.31875 1.33398 1.33398 4.31875 1.33398 8.00065C1.33398 11.6825 4.31875 14.6673 8.00065 14.6673C11.6825 14.6673 14.6673 11.6825 14.6673 8.00065Z" stroke="#070707" stroke-width="0.75" />
                                <path d="M8.16081 11.334V8.00065C8.16081 7.68638 8.16081 7.52925 8.06314 7.43158C7.96554 7.33398 7.80841 7.33398 7.49414 7.33398" stroke="#070707" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.99414 5.33398H8.00014" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div>
                                <p className="text-[10px] sm:text-[14px]">You have selected {data} apartment where guests can book </p>
                                <p>the entire place.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-[32px]">
                        <div>
                            <Image src={coverImage} alt="Overview" className="w-full min-w-[300px] max-w-[500px] h-full max-h-[250px] rounded-[16px]" />
                        </div>
                        <div className="pl-[10px] sm:pl-[15px] pt-3">
                            <ul className="border-l border-[#D6AE29] space-y-5 text-[#4A4C56] text-[18px]">
                                {
                                    steps.map((step, index) => (
                                        <li className="flex gap-3 -translate-x-[13px] sm:-translate-x-[15px]">
                                            <div className="w-[24px] sm:w-[27px] h-[24px] sm:h-[27px] bg-white border border-[#D6AE29] text-center rounded-full text-[#D6AE29] font-medium flex items-center justify-center text-sm">{index + 1}</div>
                                            <h3 className="text-sm sm:text-base">{step}</h3>
                                        </li>
                                    ))
                                }

                                {/*
                                <li className="flex gap-3 -translate-x-[13px]">
                                    <div className="w-[24px] h-[24px] bg-white border border-[#D6AE29] text-center rounded-full text-[#D6AE29] font-medium">2</div>
                                    <h3>Input property setup</h3>
                                </li>
                                <li>
                                    <div>3</div>
                                    <h3>Add photos</h3>
                                </li>
                                <li>
                                    <div>4</div>
                                    <h3>Pricing and availibility</h3>
                                </li>
                                <li>
                                    <div>5</div>
                                    <h3>Create listing</h3>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full space-x-3 px-4">
                    <button className="text-[#0068EF] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#0068EF] rounded-[8px] cursor-pointer" onClick={() => router.back()}>Back</button>
                    <button className="text-[#fff] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] cursor-pointer" onClick={() => router.push("/property-list/apartment-name-location")}>Continue</button>
                </div>
            </div>
        </div>
    )
}