"use client"

import { useCallback, useState, useEffect, use } from "react"
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePropertyContext } from "../../layout";
import toast,{Toaster} from 'react-hot-toast'



export default function page() {
    const router = useRouter()
    const { listProperty, updateListProperty } = usePropertyContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [nextCurrentDate, setNextCurrentDate] = useState(() => {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return nextMonth;
    });
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [daysInNextMonth, setDaysInNextMonth] = useState([])
    const [startDay, setStartDay] = useState(0);
    const [nextMonthStartDay, setNextMonthStartDay] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [licenses, setLicenses] = useState(false);
    const [termsPolicy, setTermsPolicy] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [isBookingOpen, setIsBookingOpen] = useState(true)
    const [status, setStatus] = useState("Not available for booking");


    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = new Date(year, month, 1);
        const days = [];

        const nextMonthYear = nextCurrentDate.getFullYear();
        const nextMonth = nextCurrentDate.getMonth();
        const nextDate = new Date(nextMonthYear, nextMonth, 1);
        const nextMonthDays = [];

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        while (nextDate.getMonth() === nextMonth) {
            nextMonthDays.push(new Date(nextDate));
            nextDate.setDate(nextDate.getDate() + 1);
        }

        setDaysInMonth(days);
        setDaysInNextMonth(nextMonthDays);
        const startDay = new Date(year, month, 1).getDay();
        const nextMonthStartDay = new Date(nextMonthYear, nextMonth, 1).getDay();
        setStartDay(startDay);
        setNextMonthStartDay(nextMonthStartDay);

    }, [currentDate])

    const daysNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const handlePrevMonth = () => {
        if (currentDate.getMonth() !== new Date().getMonth() || currentDate.getFullYear() != new Date().getFullYear()) {
            setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
            setNextCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
        }
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
        setNextCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
    }



    const handleSubmit = () => {
        toast.success("Property setup completed.")
        console.clear();
        console.log("Submitted data : ",JSON.parse(localStorage.getItem("propertyData")))
        localStorage.removeItem("propertyData");
    }

    function getSameDateNextMonth(inputDate: Date): Date {
        const date = new Date(inputDate);

        // Get current month and year
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();

        // Calculate next month (handles December -> January)
        const nextMonth = (currentMonth + 1) % 12;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

        // Get the day, adjusting for months with fewer days
        const day = date.getDate();
        const lastDayOfNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
        const adjustedDay = Math.min(day, lastDayOfNextMonth);

        return new Date(nextYear, nextMonth, adjustedDay);
    }


    return (
        <div className="flex justify-center items-center bg-[#F6F7F7] w-full overflow-hidden">
            <div className="py-15 px-4 max-w-[1320px] w-full space-y-[48px]">
                <Toaster />
                {/* Calendar start  */}


                <div className="flex flex-col-reverse md:flex-row gap-6 items-center md:items-start">
                    <div className="flex-1 space-y-[32px]">
                        <div className={`flex bg-[#F6F7F7] rounded-lg`}>
                            <div className="flex-1 lg:flex flex-col justify-between">
                                <div className="w-full bg-white rounded-tl-lg rounded-tr-lg">
                                    <div className="flex items-center justify-between gap-6 text-sm w-[270px] p-4 bg-white">
                                        <button onClick={handlePrevMonth} className="text-[#292D32] border border-[#F1F2F4] w-[32px] h-[32px] flex items-center justify-center p-[10px] cursor-pointer rounded-[8px]">
                                            <FaChevronLeft />
                                        </button>
                                        <div className="text-[#00201F] text-sm font-medium">
                                            {currentDate.toLocaleDateString('default', { month: 'long' })}{' '}
                                            {currentDate.getFullYear()}
                                        </div>

                                        <button onClick={handleNextMonth} className="text-[#292D32] border border-[#F1F2F4] w-[32px] h-[32px] flex items-center justify-center p-[10px] cursor-pointer rounded-[8px]">
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap border border-[#F1F2F4]">
                                    {
                                        daysNames.map(day => (
                                            <div key={day} className="w-[14.28%] h-[40px] sm:h-[52px] bg-[#FAFAFA] border border-[#F1F2F4] text-center text-[8px] lg:text-[12px] text-[#1E1E1E] font-semibold flex items-center justify-center">
                                                <span>{day}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex flex-wrap">
                                    {
                                        Array.from({ length: startDay }).map((_, index) => (
                                            <div key={index} className="w-[14.28%] aspect-square bg-white text-center"></div>
                                        ))
                                    }
                                    {daysInMonth.map((day, index) => (
                                        <div key={day}
                                            className={`w-[14.28%] aspect-square px-4 py-2 text-center ${index === 0 ? "border-l" : ""} ${index >= 23 ? "border-b" : ""} border-r border-t border-[#DCE4E8] bg-white text-[10px] lg:text-sm text-[#1E1E1E] flex flex-col justify-between select-none relative`}
                                        // onClick={() => handleDateClick(day)}
                                        >
                                            {day.getDate() >= new Date().getDate() && <> <span className={`w-full flex items-center justify-end rounded-full text-[#1E1E1E]`}
                                            >{day.getDate()}</span>
                                                <div className="text-[12px] w-full text-start flex flex-col">
                                                    <span className="text-[#A4A4A4] font-medium truncate">Available</span>
                                                    <div className="text-[#4A4C56] text-[10px] lg:text-sm font-medium flex items-center gap-[2px]">${150}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                            <path d="M11.0703 5.25003C11.0703 5.25003 8.49262 8.75 7.57031 8.75C6.64795 8.75 4.07031 5.25 4.07031 5.25" stroke="#141B34" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </>
                                            }
                                            {
                                                day.getDate() < new Date().getDate() && day.getMonth() === new Date().getMonth() && day.getFullYear() === new Date().getFullYear() && <>
                                                    <div className={`w-full flex justify-end rounded-full text-[#1E1E1E]`}>
                                                        {day.getDate()}
                                                    </div>
                                                    <div
                                                        className={`h-[25px] sm:h-[33px] w-full bg-[#FE5050] absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center text-white font-medium text-[10px] lg:text-sm ${day.getDate() === new Date().getDate() - 1 && day.getMonth() === new Date().getMonth() && day.getFullYear() === new Date().getFullYear() ? "rounded-r-full" : ""} ${index === 0 ? "rounded-l-full" : ""}`}
                                                    >
                                                        {index === 0 || day.getDate() === new Date().getDate() - 1 && day.getMonth() === new Date().getMonth() && day.getFullYear() === new Date().getFullYear() ? "Closed" : ""}
                                                    </div>
                                                </>
                                            }
                                            {
                                                day.getDate() < new Date().getDate() && (day.getMonth() != new Date().getMonth() || day.getFullYear() > new Date().getFullYear()) && <><div className={`w-full flex justify-end rounded-full`}>{day.getDate()}</div>
                                                    <div className="text-[10px] lg:text-[12px] w-full text-start flex flex-col">
                                                        <span className="text-[#A4A4A4] font-medium truncate">Available</span>
                                                        <div className="text-[#4A4C56] text-[10px] lg:text-sm font-medium">${150}
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                                <path d="M11.0703 5.25003C11.0703 5.25003 8.49262 8.75 7.57031 8.75C6.64795 8.75 4.07031 5.25 4.07031 5.25" stroke="#141B34" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>





                        <div className="space-y-6 max-w-2xl bg-white rounded-lg p-6">
                            <h3 className="text-[#23262F] text-2xl font-medium">That's it! You've done everything you need to before your
                                first guest stays.</h3>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <div className="w-[24px]">
                                        <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M18.3307 9.9974C18.3307 5.39502 14.5997 1.66406 9.9974 1.66406C5.39502 1.66406 1.66406 5.39502 1.66406 9.9974C1.66406 14.5997 5.39502 18.3307 9.9974 18.3307C14.5997 18.3307 18.3307 14.5997 18.3307 9.9974Z" stroke="#777980" stroke-width="1.5" />
                                            <path d="M10.2005 14.1641V9.9974C10.2005 9.60456 10.2005 9.40815 10.0784 9.28606C9.95644 9.16406 9.76002 9.16406 9.36719 9.16406" stroke="#777980" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.99219 6.66406H9.99969" stroke="#777980" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-[#23262F] text-[18px] font-medium">Can I decide when I get bookings?</h2>
                                        <p className="text-[#777980] text-sm">Yes. The best way to do so is by keeping your calendar up to
                                            date. Close any dates you don't want bookings. If you have
                                            bookings on other sites, close those dates, too.</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-[24px]">
                                        <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M18.3307 9.9974C18.3307 5.39502 14.5997 1.66406 9.9974 1.66406C5.39502 1.66406 1.66406 5.39502 1.66406 9.9974C1.66406 14.5997 5.39502 18.3307 9.9974 18.3307C14.5997 18.3307 18.3307 14.5997 18.3307 9.9974Z" stroke="#777980" stroke-width="1.5" />
                                            <path d="M10.2005 14.1641V9.9974C10.2005 9.60456 10.2005 9.40815 10.0784 9.28606C9.95644 9.16406 9.76002 9.16406 9.36719 9.16406" stroke="#777980" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.99219 6.66406H9.99969" stroke="#777980" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-[#23262F] text-[18px] font-medium">Are bookings confirmed right away?</h2>
                                        <p className="text-[#777980] text-sm">No, you have to accept the booking before it's confirmed.</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <svg className="mt-1 w-[24px]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M18.3307 9.9974C18.3307 5.39502 14.5997 1.66406 9.9974 1.66406C5.39502 1.66406 1.66406 5.39502 1.66406 9.9974C1.66406 14.5997 5.39502 18.3307 9.9974 18.3307C14.5997 18.3307 18.3307 14.5997 18.3307 9.9974Z" stroke="#777980" stroke-width="1.5" />
                                        <path d="M10.2005 14.1641V9.9974C10.2005 9.60456 10.2005 9.40815 10.0784 9.28606C9.95644 9.16406 9.76002 9.16406 9.36719 9.16406" stroke="#777980" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.99219 6.66406H9.99969" stroke="#777980" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="space-y-3">
                                        <h2 className="text-[#23262F] text-[18px] font-medium">Can I choose which booking requests I accept or decline?</h2>
                                        <p className="text-[#777980] text-sm">Yes, you can choose whether you accept or decline any Of the
                                            booking requests you receive.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <div className="flex mt-1">
                                        <input type="checkbox" name="licenses" id="licenses" className="hidden" onChange={() => setLicenses(prev => !prev)} />
                                        <label htmlFor="licenses" className={`select-none w-[24px] h-[24px] ${!licenses ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {licenses && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                    </div>
                                    <p className="text-[#070707]">I certify that this is a legitimate accommodation business With all
                                        necessary licenses and permits, which can be shown upon first
                                        request. Booking.com B.V. reserves the right to verify and
                                        investigate any details provided in this registration.</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex mt-1">
                                        <input type="checkbox" name="termsPolicy" id="termsPolicy" className="hidden" onChange={() => setTermsPolicy(prev => !prev)} />
                                        <label htmlFor="termsPolicy" className={`select-none w-[24px] h-[24px] ${!termsPolicy ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {termsPolicy && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                    </div>
                                    <div>
                                        <h3 className="text-[#070707]">I have read, accepted, and agreed to the <a href="#" className="text-[#0068EF] ">General Delivery
                                            Terms.</a></h3>
                                        <p className="text-[#777980]">
                                            Payments by Booking.com uses Stripe as its payment provider. By signing up
                                            for this service, you accept the <a href="#" className="text-[#0068EF]">Stripe Services Agreement</a> and <a href="#" className="text-[#0068EF]">Stripe Privacy
                                                Policy</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between w-full space-x-3 px-4">
                            <div className="text-[#0068EF] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#0068EF] rounded-[8px] cursor-pointer" onClick={() => router.back()}>Back</div>
                            <button disabled={(!licenses && !termsPolicy)} className="text-[#fff] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] cursor-pointer" onClick={handleSubmit}>Continue</button>
                        </div>
                    </div>



                    <div className="w-full md:w-[312px] space-y-4">
                        <div className="space-y-5 p-5 bg-white rounded-lg">
                            <h3 className="text-[#23262F] text-xl font-medium">1 Date Selected</h3>
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex flex-col space-y-3">
                                        <label htmlFor="startDate" className="text-[#070707] font-normal">Start Date</label>
                                        <div className="w-full flex gap-1 border px-[20px] py-[15px] rounded-lg text-[#777980] text-sm">
                                            <input type="date" onChange={(e) => setStartDate(new Date(e.target.value))} name="startDate" id="startDate" className="w-[20px] cursor-pointer" />
                                            <div className="flex-1">{new Date(startDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: '2-digit',
                                                year: 'numeric'
                                            })}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-3">
                                        <label htmlFor="endDate" className="text-[#070707]">End Date</label>
                                        <div className="w-full flex gap-1 border px-[20px] py-[15px] rounded-lg text-[#777980] text-sm">
                                            <input type="date" onChange={(e) => setEndDate(new Date(e.target.value))} name="endDate" id="endDate" className="w-[20px] cursor-pointer" />
                                            <div className="flex-1">{new Date(endDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: '2-digit',
                                                year: 'numeric'
                                            })}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M10.5 5.25003C10.5 5.25003 7.92231 8.75 7 8.75C6.07763 8.75 3.5 5.25 3.5 5.25" stroke="#4A4C56" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <h3 className="text-[#4A4C56] text-sm cursor-pointer">Advanced date selection</h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg space-y-4">
                            <div className="space-y-3">
                                <div>
                                    <h3>Open or close for bookings</h3>
                                    <div className="text-[#070707] p-4 border-b border-[#77798059]">
                                        <RadioGroup defaultValue={isBookingOpen ? "Open" : "Close"} onValueChange={() => setIsBookingOpen(prev => !prev)} className="flex gap-5 items-center">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Open" id="Open" />
                                                <Label htmlFor="Open" className="text-sm font-normal">Open</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Close" id="Close" />
                                                <Label htmlFor="Close" className="text-sm font-normal">Close</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-3">
                                    <h3 className="text-base font-medium text-[#070707]">Set availability</h3>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="flex items-center gap-1 p-0 text-sm font-normal hover:opacity-80 outline-none text-[#777980] justify-between">
                                                {status}
                                                <ChevronDown className="" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full py-3">
                                            <DropdownMenuItem onClick={() => setStatus("Available for booking")}>
                                                Available for booking
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setStatus("Not available for booking")}>
                                                Not available for booking
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-[#23262F] text-xl font-medium">Rates</h3>
                                    <h2 className="text-[#777980]">Standard Rate</h2>
                                </div>
                                {/* <div className="text-[#070707] text-sm">
                                    <RadioGroup defaultValue={isBookingOpen ? "Open" : "Close"} onValueChange={() => setIsBookingOpen(prev => !prev)} className="flex gap-5 items-center">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Open" id="Open" />
                                            <Label htmlFor="Open" className="text-sm font-normal">Open</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Close" id="Close" />
                                            <Label htmlFor="Close" className="text-sm font-normal">Close</Label>
                                        </div>
                                    </RadioGroup>
                                </div> */}
                                <div className="flex items-center text-[#777980] border border-[#D2D2D5] p-4 rounded-lg ">
                                    <span>US$</span>
                                    <div>
                                        <input type="number" name="rate" id="rate" className="outline-none px-2 py-1 text-sm w-[190px]" />
                                    </div>
                                    <div className="flex items-center w-[25px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M3.28879 7.74081C2.5814 8.16201 0.726682 9.02206 1.85633 10.0983C2.40816 10.624 3.02275 11 3.79544 11H8.20455C8.97725 11 9.59185 10.624 10.1437 10.0983C11.2733 9.02206 9.4186 8.16201 8.7112 7.74081C7.0524 6.75306 4.9476 6.75306 3.28879 7.74081Z" stroke="#0068EF" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.25 3.25C8.25 4.49264 7.24265 5.5 6 5.5C4.75736 5.5 3.75 4.49264 3.75 3.25C3.75 2.00736 4.75736 1 6 1C7.24265 1 8.25 2.00736 8.25 3.25Z" stroke="#0068EF" />
                                        </svg>
                                        <span className="text-[12px] text-[#777980]">3</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-[#23262F] text-xl font-medium">Non-refundable Rate</h3>
                                </div>
                                {/* <div className="text-[#070707] text-sm">
                                    <RadioGroup defaultValue={isBookingOpen ? "Open" : "Close"} onValueChange={() => setIsBookingOpen(prev => !prev)} className="flex gap-5 items-center">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Open" id="Open" />
                                            <Label htmlFor="Open" className="text-sm font-normal">Open</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Close" id="Close" />
                                            <Label htmlFor="Close" className="text-sm font-normal">Close</Label>
                                        </div>
                                    </RadioGroup>
                                </div> */}
                                <div className="flex items-center text-[#777980] border border-[#D2D2D5] p-4 rounded-lg ">
                                    <span>US$</span>
                                    <div>
                                        <input type="number" name="rate" id="rate" className="outline-none px-2 py-1 text-sm w-[190px]" />
                                    </div>
                                    <div className="flex items-center w-[25px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M3.28879 7.74081C2.5814 8.16201 0.726682 9.02206 1.85633 10.0983C2.40816 10.624 3.02275 11 3.79544 11H8.20455C8.97725 11 9.59185 10.624 10.1437 10.0983C11.2733 9.02206 9.4186 8.16201 8.7112 7.74081C7.0524 6.75306 4.9476 6.75306 3.28879 7.74081Z" stroke="#0068EF" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.25 3.25C8.25 4.49264 7.24265 5.5 6 5.5C4.75736 5.5 3.75 4.49264 3.75 3.25C3.75 2.00736 4.75736 1 6 1C7.24265 1 8.25 2.00736 8.25 3.25Z" stroke="#0068EF" />
                                        </svg>
                                        <span className="text-[12px] text-[#777980]">3</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[#0068EF] font-medium py-3">Restrictions</h3>
                                <p className="text-[#4A4C56]">Changes will be made to the following
                                    date: <span>{getSameDateNextMonth(startDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}</span></p>
                            </div>
                            <div className="flex justify-between w-full space-x-3">
                                <div className="text-[#0068EF] border border-[#0068EF] px-[32px] flex items-center justify-center rounded-[8px] cursor-pointer leading-none">Cancel</div>
                                <div className="text-[#fff] px-[32px] py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] cursor-pointer leading-none" onClick={handleSubmit}>Save</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}