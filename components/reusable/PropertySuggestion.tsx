'use client'

import { useState } from "react"

export default function PropertySuggestion({ title, body, isList }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <>
            {isOpen && <div className="bg-[#FFFBEE] p-4 rounded-[12px] flex gap-[6px] w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                    <path d="M4.06089 9.66731C3.80862 9.10024 3.66797 8.46938 3.66797 7.80458C3.66797 5.33554 5.60807 3.33398 8.0013 3.33398C10.3946 3.33398 12.3346 5.33554 12.3346 7.80458C12.3346 8.46938 12.194 9.10024 11.9417 9.66731" stroke="#070707" strokeLinecap="round" />
                    <path d="M8 1V1.66667" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.6667 7.66602H14" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.00065 7.66602H1.33398" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.7136 2.95312L12.2422 3.42453" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.75852 3.42453L3.28711 2.95312" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.67833 12.5376C10.3519 12.3197 10.6221 11.7032 10.6981 11.0831C10.7207 10.8978 10.5683 10.7441 10.3817 10.7441L5.65156 10.7443C5.4585 10.7443 5.30344 10.9081 5.3265 11.0998C5.40093 11.7187 5.5888 12.1709 6.30263 12.5376M9.67833 12.5376C9.67833 12.5376 6.42014 12.5376 6.30263 12.5376M9.67833 12.5376C9.59733 13.8343 9.22286 14.3478 8.00486 14.3334C6.70206 14.3575 6.40235 13.7227 6.30263 12.5376" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="">
                            <h3 className="text-[#070707] font-medium text-sm">{title}</h3>
                        </div>
                    </div>
                    {isList ?
                        <ul className="text-[#4A4C56] text-sm list-disc pl-5">
                            {body.map((item: typeof body) => <li key={item} className="">{item}</li>)}
                        </ul>
                        :
                        <div className="text-[#4A4C56] text-sm">
                            <p className="">{body}</p>
                        </div>}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" onClick={() => setIsOpen(prev => !prev)} className="cursor-pointer">
                    <path d="M10.9742 10.1673C11.1974 10.3905 11.1974 10.7524 10.9742 10.9756C10.863 11.0868 10.7167 11.1431 10.5704 11.1431C10.4242 11.1431 10.2779 11.0875 10.1667 10.9756L5.99952 6.80845L1.83236 10.9756C1.72113 11.0868 1.57487 11.1431 1.4286 11.1431C1.28233 11.1431 1.13606 11.0875 1.02483 10.9756C0.801619 10.7524 0.801619 10.3905 1.02483 10.1673L5.19199 6.0002L1.02483 1.83313C0.801619 1.60992 0.801619 1.24804 1.02483 1.02483C1.24805 0.80162 1.60991 0.80162 1.83313 1.02483L6.00029 5.19194L10.1674 1.02483C10.3906 0.80162 10.7525 0.80162 10.9757 1.02483C11.1989 1.24804 11.1989 1.60992 10.9757 1.83313L6.80857 6.0002L10.9742 10.1673Z" fill="#070707" />
                </svg>
            </div>}
        </>
    )
}