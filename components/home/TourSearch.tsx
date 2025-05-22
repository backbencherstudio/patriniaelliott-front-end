"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usericon from "@/public/icon/user.svg";
import {
  CalendarIcon,
  MapPin,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HomeAllFilter from "../filter/HomeAllFilter";

const destinations = ["Japan", "London", "Nepal", "China", "India"];

export default function TourSearch({typesearch}:any) {
  const router = useRouter();

  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [locationPopoverOpen, setLocationPopoverOpen] = useState(false);
  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [appliedDateRange, setAppliedDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  type Room = {
    id: number;
    adults: number;
    children: number;
  };

  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, adults: 2, children: 0 },
  ]);

  const handleChange = (
    index: number,
    type: "adults" | "children",
    action: "increment" | "decrement"
  ) => {
    setRooms((prev) =>
      prev.map((room, i) =>
        i === index
          ? {
              ...room,
              [type]:
                action === "increment"
                  ? room[type] + 1
                  : Math.max(room[type] - 1, type === "adults" ? 1 : 0),
            }
          : room
      )
    );
  };
  const addRoom = () => {
    setRooms((prev) => [
      ...prev,
      { id: prev.length + 1, adults: 2, children: 0 },
    ]);
  };
  const totalAdults = rooms.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = rooms.reduce((acc, r) => acc + r.children, 0);

  const handleSearch = () => {
    const query = new URLSearchParams({
      location: selectedLocation || "",
      rooms: rooms.length.toString(),
      adults: totalAdults.toString(),
      children: totalChildren.toString(),
    });

    if (appliedDateRange[0]) {
      query.set("start", appliedDateRange[0].toISOString());
    }
  
    if (appliedDateRange[1]) {
      query.set("end", appliedDateRange[1].toISOString());
    }
  if (typesearch == "hotel") {
    
    router.push(`/hotels?${query.toString()}`);
  }else if (typesearch == "apartment") {
    router.push(`/apartments?${query.toString()}`);
  }else{
    router.push(`/tours?${query.toString()}`);
  }
  };

  return (
    <div className="bg-white rounded-[12px] px-4 py-[14px] lg:flex items-center justify-between space-x-4 shadow-md w-full">

      {/* ✅ Location */}
      <Popover
        open={locationPopoverOpen}
        onOpenChange={(open) => {
          setLocationPopoverOpen(open);
          if (open) setLocationInput("");
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-start justify-start flex-col h-auto px-2"
          >
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              Location
            </div>
            <div className="text-black text-sm font-medium">
              {selectedLocation || "Select Location"}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-2">
          <Input
            placeholder="Type your destination"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
          <ul className="mt-2 max-h-60 overflow-auto">
            {destinations
              .filter((item) =>
                item.toLowerCase().includes(locationInput.toLowerCase())
              )
              .map((loc) => (
                <li
                  key={loc}
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                  onClick={() => {
                    setSelectedLocation(loc);
                    setLocationPopoverOpen(false);
                    setLocationInput("");
                  }}
                >
                  {loc}
                </li>
              ))}
          </ul>
        </PopoverContent>
      </Popover>

      {/* Divider */}
      <div className="w-px hidden lg:block h-10 bg-gray-200" />

      {/* ✅ Date Picker */}
      <div>
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="ghost"
      className="flex items-start justify-start flex-col h-auto px-2"
    >
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <CalendarIcon className="w-4 h-4" />
        Check in – check out
      </div>
      <div className="text-black text-sm font-medium">
        {appliedDateRange[0] && appliedDateRange[1]
          ? `${appliedDateRange[0].toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })} - ${appliedDateRange[1].toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}`
          : "Select date"}
      </div>
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-auto p-4">
    <DatePicker
      selected={dateRange[0]}
      onChange={(dates: [Date, Date]) => {
        setDateRange(dates);
      }}
      startDate={dateRange[0]}
      endDate={dateRange[1]}
      selectsRange
      inline
      monthsShown={2}
    />
    <div className="text-right mt-2">
      <button
        className="bg-secondaryColor  py-2  text-black font-medium px-4  rounded-md cursor-pointer"
        onClick={() => {
          setAppliedDateRange(dateRange);
          setCalendarOpen(false);
        }}
      >
        Apply
      </button>
    </div>
  </PopoverContent>
</Popover>
      </div>

      {/* Divider */}
      <div className="w-px hidden lg:block h-10 bg-gray-200" />

      {/* ✅ Guest */}
      <Popover open={guestPopoverOpen} onOpenChange={setGuestPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="flex flex-col items-start px-2 cursor-pointer">
            <div className="flex items-center gap-3 text-sm">
              <Image
                src={usericon}
                alt="user"
                width={24}
                height={24}
                className="w-5 h-5"
              />
              <div>
                <p className="text-grayColor1 !mb-1.5">Guest</p>
                <p className="text-black text-sm !mb-0 whitespace-nowrap">
                  {`${rooms.length} Room${rooms.length > 1 ? "s" : ""}, ${totalAdults} Adults, ${totalChildren} Children`}
                </p>
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="w-[300px] p-4">
            <h3 className="text-lg font-semibold text-black mb-1">Guests and Rooms</h3>
            <p className="text-sm text-muted-foreground mb-4">Choose your guest and rooms</p>

            {rooms.map((room, index) => (
              <div key={room.id} className="border border-yellow-400 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center text-sm font-semibold mb-3">
                  <p>Room {room.id}</p>
                  <span className="text-gray-700">
                    {room.adults} Adult{room.adults > 1 ? "s" : ""}, {room.children} Child
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm font-medium text-black">Adults</p>
                    <p className="text-xs text-muted-foreground">15+ years</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleChange(index, "adults", "decrement")}
                      className="rounded-full border-gray-300 text-black"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-4 text-center text-sm">{room.adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleChange(index, "adults", "increment")}
                      className="rounded-full border-gray-300 text-black"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-black">Children</p>
                    <p className="text-xs text-muted-foreground">1–9 years</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleChange(index, "children", "decrement")}
                      className="rounded-full border-gray-300 text-black"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-4 text-center text-sm">{room.children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleChange(index, "children", "increment")}
                      className="rounded-full border-gray-300 text-black"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button
              onClick={addRoom}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm rounded-md mb-3"
            >
              <Plus className="mr-2 h-4 w-4" /> Add another Room
            </Button>

           
          </div>
        </PopoverContent>
      </Popover>

      {/* Divider */}
      <div className="w-px hidden lg:block h-10 bg-gray-200" />

      {/* ✅ Filter & Search */}
      <div className="flex gap-3 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-white border rounded-full w-10 h-10"
            >
              <Plus className="text-black" size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto relative left-1/2 -translate-x-1/2   p-4">
            <HomeAllFilter />
          </PopoverContent>
        </Popover>

        <Button
          onClick={handleSearch}
          className="bg-yellow-400 hover:bg-yellow-500 text-black w-10 h-10 p-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
