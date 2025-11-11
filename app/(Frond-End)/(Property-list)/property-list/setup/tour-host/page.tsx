'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import PropertySuggestion from "@/components/reusable/PropertySuggestion";
import { usePropertyContext } from "@/provider/PropertySetupProvider";
import { MyProfileService } from "@/service/user/myprofile.service";
import toast from "react-hot-toast";


export default function Page() {
    const router = useRouter();
    const { listProperty, updateListProperty } = usePropertyContext();
    const [formData, setFormData] = useState({});
    const [user, setUser] = useState(null);
    const [tourInto, setTourIntro] = useState('');
    const [aboutHost, setAboutHost] = useState('');
    const [loading,setLoading] = useState(false);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            propertyintro: HTMLInputElement;
            hostname: HTMLInputElement;
            hostabout: HTMLInputElement;
            email: HTMLInputElement;
        };

        setFormData(prev => ({
            ...prev,
            propertyintro: formElements.propertyintro.value,
            hostname: formElements.hostname.value,
            hostabout: formElements.hostabout.value,
            email: formElements.email.value
        }));

        updateListProperty({
            about_property: formElements.propertyintro.value,
            host_name: formElements.hostname.value,
            about_host: formElements.hostabout.value,
            email: formElements.email.value
        });

        setTimeout(() => {
            setLoading(false);
            router.push("/property-list/setup/tour-setup")
        }, 1000);
    }


    useEffect(() => {
        if (!listProperty?.type) {
            router?.push('/property-list')
        } else {
            setTourIntro(listProperty?.about_property);
            setAboutHost(listProperty?.about_host);
        }
    }, [])


    const getUser = async () => {
        try {
            const res = await MyProfileService.getMe();
            const data = (res as any)?.data ?? res;
            setUser(data?.data ?? data ?? null);
            return res;
        } catch (e: any) {
            toast.error(e?.message || 'Failed to load profile');
            throw e;
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleHost = ({ name, email }: { name?: string; email?: string }) => {
        if (name) {
            setUser(prev => ({ ...prev, name: name }))
        }
        if (email) {
            setUser(prev => ({ ...prev, email: email }))
        }
    }


    return (
        <div className="flex justify-center items-center w-full bg-[#F6F7F7]">
            <div className="pb-15 px-4 max-w-[1320px] w-full space-y-[48px]">
                <div className="space-y-5">
                    <form className="space-y-5" onSubmit={(e) => handleFormSubmit(e)}>
                        <div className="flex w-full gap-6">
                            <div className="bg-white rounded-[16px] p-6 space-y-5 flex-1">
                                <div className="space-y-4">
                                    <h3 className="text-[#23262F] text-2xl font-medium">Host profile</h3>
                                    <p className="text-[#777980] text-sm">
                                        Help your listing stand out by telling potential guests a little more about
                                        yourself, your tour. This info will appear on
                                        your tour page.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="space-x-2 flex items-center">
                                        <div className="flex gap-2">
                                            <h3 className="text-[#070707]">The tour</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <textarea name="propertyintro" required id="propertyintro" placeholder="Enter tour introduction" className="border border-[#E9E9EA] rounded-[8px] h-[130px] w-full resize-none p-4 text-[#777980] placeholder:text-[#777980] outline-none" value={tourInto} onChange={(e) => setTourIntro(e.target.value)}></textarea>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="hostname" className="text-[#070707]">Host name</label>
                                    <input type="text" onChange={(e) => handleHost({name:e.target.value})} value={user?.name} required name="hostname" id="hostname" placeholder="Enter host name" className="placeholder:text-[#777980] text-[#777980] p-4 w-full border border-[#E9E9EA] rounded-[8px] outline-none" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-[#070707]">Host email</label>
                                    <input type="email" onChange={(e) => handleHost({email:e.target.value})} value={user?.email} required name="email" id="email" placeholder="Enter host email" className="placeholder:text-[#777980] text-[#777980] p-4 w-full border border-[#E9E9EA] rounded-[8px] outline-none" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="hostabout" className="text-[#070707]">About the host</label>
                                    <textarea name="hostabout" id="hostabout" placeholder="Write about the host" className="border border-[#E9E9EA] rounded-[8px] h-[130px] w-full resize-none p-4 text-[#777980] placeholder:text-[#777980] outline-none" value={aboutHost} onChange={(e) => setAboutHost(e.target?.value)} />
                                </div>
                            </div>

                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block">
                                <PropertySuggestion title="Can I make changes to my host profile later?" body="If you're not ready to add all these details right now, that's okay. You can always change your host profile on the Extranet after completing registration." isList={false} />
                            </div>
                        </div>
                        {/* Submit Buttons */}
                        <div className="flex justify-between w-full space-x-3 px-4">
                            <div className="text-[#0068EF] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#0068EF] rounded-[8px] cursor-pointer" onClick={() => router.back()}>Back</div>
                            <button type="submit" disabled={loading} className={`text-[#fff] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] ${loading?"cursor-progress opacity-50":"cursor-pointer"}`}>{loading?"Continuing...":"Continue"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
