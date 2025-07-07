'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';


const regions = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    // Add more countries as needed
];
const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    // Add more countries as needed
];

export default function page() {
    const router = useRouter();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [mapSrc, setMapSrc] = useState(
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209179342!2d-73.98784492401708!3d40.74844097138971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1712345678901!5m2!1sen!2sus"
    );
    const header = [
        "Name and location",
        "Property setup",
        "Photos",
        "Pricing",
        "Calendar",
    ]
    const [hostProperty, setHostProperty] = useState(false);
    const [aboutHost, setAboutHost] = useState(false);
    const [hostNeighborhood, setHostNeighborhood] = useState(false)

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log("form ",form)
    }


    // const [hostSuggestion,setHostSuggestion] = useState([{title:"Can I make changes to my host profile later?",body:[""]}])
    return (
        <div className="flex justify-center items-center w-full bg-[#F6F7F7]">
            <div className="py-15 px-4 max-w-[1320px] w-full space-y-[48px]">
                <ul className="flex w-full justify-between">
                    {
                        header.map(item => (
                            <li className="space-y-4 w-fit">
                                <h3 className={`${item === "Name and location" ? "text-[#070707]" : "text-[#777980]"} text-sm text-center`}>{item}</h3>
                                <div className="w-[210px] h-[12px] bg-[#D9D9D9] rounded-full relative">
                                    <div className={`absolute top-0 left-0 h-full w-3/4 bg-[#D6AE29] rounded-full ${item === "Name and location" ? "" : "hidden"}`}></div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="space-y-5">
                    <form className="space-y-5" onSubmit={(e) => handleFormSubmit(e)}>
                        <div className="flex gap-6">
                            <div className="bg-white rounded-[16px] p-6 space-y-5">
                                <div className="space-y-4">
                                    <h3 className="text-[#23262F] text-2xl font-medium">Host profile</h3>
                                    <p className="text-[#777980] text-sm">
                                        Help your listing stand out by telling potential guests a little more about
                                        yourself, your property, and your neighborhood. This info will appear on
                                        your property page.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="space-x-2 flex items-center">
                                        <div className="flex gap-2">
                                            <input type="checkbox" name="property" id="property" className="hidden" onChange={() => setHostProperty(prev => !prev)} />
                                            <label htmlFor="property" className={`select-none w-[24px] h-[24px] ${!hostProperty ? "border" : ""} border-[#D6AE29] rounded-[6px] bg-green-50 flex items-center justify-center`}>
                                                {hostProperty && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                    <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" stroke-width="1.5" />
                                                    <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" stroke-width="1.95" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>}
                                            </label>
                                            <h3 className="text-[#070707]">The property</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <textarea name="propertyIntro" id="propertyIntro" disabled={!hostProperty} placeholder="Enter property intro" className="border border-[#E9E9EA] rounded-[8px] h-[130px] w-full resize-none p-4 text-[#777980] placeholder:text-[#777980] outline-none"></textarea>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <input type="checkbox" name="host" id="host" className="hidden" onChange={() => setAboutHost(prev => !prev)} />
                                    <label htmlFor="host" className={`select-none w-[24px] h-[24px] ${!aboutHost ? "border" : ""} border-[#D6AE29] rounded-[6px] bg-green-50 flex items-center justify-center`}>
                                        {aboutHost && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                            <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" stroke-width="1.5" />
                                            <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" stroke-width="1.95" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>}
                                    </label>
                                    <h3 className="text-[#070707]">The host</h3>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="hostname" className="text-[#070707]">Host name</label>
                                    <input type="text" disabled={!aboutHost} name="hostname" id="hostname" placeholder="Enter host name" className="placeholder:text-[#777980] text-[#777980] p-4 w-full border border-[#E9E9EA] rounded-[8px] outline-none" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="hostabout" className="text-[#070707]">About the host</label>
                                    <textarea disabled={!aboutHost} name="hostabout" id="hostabout" placeholder="Write about the host" className="border border-[#E9E9EA] rounded-[8px] h-[130px] w-full resize-none p-4 text-[#777980] placeholder:text-[#777980] outline-none" />
                                </div>
                                <div className="flex gap-2">
                                    <input type="checkbox" name="neighborhood" id="neighborhood" className="hidden" onChange={() => setHostNeighborhood(prev => !prev)} />
                                    <label htmlFor="neighborhood" className={`select-none w-[24px] h-[24px] ${!hostNeighborhood ? "border" : ""} border-[#D6AE29] rounded-[6px] bg-green-50 flex items-center justify-center`}>
                                        {hostNeighborhood && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                            <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" stroke-width="1.5" />
                                            <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" stroke-width="1.95" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>}
                                    </label>
                                    <h3 className="text-[#070707]">The Neighborhood</h3>
                                </div>
                            </div>
                            <div>
                                <div className="bg-[#FFFBEE] p-4 rounded-[12px] flex gap-[6px] w-fit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                        <path d="M4.06089 9.66731C3.80862 9.10024 3.66797 8.46938 3.66797 7.80458C3.66797 5.33554 5.60807 3.33398 8.0013 3.33398C10.3946 3.33398 12.3346 5.33554 12.3346 7.80458C12.3346 8.46938 12.194 9.10024 11.9417 9.66731" stroke="#070707" stroke-linecap="round" />
                                        <path d="M8 1V1.66667" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14.6667 7.66602H14" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2.00065 7.66602H1.33398" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.7136 2.95312L12.2422 3.42453" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.75852 3.42453L3.28711 2.95312" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.67833 12.5376C10.3519 12.3197 10.6221 11.7032 10.6981 11.0831C10.7207 10.8978 10.5683 10.7441 10.3817 10.7441L5.65156 10.7443C5.4585 10.7443 5.30344 10.9081 5.3265 11.0998C5.40093 11.7187 5.5888 12.1709 6.30263 12.5376M9.67833 12.5376C9.67833 12.5376 6.42014 12.5376 6.30263 12.5376M9.67833 12.5376C9.59733 13.8343 9.22286 14.3478 8.00486 14.3334C6.70206 14.3575 6.40235 13.7227 6.30263 12.5376" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="">
                                                <h3 className="text-[#070707] font-medium text-sm">Can I make changes to my host profile later?</h3>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M10.9742 10.1673C11.1974 10.3905 11.1974 10.7524 10.9742 10.9756C10.863 11.0868 10.7167 11.1431 10.5704 11.1431C10.4242 11.1431 10.2779 11.0875 10.1667 10.9756L5.99952 6.80845L1.83236 10.9756C1.72113 11.0868 1.57487 11.1431 1.4286 11.1431C1.28233 11.1431 1.13606 11.0875 1.02483 10.9756C0.801619 10.7524 0.801619 10.3905 1.02483 10.1673L5.19199 6.0002L1.02483 1.83313C0.801619 1.60992 0.801619 1.24804 1.02483 1.02483C1.24805 0.80162 1.60991 0.80162 1.83313 1.02483L6.00029 5.19194L10.1674 1.02483C10.3906 0.80162 10.7525 0.80162 10.9757 1.02483C11.1989 1.24804 11.1989 1.60992 10.9757 1.83313L6.80857 6.0002L10.9742 10.1673Z" fill="#070707" />
                                            </svg>
                                        </div>
                                        <div className="text-[#4A4C56] text-sm">
                                            <p className="text-nowrap">If you're not ready to add all these details right now, that's okay. You can always</p>
                                            <p className="text-nowrap">change your host profile on the Extranet after completing registration.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-6 w-full">
                            <div className="space-y-5 flex-1">
                                <div className="bg-white rounded-[16px] p-6 space-y-5">
                                    <h3>What’s the name and location of your place?</h3>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-[#070707]">Email address</label>
                                        <input type="email" name="email" id="email" className="border border-[#E9E9EA] text-[#777980] rounded-[8px] p-4 outline-none" />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-[#777980] text-sm">
                                            We may send a letter to confirm the location of your property, so make
                                            sure that the address is correct — it's difficult to make changes to this
                                            later.
                                        </p>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="region" className="text-[#070707]">Country/region</label>
                                            <select
                                                name="region"
                                                id="region"
                                                value={selectedRegion}
                                                onChange={(e) => setSelectedRegion(e.target.value)}
                                                className="border border-[#E9E9EA] rounded-[8px] text-[#777980] p-4 outline-none appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiA5bDYgNiA2LTYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] cursor-pointer"
                                            >
                                                <option value="">Select a region</option>
                                                {regions.map((region) => (
                                                    <option key={region.code} value={region.code}>
                                                        {region.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="street" className="text-[#070707]">Street name and house number</label>
                                        <input type="text" name="street" id="street" className="border border-[#E9E9EA] rounded-[8px] p-4 outline-none text-[#777980]" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="zipcode" className="text-[#070707]">Zip code</label>
                                        <input type="text" name="zipcode" id="zipcode" className="border border-[#E9E9EA] rounded-[8px] p-4 outline-none text-[#777980]" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="city" className="text-[#070707]">City</label>
                                        <input type="text" name="city" id="city" className="border border-[#E9E9EA] rounded-[8px] p-4 outline-none text-[#777980]" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="country" className="text-[#070707]">Country</label>
                                        <select
                                            name="country"
                                            id="country"
                                            value={selectedCountry}
                                            onChange={(e) => setSelectedCountry(e.target.value)}
                                            className="border border-[#E9E9EA] rounded-[8px] p-4 outline-none text-[#777980] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiA5bDYgNiA2LTYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] cursor-pointer"
                                        >
                                            <option value="">Select a country</option>
                                            {countries.map((country) => (
                                                <option key={country.code} value={country.code}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <h3 className="text-[#23262F] font-medium text-2xl">Pin the location of your property</h3>
                                    <div className="space-y-3">
                                        <p className="text-[#777980] text-sm">
                                            This is the location we'll show to guests on our site. Drag the map so
                                            the pin matches the exact location of your place.
                                        </p>
                                        <div className="w-full h-[400px] rounded-[12px]">
                                            <iframe
                                                src={mapSrc}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="w-full h-full rounded-[12px]"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full space-x-3 px-4">
                                    <div className="text-[#0068EF] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#0068EF] rounded-[8px] cursor-pointer" onClick={() => router.back()}>Back</div>
                                    <button type="submit" className="text-[#fff] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] cursor-pointer">Continue</button>
                                </div>
                            </div>
                            <div className="w-[583px] space-y-4">
                                <div className="bg-[#FFFBEE] p-4 rounded-[12px] flex gap-[6px] w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                        <path d="M4.06089 9.66731C3.80862 9.10024 3.66797 8.46938 3.66797 7.80458C3.66797 5.33554 5.60807 3.33398 8.0013 3.33398C10.3946 3.33398 12.3346 5.33554 12.3346 7.80458C12.3346 8.46938 12.194 9.10024 11.9417 9.66731" stroke="#070707" stroke-linecap="round" />
                                        <path d="M8 1V1.66667" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14.6667 7.66602H14" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2.00065 7.66602H1.33398" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.7136 2.95312L12.2422 3.42453" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.75852 3.42453L3.28711 2.95312" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.67833 12.5376C10.3519 12.3197 10.6221 11.7032 10.6981 11.0831C10.7207 10.8978 10.5683 10.7441 10.3817 10.7441L5.65156 10.7443C5.4585 10.7443 5.30344 10.9081 5.3265 11.0998C5.40093 11.7187 5.5888 12.1709 6.30263 12.5376M9.67833 12.5376C9.67833 12.5376 6.42014 12.5376 6.30263 12.5376M9.67833 12.5376C9.59733 13.8343 9.22286 14.3478 8.00486 14.3334C6.70206 14.3575 6.40235 13.7227 6.30263 12.5376" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="space-y-2 w-full">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="">
                                                <h3 className="text-[#070707] font-medium text-sm">What should I consider when choosing a name?</h3>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M10.9742 10.1673C11.1974 10.3905 11.1974 10.7524 10.9742 10.9756C10.863 11.0868 10.7167 11.1431 10.5704 11.1431C10.4242 11.1431 10.2779 11.0875 10.1667 10.9756L5.99952 6.80845L1.83236 10.9756C1.72113 11.0868 1.57487 11.1431 1.4286 11.1431C1.28233 11.1431 1.13606 11.0875 1.02483 10.9756C0.801619 10.7524 0.801619 10.3905 1.02483 10.1673L5.19199 6.0002L1.02483 1.83313C0.801619 1.60992 0.801619 1.24804 1.02483 1.02483C1.24805 0.80162 1.60991 0.80162 1.83313 1.02483L6.00029 5.19194L10.1674 1.02483C10.3906 0.80162 10.7525 0.80162 10.9757 1.02483C11.1989 1.24804 11.1989 1.60992 10.9757 1.83313L6.80857 6.0002L10.9742 10.1673Z" fill="#070707" />
                                            </svg>
                                        </div>
                                        <ul className="text-[#4A4C56] text-sm list-disc pl-5">
                                            <li className="text-nowrap">Keep it short and catchy</li>
                                            <li className="text-nowrap">Avoid abbreviations</li>
                                            <li>Stick to the facts</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-[#FFFBEE] p-4 rounded-[12px] flex gap-[6px] w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                        <path d="M4.06089 9.66731C3.80862 9.10024 3.66797 8.46938 3.66797 7.80458C3.66797 5.33554 5.60807 3.33398 8.0013 3.33398C10.3946 3.33398 12.3346 5.33554 12.3346 7.80458C12.3346 8.46938 12.194 9.10024 11.9417 9.66731" stroke="#070707" stroke-linecap="round" />
                                        <path d="M8 1V1.66667" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14.6667 7.66602H14" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2.00065 7.66602H1.33398" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.7136 2.95312L12.2422 3.42453" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.75852 3.42453L3.28711 2.95312" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.67833 12.5376C10.3519 12.3197 10.6221 11.7032 10.6981 11.0831C10.7207 10.8978 10.5683 10.7441 10.3817 10.7441L5.65156 10.7443C5.4585 10.7443 5.30344 10.9081 5.3265 11.0998C5.40093 11.7187 5.5888 12.1709 6.30263 12.5376M9.67833 12.5376C9.67833 12.5376 6.42014 12.5376 6.30263 12.5376M9.67833 12.5376C9.59733 13.8343 9.22286 14.3478 8.00486 14.3334C6.70206 14.3575 6.40235 13.7227 6.30263 12.5376" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="space-y-2 w-full">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="">
                                                <h3 className="text-[#070707] font-medium text-sm">What needs to be included in my address?</h3>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M10.9742 10.1673C11.1974 10.3905 11.1974 10.7524 10.9742 10.9756C10.863 11.0868 10.7167 11.1431 10.5704 11.1431C10.4242 11.1431 10.2779 11.0875 10.1667 10.9756L5.99952 6.80845L1.83236 10.9756C1.72113 11.0868 1.57487 11.1431 1.4286 11.1431C1.28233 11.1431 1.13606 11.0875 1.02483 10.9756C0.801619 10.7524 0.801619 10.3905 1.02483 10.1673L5.19199 6.0002L1.02483 1.83313C0.801619 1.60992 0.801619 1.24804 1.02483 1.02483C1.24805 0.80162 1.60991 0.80162 1.83313 1.02483L6.00029 5.19194L10.1674 1.02483C10.3906 0.80162 10.7525 0.80162 10.9757 1.02483C11.1989 1.24804 11.1989 1.60992 10.9757 1.83313L6.80857 6.0002L10.9742 10.1673Z" fill="#070707" />
                                            </svg>
                                        </div>
                                        <ul className="text-[#4A4C56] text-sm list-disc pl-5">
                                            <li className="text-nowrap">Enter both your street name and house number</li>
                                            <li className="text-nowrap">Enter an apartment or floor number if you have one</li>
                                            <li>Provide the zip code</li>
                                            <li>Spell the street name correctly</li>
                                            <li>Use the physical address of the property, not your office or home address</li>
                                            <li>What needs to be included in my address?</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-[#FFFBEE] p-4 rounded-[12px] flex gap-[6px] w-fit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                        <path d="M4.06089 9.66731C3.80862 9.10024 3.66797 8.46938 3.66797 7.80458C3.66797 5.33554 5.60807 3.33398 8.0013 3.33398C10.3946 3.33398 12.3346 5.33554 12.3346 7.80458C12.3346 8.46938 12.194 9.10024 11.9417 9.66731" stroke="#070707" stroke-linecap="round" />
                                        <path d="M8 1V1.66667" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14.6667 7.66602H14" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2.00065 7.66602H1.33398" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.7136 2.95312L12.2422 3.42453" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.75852 3.42453L3.28711 2.95312" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.67833 12.5376C10.3519 12.3197 10.6221 11.7032 10.6981 11.0831C10.7207 10.8978 10.5683 10.7441 10.3817 10.7441L5.65156 10.7443C5.4585 10.7443 5.30344 10.9081 5.3265 11.0998C5.40093 11.7187 5.5888 12.1709 6.30263 12.5376M9.67833 12.5376C9.67833 12.5376 6.42014 12.5376 6.30263 12.5376M9.67833 12.5376C9.59733 13.8343 9.22286 14.3478 8.00486 14.3334C6.70206 14.3575 6.40235 13.7227 6.30263 12.5376" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="">
                                                <h3 className="text-[#070707] font-medium text-sm">Why do I need to name
                                                    my property?</h3>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M10.9742 10.1673C11.1974 10.3905 11.1974 10.7524 10.9742 10.9756C10.863 11.0868 10.7167 11.1431 10.5704 11.1431C10.4242 11.1431 10.2779 11.0875 10.1667 10.9756L5.99952 6.80845L1.83236 10.9756C1.72113 11.0868 1.57487 11.1431 1.4286 11.1431C1.28233 11.1431 1.13606 11.0875 1.02483 10.9756C0.801619 10.7524 0.801619 10.3905 1.02483 10.1673L5.19199 6.0002L1.02483 1.83313C0.801619 1.60992 0.801619 1.24804 1.02483 1.02483C1.24805 0.80162 1.60991 0.80162 1.83313 1.02483L6.00029 5.19194L10.1674 1.02483C10.3906 0.80162 10.7525 0.80162 10.9757 1.02483C11.1989 1.24804 11.1989 1.60992 10.9757 1.83313L6.80857 6.0002L10.9742 10.1673Z" fill="#070707" />
                                            </svg>
                                        </div>
                                        <div className="text-[#4A4C56] text-sm">
                                            <p>This is the name that will appear as the title of your listing on our site. It should tell guests something
                                                specific about your place, where it is, or what you offer. This will be
                                                visible to anyone visiting our site, so don't include your address in the name.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}