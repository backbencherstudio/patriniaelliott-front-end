'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import Dropdownmenu from "@/components/reusable/Dropdownmenu";
import PropertySuggestion from "@/components/reusable/PropertySuggestion";
import { usePropertyContext } from "@/provider/PropertySetupProvider";
import country from '@/public/toure/countries.json'


const regions = [
  { code: 'AF', name: 'Africa' },
  { code: 'AS', name: 'Asia' },
  { code: 'EU', name: 'Europe' },
  { code: 'NA', name: 'North America' },
  { code: 'SA', name: 'South America' },
  { code: 'OC', name: 'Oceania' },
  { code: 'AN', name: 'Antarctica' }
];


export default function page() {
    const router = useRouter();
    const [countries,setCountries] = useState(country)
    const { listProperty, updateListProperty } = usePropertyContext();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [mapSrc, setMapSrc] = useState(
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209179342!2d-73.98784492401708!3d40.74844097138971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1712345678901!5m2!1sen!2sus"
    );

    const [hostProperty, setHostProperty] = useState(false);
    const [aboutHost, setAboutHost] = useState(false);
    const [hostNeighborhood, setHostNeighborhood] = useState(false)
    const [formData, setFormData] = useState({});

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            propertyintro: HTMLInputElement;
            hostname: HTMLInputElement;
            hostabout: HTMLInputElement;
            email: HTMLInputElement;
            region: HTMLInputElement;
            street: HTMLInputElement;
            zipcode: HTMLInputElement;
            city: HTMLInputElement;
            country: HTMLInputElement;
        };

        setFormData(prev => ({
            ...prev,
            propertyintro: formElements.propertyintro.value,
            hostname: formElements.hostname.value,
            hostabout: formElements.hostabout.value,
            email: formElements.email.value,
            region: selectedRegion,
            street: formElements.street.value,
            zipcode: formElements.zipcode.value,
            city: formElements.city.value,
            country: selectedCountry
        }));

        updateListProperty({
            about_property: formElements.propertyintro.value,
            host_name: formElements.hostname.value,
            about_host: formElements.hostabout.value,
            email: formElements.email.value,
            region: selectedRegion,
            street: formElements.street.value,
            zip_code: formElements.zipcode.value,
            city: formElements.city.value,
            country: selectedCountry
        })

        const updatedProperty = {
            ...JSON.parse(localStorage.getItem("propertyData")),
            about_property: formElements.propertyintro.value,
            host_name: formElements.hostname.value,
            about_host: formElements.hostabout.value,
            email: formElements.email.value,
            region: selectedRegion,
            street: formElements.street.value,
            zip_code: formElements.zipcode.value,
            city: formElements.city.value,
            country: selectedCountry
        };
        localStorage.setItem("propertyData", JSON.stringify(updatedProperty));

        router.push("/property-list/setup/property-setup")
    }

    const handleRegionChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelectedRegion(e.currentTarget.value);
    }

    const handleCountryChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelectedCountry(e.currentTarget.value);
    }


    // const [hostSuggestion,setHostSuggestion] = useState([{title:"Can I make changes to my host profile later?",body:[""]}])
    return (
        <div className="flex justify-center items-center w-full bg-[#F6F7F7]">
            <div className="py-15 px-4 max-w-[1320px] w-full space-y-[48px]">
                <div className="space-y-5">
                    <form className="space-y-5" onSubmit={(e) => handleFormSubmit(e)}>
                        <div className="flex w-full gap-6">
                            <div className="bg-white rounded-[16px] p-6 space-y-5 flex-1">
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
                                                    <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                    <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>}
                                            </label>
                                            <h3 className="text-[#070707]">The property</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <textarea name="propertyintro" required id="propertyintro" disabled={!hostProperty} placeholder="Enter property intro" className="border border-[#E9E9EA] rounded-[8px] h-[130px] w-full resize-none p-4 text-[#777980] placeholder:text-[#777980] outline-none"></textarea>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <input type="checkbox" name="host" id="host" className="hidden" onChange={() => setAboutHost(prev => !prev)} />
                                    <label htmlFor="host" className={`select-none w-[24px] h-[24px] ${!aboutHost ? "border" : ""} border-[#D6AE29] rounded-[6px] bg-green-50 flex items-center justify-center`}>
                                        {aboutHost && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                            <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                            <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>}
                                    </label>
                                    <h3 className="text-[#070707]">The host</h3>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="hostname" className="text-[#070707]">Host name</label>
                                    <input type="text" required disabled={!aboutHost} name="hostname" id="hostname" placeholder="Enter host name" className="placeholder:text-[#777980] text-[#777980] p-4 w-full border border-[#E9E9EA] rounded-[8px] outline-none" />
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
                                            <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                            <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>}
                                    </label>
                                    <h3 className="text-[#070707]">The Neighborhood</h3>
                                </div>
                            </div>
                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block">
                                <PropertySuggestion title="Can I make changes to my host profile later?" body="If you're not ready to add all these details right now, that's okay. You can always change your host profile on the Extranet after completing registration." isList={false} />
                            </div>
                        </div>
                        <div className="flex w-full gap-6">
                            <div className="space-y-5 flex-1">
                                <div className="bg-white rounded-[16px] p-6 space-y-5">
                                    <h3>What’s the name and location of your place?</h3>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-[#070707]">Email address</label>
                                        <input type="email" required name="email" id="email" className="border border-[#E9E9EA] text-[#777980] rounded-[8px] p-4 outline-none" />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-[#777980] text-sm">
                                            We may send a letter to confirm the location of your property, so make
                                            sure that the address is correct — it's difficult to make changes to this
                                            later.
                                        </p>
                                        <Dropdownmenu data={regions} handleSelect={(e: React.FormEvent<HTMLFormElement>) => handleRegionChange(e)} selectedData={selectedRegion} title="Country/Region" showTitle={true} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="street" className="text-[#070707]">Street name and house number</label>
                                        <input type="text" required name="street" id="street" className="border border-[#E9E9EA] rounded-[8px] p-4 outline-none text-[#777980]" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="zipcode" className="text-[#070707]">Zip code</label>
                                        <input type="text" required name="zipcode" id="zipcode" className="border border-[#E9E9EA] rounded-[8px] p-4 outline-none text-[#777980]" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="city" className="text-[#070707]">City</label>
                                        <input type="text" required name="city" id="city" className="border border-[#E9E9EA] rounded-[8px] p-4 outline-none text-[#777980]" />
                                    </div>
                                    <Dropdownmenu data={countries} selectedData={selectedCountry} handleSelect={handleCountryChange} title="Country" showTitle={true} />
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
                            <div className="space-y-4 w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block">
                                <PropertySuggestion
                                    title="What should I consider when choosing a name?"
                                    body={[
                                        "Keep it short and catchy",
                                        "Avoid abbreviations",
                                        "Stick to the facts"
                                    ]}
                                    isList={true} />
                                <PropertySuggestion
                                    title="What needs to be included in my address?"
                                    body={[
                                        "Enter both your street name and house number",
                                        "Enter an apartment or floor number if you have one",
                                        "Provide the zip code",
                                        "Spell the street name correctly",
                                        "Use the physical address of the property, not your office or home address",
                                        "What needs to be included in my address?"]}
                                    isList={true} />
                                <PropertySuggestion
                                    title="Why do I need to name my property?"
                                    body="This is the name that will appear as the title of your listing on our site. It should tell guests something specific about your place, where it is, or what you offer. This will be
                                                visible to anyone visiting our site, so don't include your address in the name."
                                    isList={false} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}