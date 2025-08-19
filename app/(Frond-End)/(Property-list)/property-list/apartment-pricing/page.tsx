"use client"
import { useCallback, useState } from "react"
import { useRouter } from 'next/navigation';
import PropertySuggestion from "@/components/reusable/PropertySuggestion";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
const header = [
    "Name and location",
    "Property setup",
    "Photos",
    "Pricing",
    "Calendar",
]


export default function page() {
    const router = useRouter()
    const [priceRange, setPriceRange] = useState({
        minprice: 109.86,
        maxprice: 186.33
    })
    const [guestBooking, setGuestBooking] = useState("instantly")
    const [priceFeedback, setPriceFeedback] = useState(true);
    const commition = 15
    const [guestPrice, setGuestPrice] = useState(0);
    const [guestCheckIn, setGuestCheckIn] = useState("as_soon_as_possible");
    const [reservation30, setReservation30] = useState("yes");
    const [isSuggestionOpen, setIsSuggestionOpen] = useState(true);
    const [refundSuggestionOpen, setRefundSuggestionOpen] = useState(true);
    const [formData, setFormData] = useState({})
    const [isCancelEdit, setIsCancelEdit] = useState(true);
    const [isRefundEdit, setIsRefundEdit] = useState(true);
    const [isOccupancyEdit, setIsOccupancyEdit] = useState(true);
    const [occupancy, setOccupancy] = useState([['3', '150']]);
    const [cancelPolicies, setCancelPolicies] = useState(["Guests can cancel their bookings for free up to 1 day before their arrival", "Guests who cancel within 24 hours will have their cancellation fee waived"])
    const [refundPolicies, setRefundPolicies] = useState(["Guests will pay 10% less than the standard rate for a non- refundable rate", "Guests can't cancel their bookings for free anytime"])


    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e);
        setFormData({
            guest_booking: guestBooking,
            price_per_night: guestPrice,
            guest_checkin: guestCheckIn,
            reservation30: reservation30,
        })
        router.push("/property-list/apartment-calendar")
    }

    const handleCancelPolicyChange = (value: string, index: number) => {
        setCancelPolicies(prev => {
            const newPolicies = [...prev];
            newPolicies[index] = value;
            return newPolicies;
        });
    }

    const addNewCancelPolicy = () => {
        setCancelPolicies(prev => [...prev, ""])
    }

    const deleteCancelPolicy = (id: number) => {
        setCancelPolicies(prev => prev.filter((_, index) => index !== id));

    }
    const handleRefundPolicyChange = (value: string, index: number) => {
        setRefundPolicies(prev => {
            const newPolicies = [...prev];
            newPolicies[index] = value;
            return newPolicies;
        });
    }

    const addNewRefundPolicy = () => {
        setRefundPolicies(prev => [...prev, ""])
    }

    const deleteRefundPolicy = (id: number) => {
        setRefundPolicies(prev => prev.filter((_, index) => index !== id));
    }
    const handleOccupancyChange = (value: string, index: number) => {
        setOccupancy(prev => {
            const newPolicies = [...prev];
            newPolicies[index] = [value, prev[index][1]];
            return newPolicies;
        });
    }
    const handleOccupancyPriceChange = (value: string, index: number) => {
        setOccupancy(prev => {
            const newPolicies = [...prev];
            newPolicies[index] = [prev[index][0], value];
            return newPolicies;
        });
    }

    const addNewOccupancy = () => {
        setOccupancy(prev => [...prev, ['0', '0']])
    }

    const deleteOccupancy = (id: number) => {
        setOccupancy(prev => prev.filter((_, index) => index !== id));
    }

    return (
        <div className="flex justify-center items-center w-full bg-[#F6F7F7]">
            <div className="py-15 px-4 max-w-[1320px] w-full space-y-[48px]">
                <ul className="hidden md:flex w-full justify-between">
                    {
                        header.map(item => (
                            <li className="space-y-4 w-fit" key={item}>
                                <h3 className={`${item === "Pricing" ? "text-[#070707]" : "text-[#777980]"} text-sm text-center`}>{item}</h3>
                                <div className="w-[140px] lg:w-[180px] xl:w-[210px] h-[12px] bg-[#D9D9D9] rounded-full relative">
                                    <div className={`absolute top-0 left-0 h-full w-3/4 bg-[#D6AE29] rounded-full ${item === "Pricing" ? "" : "hidden"}`}></div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="w-full">
                    <form onSubmit={(e) => handleFormSubmit(e)} className="space-y-5">
                        <div className="flex gap-6">
                            <div className="flex-1 space-y-5">
                                <div className="bg-white rounded-lg p-6 space-y-5">
                                    <h3>How can guests book your apartment?</h3>
                                    <div className="text-[#070707]">
                                        <RadioGroup defaultValue={guestBooking} onValueChange={(e) => setGuestBooking(e)}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="instantly" id="instantly" />
                                                <Label htmlFor="instantly" className="text-sm font-normal">All guests can book instantly <span className="bg-[#38c9761a] p-[6px] rounded-[8px] text-[#067647] text-[12px]">Recommended</span></Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="request" id="request" />
                                                <Label htmlFor="request" className="text-sm font-normal">All guests will need to request to book</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>


                                {/* Suggeting price section */}


                                <div className="bg-white rounded-lg p-6 space-y-[18px]">
                                    <div className="space-y-5">
                                        <h3 className="text-[#23262F] text-2xl font-medium">Price per night</h3>
                                        <div className="space-y-3">
                                            <p className="text-[#070707]">Make your price competitive to increase your chances of getting more bookings.</p>
                                            <div className="text-[#4A4C56] text-sm">
                                                <span>This is the price range for properties similar to yours. </span>
                                                <a href="#" className="text-[#0068EF] font-medium">Learn more</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <div className="text-[#777980] text-[12px]">
                                                <div className="flex flex-col items-center drop-shadow-sm">
                                                    <div className="shadow-xl w-fit p-[14px] rounded-lg bg-white">
                                                        Median: ${((priceRange["maxprice"] + priceRange["minprice"]) / 2).toFixed(2)}
                                                    </div>
                                                    <svg className="-translate-y-[2px]" xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                                                        <path d="M21.6051 0.934711L0.60837 1.3062L9.37181 13.658C10.5537 15.3239 12.8267 15.242 13.8987 13.4949L21.6051 0.934711Z" fill="white" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-full h-[6px] bg-[#E9E9EA] flex items-center justify-center rounded-full">
                                                <div className="h-[6px] w-[60%] bg-[#D6AE29] rounded-full"></div>
                                            </div>
                                            <div className="flex w-full text-[#777980] text-[12px]">
                                                <div className="flex-1">
                                                    <div className="flex flex-col items-center drop-shadow-sm -translate-x-[10%]">
                                                        <svg className="translate-y-[2px]" xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                                                            <path d="M21.6051 14.0692L0.60837 13.6977L9.37181 1.3459C10.5537 -0.31999 12.8267 -0.238075 13.8987 1.50904L21.6051 14.0692Z" fill="white" />
                                                        </svg>
                                                        <div className="shadow-xl w-fit p-[14px] rounded-lg bg-white">
                                                            ${priceRange["minprice"]}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col items-center drop-shadow-sm translate-x-[10%]">
                                                        <svg className="translate-y-[2px]" xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                                                            <path d="M21.6051 14.0692L0.60837 13.6977L9.37181 1.3459C10.5537 -0.31999 12.8267 -0.238075 13.8987 1.50904L21.6051 14.0692Z" fill="white" />
                                                        </svg>
                                                        <div className="shadow-xl w-fit p-[14px] rounded-lg bg-white">
                                                            ${priceRange["maxprice"]}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px] items-center">
                                            <span className="text-[#4A4C56] text-sm">Did this help you decide on a price?</span>
                                            <div className="flex gap-2 items-center">
                                                <div className={`cursor-pointer ${priceFeedback ? "text-[#0068EF]" : "text-white"}`} onClick={() => setPriceFeedback(true)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="currentColor">
                                                        <path d="M1.66406 10.9206C1.66406 10.0001 2.41025 9.25391 3.33073 9.25391C4.71144 9.25391 5.83073 10.3732 5.83073 11.7539V15.0872C5.83073 16.468 4.71144 17.5872 3.33073 17.5872C2.41025 17.5872 1.66406 16.8411 1.66406 15.9206V10.9206Z" stroke="#777980" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M12.9015 7.00847L12.6796 7.72521C12.4978 8.31251 12.4069 8.60616 12.4768 8.83809C12.5334 9.02567 12.6575 9.18742 12.8268 9.29384C13.0359 9.42534 13.3524 9.42534 13.9852 9.42534H14.3219C16.4636 9.42534 17.5344 9.42534 18.0403 10.0593C18.098 10.1318 18.1494 10.2088 18.1939 10.2897C18.583 10.9967 18.1407 11.9492 17.2559 13.8542C16.444 15.6023 16.038 16.4764 15.2843 16.9909C15.2114 17.0407 15.1364 17.0877 15.0595 17.1317C14.2659 17.5866 13.2828 17.5866 11.3163 17.5866H10.8898C8.50735 17.5866 7.31617 17.5866 6.57605 16.8695C5.83594 16.1523 5.83594 14.9982 5.83594 12.6898V11.8785C5.83594 10.6654 5.83594 10.0589 6.05122 9.50376C6.2665 8.94859 6.67873 8.49212 7.50318 7.57919L10.9127 3.80372C10.9982 3.70904 11.0409 3.66169 11.0787 3.62888C11.4305 3.32266 11.9736 3.35712 12.2813 3.70521C12.3143 3.74251 12.3503 3.79485 12.4223 3.89954C12.5349 4.0633 12.5913 4.14518 12.6404 4.2263C13.0799 4.95253 13.2129 5.81522 13.0116 6.63421C12.9891 6.72569 12.9599 6.82001 12.9015 7.00847Z" stroke="#777980" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className={`cursor-pointer ${priceFeedback ? "text-[#fff]" : "text-[#0068EF]"}`} onClick={() => setPriceFeedback(false)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="currentColor">
                                                        <path d="M1.66406 10.0866C1.66406 11.0071 2.41025 11.7533 3.33073 11.7533C4.71144 11.7533 5.83073 10.634 5.83073 9.25325V5.91992C5.83073 4.53921 4.71144 3.41992 3.33073 3.41992C2.41025 3.41992 1.66406 4.16611 1.66406 5.08659V10.0866Z" stroke="#777980" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M12.9015 13.998L12.6796 13.2813C12.4978 12.694 12.4069 12.4003 12.4768 12.1684C12.5334 11.9808 12.6575 11.8191 12.8268 11.7127C13.0359 11.5812 13.3524 11.5812 13.9852 11.5812H14.3219C16.4636 11.5812 17.5344 11.5812 18.0403 10.9472C18.098 10.8748 18.1494 10.7977 18.1939 10.7168C18.583 10.0098 18.1407 9.05734 17.2559 7.15234C16.444 5.40418 16.038 4.53011 15.2843 4.01563C15.2114 3.96582 15.1364 3.91884 15.0595 3.87481C14.2659 3.41992 13.2828 3.41992 11.3163 3.41992H10.8898C8.50735 3.41992 7.31617 3.41992 6.57605 4.13703C5.83594 4.85414 5.83594 6.00831 5.83594 8.31665V9.12801C5.83594 10.3411 5.83594 10.9476 6.05122 11.5028C6.2665 12.0579 6.67873 12.5144 7.50318 13.4273L10.9127 17.2028C10.9982 17.2975 11.0409 17.3448 11.0787 17.3777C11.4305 17.6838 11.9736 17.6494 12.2813 17.3013C12.3143 17.264 12.3503 17.2117 12.4223 17.107C12.5349 16.9433 12.5913 16.8613 12.6404 16.7802C13.0799 16.054 13.2129 15.1913 13.0116 14.3723C12.9891 14.2808 12.9599 14.1865 12.9015 13.998Z" stroke="#777980" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Price section */}


                                <div className="p-6 rounded-lg bg-white space-y-5 text-[#23262F]">
                                    <h3 className="text-2xl font-medium">How much do you want to charge per night?</h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h2 className="text-[#070707] font-medium">Price guests pay</h2>
                                            <div className="border border-[#0068EF] flex gap-1 p-4 rounded-lg items-center text-[#777980] text-sm">
                                                $<input type="number" id="price" name="price" value={guestPrice} onChange={(e) => setGuestPrice(parseInt(e.currentTarget.value))} className="outline-none flex-1" />
                                            </div>
                                            <p className="text-[#4A4C56] text-sm">Including taxes, commission, and fees</p>
                                        </div>
                                        <div className="space-y-5">
                                            <h2 className="text-[#4A4C56] font-medium text-sm">{commition}% Booking.com commission</h2>
                                            <div className="space-y-2 border-b border-[#77798059] pb-3">
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M4.16406 12.0859C4.16406 12.0859 5.41406 12.0859 7.08073 15.0026C7.08073 15.0026 11.7131 7.36371 15.8307 5.83594" stroke="#299C46" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <h2 className="text-[#4A4C56] text-sm">24/7 help in your language</h2>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M4.16406 12.0859C4.16406 12.0859 5.41406 12.0859 7.08073 15.0026C7.08073 15.0026 11.7131 7.36371 15.8307 5.83594" stroke="#299C46" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <h2 className="text-[#4A4C56] text-sm">We promote your place on Google</h2>
                                                </div>
                                            </div>
                                            <h3 className="text-[#4A4C56] text-sm font-medium">{guestPrice - (guestPrice * (commition / 100))}$ Your earning ( included taxes)</h3>
                                        </div>
                                    </div>
                                </div>


                                {/* Rate plans */}


                                <div className="p-6 rounded-lg bg-white space-y-5 text-[#23262F] flex-1">
                                    <h3 className="text-2xl font-medium">Rate plans</h3>
                                    <p className="text-[#777980] text-sm">To attract a wider range of guests, we suggest setting up multiple rate
                                        plans. The recommended prices and policies for each plan are based on
                                        data from properties like yours, but they can be edited now or after you
                                        complete registration.</p>
                                </div>
                            </div>
                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:flex flex-col gap-4">
                                <PropertySuggestion
                                    title="What if my house rules change?"
                                    body="You can easily customize these
                                                                house rules later, and you can set additional house rules on the
                                                                Policies page of the Extranet after completing registration."
                                    isList={false} />
                                {isSuggestionOpen && <div className="bg-[#FFFBEE] p-4 rounded-[12px] flex gap-[6px] w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8.0026 14.6673C11.6845 14.6673 14.6693 11.6825 14.6693 8.00065C14.6693 4.31875 11.6845 1.33398 8.0026 1.33398C4.32071 1.33398 1.33594 4.31875 1.33594 8.00065C1.33594 11.6825 4.32071 14.6673 8.0026 14.6673Z" stroke="#FE5050" />
                                        <path d="M7.99219 10H7.99819" stroke="#FE5050" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8 8.00065V5.33398" stroke="#FE5050" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="space-y-2 w-full">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="">
                                                <h3 className="text-[#FE5050] font-medium text-sm">Are you sure you want to require your guests to request to book?</h3>
                                            </div>
                                        </div>
                                        <p className="text-[#777980] text-sm">
                                            Properties that require "request to book" have fewer confirmed
                                            bookings and a longer time until their first booking. They also require
                                            more operational workload since you need to respond to each request.
                                        </p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" onClick={() => setIsSuggestionOpen(prev => !prev)} className="cursor-pointer">
                                        <path d="M10.9742 10.1673C11.1974 10.3905 11.1974 10.7524 10.9742 10.9756C10.863 11.0868 10.7167 11.1431 10.5704 11.1431C10.4242 11.1431 10.2779 11.0875 10.1667 10.9756L5.99952 6.80845L1.83236 10.9756C1.72113 11.0868 1.57487 11.1431 1.4286 11.1431C1.28233 11.1431 1.13606 11.0875 1.02483 10.9756C0.801619 10.7524 0.801619 10.3905 1.02483 10.1673L5.19199 6.0002L1.02483 1.83313C0.801619 1.60992 0.801619 1.24804 1.02483 1.02483C1.24805 0.80162 1.60991 0.80162 1.83313 1.02483L6.00029 5.19194L10.1674 1.02483C10.3906 0.80162 10.7525 0.80162 10.9757 1.02483C11.1989 1.24804 11.1989 1.60992 10.9757 1.83313L6.80857 6.0002L10.9742 10.1673Z" fill="#070707" />
                                    </svg>
                                </div>}
                                <PropertySuggestion
                                    title="What if I'm not sure about my price?"
                                    body="Don't worry, you can always
                                                change it later. You can even set
                                                weekend, midweek, and seasonal
                                                prices, giving you more control
                                                over what you earn."
                                    isList={false} />
                            </div>
                        </div>


                        {/* Standard rate plan */}


                        <div className="flex gap-6">
                            <div className="space-y-5 flex-1">
                                <h3 className="text-2xl font-medium">Standard rate plan</h3>
                                <div className="p-6 rounded-lg bg-white space-y-6 text-[#23262F]">
                                    <div className="space-y-5">
                                        <div className="flex justify-between">
                                            <h2 className="flex items-center gap-1 w-fit">
                                                <span>Cancellation policy</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M8.0026 14.6693C11.6845 14.6693 14.6693 11.6845 14.6693 8.0026C14.6693 4.32071 11.6845 1.33594 8.0026 1.33594C4.32071 1.33594 1.33594 4.32071 1.33594 8.0026C1.33594 11.6845 4.32071 14.6693 8.0026 14.6693Z" stroke="#FE5050" />
                                                    <path d="M7.99219 10.0039H7.99819" stroke="#FE5050" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M8 8.0026V5.33594" stroke="#FE5050" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </h2>
                                            <div className="flex gap-2 items-center border border-[#0068EF] rounded p-[6px] w-fit cursor-pointer" onClick={() => setIsCancelEdit(prev => !prev)}>
                                                {!isCancelEdit ? <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M5 17.0039H17M12.1896 6.54505C12.1896 6.54505 12.1896 7.6348 13.2794 8.72455C14.3691 9.8143 15.4589 9.8143 15.4589 9.8143M7.87975 14.996L10.1682 14.669C10.4983 14.6219 10.8042 14.4689 11.04 14.2331L16.5486 8.72455C17.1505 8.12269 17.1505 7.1469 16.5486 6.54505L15.4589 5.4553C14.857 4.85344 13.8812 4.85344 13.2794 5.4553L7.77078 10.9639C7.53499 11.1997 7.38203 11.5056 7.33488 11.8357L7.00795 14.1242C6.9353 14.6327 7.3712 15.0686 7.87975 14.996Z" stroke="#0068EF" stroke-linecap="round" />
                                                    </svg>
                                                    <span className="text-[#0068EF] text-sm">Edit</span>
                                                </> :
                                                    <span className="text-[#0068EF] text-sm">Save</span>}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-[#299C46] text-sm">You're 91% more likely to get bookings with the pre-selected cancellation policy
                                                settings than with a 30-day cancellation policy</p>
                                            <div className="space-y-2">
                                                {
                                                    cancelPolicies.map((policy, index) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                            {!isCancelEdit && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path d="M4.16406 12.0859C4.16406 12.0859 5.41406 12.0859 7.08073 15.0026C7.08073 15.0026 11.7131 7.36371 15.8307 5.83594" stroke="#299C46" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>}
                                                            {isCancelEdit ? <div className="flex gap-1 items-center w-full">
                                                                <input type="text" className="text-[#4A4C56] text-sm w-full break-words border p-1 outline-none rounded-[4px]" value={policy} onChange={(e) => handleCancelPolicyChange(e.target.value, index)} />
                                                                <svg className="cursor-pointer w-[10px]" xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none" onClick={() => deleteCancelPolicy(index)}>
                                                                    <path d="M10.9723 10.6673C11.1955 10.8905 11.1955 11.2524 10.9723 11.4756C10.861 11.5868 10.7148 11.6431 10.5685 11.6431C10.4222 11.6431 10.2759 11.5875 10.1647 11.4756L5.99756 7.30845L1.83041 11.4756C1.71918 11.5868 1.57291 11.6431 1.42664 11.6431C1.28037 11.6431 1.1341 11.5875 1.02288 11.4756C0.799665 11.2524 0.799665 10.8905 1.02288 10.6673L5.19004 6.5002L1.02288 2.33313C0.799665 2.10992 0.799665 1.74804 1.02288 1.52483C1.24609 1.30162 1.60796 1.30162 1.83117 1.52483L5.99833 5.69194L10.1655 1.52483C10.3887 1.30162 10.7506 1.30162 10.9738 1.52483C11.197 1.74804 11.197 2.10992 10.9738 2.33313L6.80662 6.5002L10.9723 10.6673Z" fill="#070707" />
                                                                </svg>
                                                            </div> :
                                                                <p className="text-[#4A4C56] text-sm">{policy}</p>}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            {isCancelEdit && <div onClick={addNewCancelPolicy} className="flex gap-2 items-center border border-[#0068EF] text-[#0068EF] rounded p-[6px] w-fit cursor-pointer">+ Add Policy</div>}
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div className="flex justify-between">
                                            <h2 className="flex items-center gap-1 w-fit">
                                                <span>Price per group size</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M8.0026 14.6693C11.6845 14.6693 14.6693 11.6845 14.6693 8.0026C14.6693 4.32071 11.6845 1.33594 8.0026 1.33594C4.32071 1.33594 1.33594 4.32071 1.33594 8.0026C1.33594 11.6845 4.32071 14.6693 8.0026 14.6693Z" stroke="#FE5050" />
                                                    <path d="M7.99219 10.0039H7.99819" stroke="#FE5050" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M8 8.0026V5.33594" stroke="#FE5050" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </h2>
                                            <div className="flex gap-2 items-center border border-[#0068EF] rounded p-[6px] w-fit cursor-pointer" onClick={() => setIsOccupancyEdit(prev => !prev)}>
                                                {!isOccupancyEdit ? <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M5 17.0039H17M12.1896 6.54505C12.1896 6.54505 12.1896 7.6348 13.2794 8.72455C14.3691 9.8143 15.4589 9.8143 15.4589 9.8143M7.87975 14.996L10.1682 14.669C10.4983 14.6219 10.8042 14.4689 11.04 14.2331L16.5486 8.72455C17.1505 8.12269 17.1505 7.1469 16.5486 6.54505L15.4589 5.4553C14.857 4.85344 13.8812 4.85344 13.2794 5.4553L7.77078 10.9639C7.53499 11.1997 7.38203 11.5056 7.33488 11.8357L7.00795 14.1242C6.9353 14.6327 7.3712 15.0686 7.87975 14.996Z" stroke="#0068EF" stroke-linecap="round" />
                                                    </svg>
                                                    <span className="text-[#0068EF] text-sm">Edit</span>
                                                </> :
                                                    <span className="text-[#0068EF] text-sm">Save</span>}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-sm text-[#299C46]">You're more likely to get bookings if you set lower prices for smaller groups
                                                of guests</h2>
                                            <div className="flex justify-between max-w-[375px] w-full">
                                                <div className="space-y-5">
                                                    <h2 className="text-[#23262F] text-[18px] font-medium">Occupancy</h2>
                                                    <ul className="space-y-4 text-[#4A4C56] text-[18px] font-medium">
                                                        {
                                                            occupancy.map((item, index) => (
                                                                <li key={item[0]} className="flex items-center gap-1">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                        <path d="M4.93318 11.6151C3.8721 12.2469 1.09002 13.537 2.7845 15.1514C3.61223 15.9399 4.53412 16.5039 5.69315 16.5039H12.3068C13.4659 16.5039 14.3878 15.9399 15.2155 15.1514C16.91 13.537 14.1279 12.2469 13.0668 11.6151C10.5786 10.1335 7.42139 10.1335 4.93318 11.6151Z" stroke="#4A4C56" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M12.375 4.87891C12.375 6.74287 10.864 8.25391 9 8.25391C7.13604 8.25391 5.625 6.74287 5.625 4.87891C5.625 3.01495 7.13604 1.50391 9 1.50391C10.864 1.50391 12.375 3.01495 12.375 4.87891Z" stroke="#4A4C56" />
                                                                    </svg>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                                        <path d="M11.25 4.25391L7.5 8.00391M7.5 8.00391L3.75 11.7539M7.5 8.00391L11.25 11.7539M7.5 8.00391L3.75 4.25391" stroke="#777980" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                    {!isOccupancyEdit ? <span>{item[0]}</span>
                                                                        :
                                                                        <input type="text" value={item[0] ? item[0] : ""} onChange={(e) => handleOccupancyChange(e.target.value, index)} className="border w-[50px] py-1 rounded-lg px-[4px]" />}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                                <div className="space-y-5">
                                                    <h2 className="text-[#23262F] text-[18px] font-medium">Guests pay</h2>
                                                    <ul className="space-y-4 text-[#4A4C56] text-[18px] font-medium">
                                                        {occupancy.map((item, index) => (
                                                            <li key={item[1]} className="flex items-center gap-1">
                                                                {!isOccupancyEdit ? (
                                                                    `$${item[1]}`
                                                                ) : (
                                                                    <>
                                                                        <input
                                                                            type="text"
                                                                            value={item[1] || ""}
                                                                            onChange={(e) => handleOccupancyPriceChange(e.target.value, index)}
                                                                            className="border w-[100px] py-1 rounded-lg px-[4px]"
                                                                        />
                                                                        <svg
                                                                            className="cursor-pointer w-[10px]"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="12"
                                                                            height="13"
                                                                            viewBox="0 0 12 13"
                                                                            fill="none"
                                                                            onClick={() => deleteOccupancy(index)}
                                                                        >
                                                                            <path
                                                                                d="M10.9723 10.6673C11.1955 10.8905 11.1955 11.2524 10.9723 11.4756C10.861 11.5868 10.7148 11.6431 10.5685 11.6431C10.4222 11.6431 10.2759 11.5875 10.1647 11.4756L5.99756 7.30845L1.83041 11.4756C1.71918 11.5868 1.57291 11.6431 1.42664 11.6431C1.28037 11.6431 1.1341 11.5875 1.02288 11.4756C0.799665 11.2524 0.799665 10.8905 1.02288 10.6673L5.19004 6.5002L1.02288 2.33313C0.799665 2.10992 0.799665 1.74804 1.02288 1.52483C1.24609 1.30162 1.60796 1.30162 1.83117 1.52483L5.99833 5.69194L10.1655 1.52483C10.3887 1.30162 10.7506 1.30162 10.9738 1.52483C11.197 1.74804 11.197 2.10992 10.9738 2.33313L6.80662 6.5002L10.9723 10.6673Z"
                                                                                fill="#070707"
                                                                            />
                                                                        </svg>
                                                                    </>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            {isOccupancyEdit && <div onClick={addNewOccupancy} className="flex gap-2 items-center border border-[#0068EF] text-[#0068EF] rounded p-[6px] w-fit cursor-pointer">+ Add Occupancy</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block"></div>
                        </div>


                        {/* Non-refundable rate plan */}



                        <div className="space-y-5">
                            <h3 className="text-2xl font-medium">Non-refundable rate plan</h3>
                            <div className="flex gap-6">
                                <div className="space-y-6 flex-1">
                                    <div className="space-y-4">
                                        <div className="p-6 rounded-lg bg-white space-y-6 text-[#23262F]">
                                            <div className="flex justify-between">
                                                <h2 className="flex items-center gap-1 w-fit">
                                                    <span>Price and cancellation policy</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M8.0026 14.6693C11.6845 14.6693 14.6693 11.6845 14.6693 8.0026C14.6693 4.32071 11.6845 1.33594 8.0026 1.33594C4.32071 1.33594 1.33594 4.32071 1.33594 8.0026C1.33594 11.6845 4.32071 14.6693 8.0026 14.6693Z" stroke="#FE5050" />
                                                        <path d="M7.99219 10.0039H7.99819" stroke="#FE5050" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M8 8.0026V5.33594" stroke="#FE5050" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </h2>
                                                <div className="flex gap-2 items-center border border-[#0068EF] rounded p-[6px] w-fit cursor-pointer" onClick={() => setIsRefundEdit(prev => !prev)}>
                                                    {!isRefundEdit ? <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                            <path d="M5 17.0039H17M12.1896 6.54505C12.1896 6.54505 12.1896 7.6348 13.2794 8.72455C14.3691 9.8143 15.4589 9.8143 15.4589 9.8143M7.87975 14.996L10.1682 14.669C10.4983 14.6219 10.8042 14.4689 11.04 14.2331L16.5486 8.72455C17.1505 8.12269 17.1505 7.1469 16.5486 6.54505L15.4589 5.4553C14.857 4.85344 13.8812 4.85344 13.2794 5.4553L7.77078 10.9639C7.53499 11.1997 7.38203 11.5056 7.33488 11.8357L7.00795 14.1242C6.9353 14.6327 7.3712 15.0686 7.87975 14.996Z" stroke="#0068EF" stroke-linecap="round" />
                                                        </svg>
                                                        <span className="text-[#0068EF] text-sm">Edit</span>
                                                    </> :
                                                        <span className="text-[#0068EF] text-sm">Save</span>}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {
                                                    refundPolicies.map((policy, index) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                            {!isRefundEdit && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path d="M4.16406 12.0859C4.16406 12.0859 5.41406 12.0859 7.08073 15.0026C7.08073 15.0026 11.7131 7.36371 15.8307 5.83594" stroke="#299C46" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>}
                                                            {isRefundEdit ? <div className="flex gap-1 items-center w-full">
                                                                <input type="text" className="text-[#4A4C56] text-sm w-full break-words border p-1 outline-none rounded-[4px]" value={policy} onChange={(e) => handleRefundPolicyChange(e.target.value, index)} />
                                                                <svg className="cursor-pointer w-[10px]" xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none" onClick={() => deleteRefundPolicy(index)}>
                                                                    <path d="M10.9723 10.6673C11.1955 10.8905 11.1955 11.2524 10.9723 11.4756C10.861 11.5868 10.7148 11.6431 10.5685 11.6431C10.4222 11.6431 10.2759 11.5875 10.1647 11.4756L5.99756 7.30845L1.83041 11.4756C1.71918 11.5868 1.57291 11.6431 1.42664 11.6431C1.28037 11.6431 1.1341 11.5875 1.02288 11.4756C0.799665 11.2524 0.799665 10.8905 1.02288 10.6673L5.19004 6.5002L1.02288 2.33313C0.799665 2.10992 0.799665 1.74804 1.02288 1.52483C1.24609 1.30162 1.60796 1.30162 1.83117 1.52483L5.99833 5.69194L10.1655 1.52483C10.3887 1.30162 10.7506 1.30162 10.9738 1.52483C11.197 1.74804 11.197 2.10992 10.9738 2.33313L6.80662 6.5002L10.9723 10.6673Z" fill="#070707" />
                                                                </svg>
                                                            </div> :
                                                                <p className="text-[#4A4C56] text-sm">{policy}</p>}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            {isRefundEdit && <div onClick={addNewRefundPolicy} className="flex gap-2 items-center border border-[#0068EF] text-[#0068EF] rounded p-[6px] w-fit cursor-pointer">+ Add Policy</div>}
                                        </div>
                                        <div className="p-6 rounded-lg bg-white space-y-6 text-[#23262F]">
                                            <h2>What's the first date when guests can check in?</h2>
                                            <div className="text-[#070707]">
                                                <RadioGroup defaultValue={guestCheckIn} onValueChange={(e) => setGuestCheckIn(e)} className="flex gap-5">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="as_soon_as_possible" id="as_soon_as_possible" />
                                                        <Label htmlFor="as_soon_as_possible" className="text-sm font-normal">As soon as possible</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="specific_date" id="specific_date" />
                                                        <Label htmlFor="specific_date" className="text-sm font-normal">On a specific date</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-lg bg-white space-y-5 text-[#23262F]">
                                            <div className="space-y-4">
                                                <h2 className="text-2xl font-medium">Do you want to allow 30+ night stays?</h2>
                                                <p className="text-[#777980] text-sm">Allowing guests to stay for up to 90 nights can help you fill your calendar and tap into the trend of guests
                                                    working remotely.</p>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-[#4A4C56] text-xl font-medium">Will you accept reservations for stays over 30 nights?</h3>
                                                <div className="text-[#070707]">
                                                    <RadioGroup defaultValue={reservation30} onValueChange={(e) => setReservation30(e)} className="flex gap-5">
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="yes" id="yes" />
                                                            <Label htmlFor="yes" className="text-sm font-normal">Yes</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="no" id="no" />
                                                            <Label htmlFor="no" className="text-sm font-normal">No</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full space-x-3 px-4">
                                        <div className="text-[#0068EF] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#0068EF] rounded-[8px] cursor-pointer" onClick={() => router.back()}>Back</div>
                                        <button type="submit" className="text-[#fff] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] cursor-pointer">Continue</button>
                                    </div>
                                </div>
                                <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block">
                                    {refundSuggestionOpen && <div className="bg-[#FFFBEE] p-4 rounded-[12px] flex gap-[6px] w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                            <path d="M4.05698 9.66536C3.80471 9.09829 3.66406 8.46742 3.66406 7.80262C3.66406 5.33358 5.60416 3.33203 7.9974 3.33203C10.3907 3.33203 12.3307 5.33358 12.3307 7.80262C12.3307 8.46742 12.1901 9.09829 11.9378 9.66536" stroke="#070707" stroke-linecap="round" />
                                            <path d="M8 1V1.66667" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M14.6667 7.66797H14" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M1.9987 7.66797H1.33203" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.7136 2.95312L12.2422 3.42453" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M3.75656 3.42453L3.28516 2.95312" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.67442 12.5357C10.348 12.3178 10.6182 11.7013 10.6942 11.0811C10.7168 10.8959 10.5644 10.7422 10.3778 10.7422L5.64766 10.7423C5.45459 10.7423 5.29954 10.9062 5.32259 11.0979C5.39702 11.7168 5.58489 12.1689 6.29872 12.5357M9.67442 12.5357C9.67442 12.5357 6.41623 12.5357 6.29872 12.5357M9.67442 12.5357C9.59342 13.8323 9.21896 14.3459 8.00096 14.3315C6.69816 14.3555 6.39844 13.7208 6.29872 12.5357" stroke="#070707" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div className="space-y-2 w-full">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="">
                                                    <h3 className="text-[#070707] font-medium text-sm">What if I want to change my selection later on?</h3>
                                                </div>
                                            </div>
                                            <p className="text-[#4A4C56] text-sm">
                                                Your selection here isn't final. You
                                                can always change it by heading to
                                                the Policies section after you've
                                                registered.
                                            </p>
                                            <div>
                                                <a href="#" className="text-[#0068EF] text-sm font-medium">Read more about 30+ night stays</a>
                                            </div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" onClick={() => setRefundSuggestionOpen(prev => !prev)} className="cursor-pointer">
                                            <path d="M10.9742 10.1673C11.1974 10.3905 11.1974 10.7524 10.9742 10.9756C10.863 11.0868 10.7167 11.1431 10.5704 11.1431C10.4242 11.1431 10.2779 11.0875 10.1667 10.9756L5.99952 6.80845L1.83236 10.9756C1.72113 11.0868 1.57487 11.1431 1.4286 11.1431C1.28233 11.1431 1.13606 11.0875 1.02483 10.9756C0.801619 10.7524 0.801619 10.3905 1.02483 10.1673L5.19199 6.0002L1.02483 1.83313C0.801619 1.60992 0.801619 1.24804 1.02483 1.02483C1.24805 0.80162 1.60991 0.80162 1.83313 1.02483L6.00029 5.19194L10.1674 1.02483C10.3906 0.80162 10.7525 0.80162 10.9757 1.02483C11.1989 1.24804 11.1989 1.60992 10.9757 1.83313L6.80857 6.0002L10.9742 10.1673Z" fill="#070707" />
                                        </svg>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}