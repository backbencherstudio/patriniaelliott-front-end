'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { usePropertyContext } from "@/provider/PropertySetupProvider";

const propertySteps = [
    "Name and location",
    "Property setup",
    "Photos",
    "Pricing",
    "Calendar",
]

const tourSteps=[
    'Tour host',
    'Tour setup',
    'Calendar'
]

export default function Navbar() {
    const {listProperty} = usePropertyContext();
    const currentPath = usePathname();
    const [steps,setSteps] = useState(['']);



    useEffect(()=>{
        if(listProperty?.type === 'Tour'){
            setSteps([...tourSteps])
        }else{
            setSteps([...propertySteps])
        }
    },[])
    
    // Extract the current step from the path
    const currentStep = steps?.find(step => currentPath.toLowerCase().includes(step.toLowerCase().replace(/\s+/g, '-')))
    
    const currentIndex = steps?.indexOf(currentStep || steps[0]);

    return (
        <div className="w-full flex justify-center bg-[#F6F7F7] py-[48px] px-1">
            <div className="w-full max-w-[1320px]">
                <ul className="hidden md:flex w-full justify-between">
                    {steps.map((step, index) => {
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;
                        const isFuture = index > currentIndex;
                        
                        return (
                            <li className="space-y-4 w-fit" key={step}>
                                <h3 className={`${
                                    isCurrent ? "text-[#070707]" : "text-[#777980]"
                                } text-sm text-center`}>
                                    {step}
                                </h3>
                                <div className="w-[140px] lg:w-[180px] xl:w-[210px] h-[12px] bg-[#D9D9D9] rounded-full relative">
                                    {isCompleted && (
                                        <div className="absolute top-0 left-0 h-full w-full bg-[#D6AE29] rounded-full" />
                                    )}
                                    {isCurrent && (
                                        <div className="absolute top-0 left-0 h-full w-3/4 bg-[#D6AE29] rounded-full" />
                                    )}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}