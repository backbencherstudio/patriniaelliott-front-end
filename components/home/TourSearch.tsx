"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToken } from "@/hooks/useToken";
import usericon from "@/public/icon/user.svg";
import { UserService } from "@/service/user/user.service";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HomeAllFilter from "../filter/HomeAllFilter";
import { countryList } from "@/DemoAPI/country";

export default function TourSearch({ typesearch }: any) {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [locationPopoverOpen, setLocationPopoverOpen] = useState(false);
  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [appliedDateRange, setAppliedDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [monthsToShow, setMonthsToShow] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
   const [loading, setLoading]=useState(true);
       const [error, setError]=useState(null);
      const {token} = useToken()
      const [selectedDestinations, setSelectedDestinations] = useState(  );
       
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    if (openFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter]);

  useEffect(() => {
    const handleResize = () => {
      setMonthsToShow(window.innerWidth >= 640 ? 2 : 1);
    };

    handleResize(); // initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  type Room = {
    id: number;
    people: number;
  };

  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, people: 2 },
  ]);

  const handleChange = (
    index: number,
    type: "people",
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
                  : Math.max(room[type] - 1, type === "people" ? 1 : 0),
            }
          : room
      )
    );
  };
  const addRoom = () => {
    setRooms((prev) => [
      ...prev,
      { id: prev.length + 1, people: 2 },
    ]);
  };
  const totalPeople = rooms.reduce((acc, r) => acc + r.people, 0);

  const handleSearch = () => {
    const query = new URLSearchParams({
      destinations: selectedLocation || "",
      rooms: rooms.length.toString(),
      people: totalPeople.toString(),
    });

    if (appliedDateRange[0]) {
      query.set("duration_start", appliedDateRange[0].toISOString());
    }

    if (appliedDateRange[1]) {
      query.set("duration_end", appliedDateRange[1].toISOString());
    }
    if (typesearch == "hotel") {
      router.push(`/hotels?${query.toString()}`);
    } else if (typesearch == "apartment") {
      router.push(`/apartments?${query.toString()}`);
    } else {
      router.push(`/tours?${query.toString()}`);
    }
  };


  return (
    <div className="bg-white relative rounded-[12px] px-4 py-[14px] flex items-center flex-col lg:flex-row  justify-center lg:justify-between  shadow-md !w-full">
      {/* ✅ Location */}
      <div className=" lg:border-0 border-b border-blackColor/20 w-full flex justify-center">
        <Popover
          open={locationPopoverOpen}
          onOpenChange={(open) => {
            setLocationPopoverOpen(open);
            if (open) setLocationInput("");
          }}
        >
          <PopoverTrigger asChild>
            <Button
              aria-label="Location"
              variant="ghost"
              className="flex hover:bg-transparent cursor-pointer items-center justify-start  lg:border-r border-black/20 rounded-none  h-auto px-2"
            >
              <Image
                src="/icon/location.svg"
                width={20}
                height={20}
                alt="image"
                loading="lazy"
                className="w-5 h-5"
              />
              <div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  Location
                </div>
                <div className="text-black text-sm font-medium">
                  {selectedLocation || "Select Location"}
                </div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-2">
            <input
              aria-label="Location input"
              placeholder="Type your destination"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
            <ul className="mt-2 max-h-60 overflow-auto">
              {countryList
                .filter((item :any) =>
                  item.name?.toLowerCase().includes(locationInput.toLowerCase())
                )
                .map((loc :any) => (
                  <li
                    key={loc?.code}
                    aria-label="Location item"
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                    onClick={() => {
                      setSelectedLocation(loc?.name);
                      setLocationPopoverOpen(false);
                      setLocationInput("");
                    }}
                  >
                    {loc?.name}
                  </li>
                ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      {/* Divider */}

      {/* ✅ Date Picker */}
      <div className=" lg:border-0 border-b border-blackColor/20 w-full flex justify-center">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              aria-label="Date filter"
              variant="ghost"
              className="flex hover:bg-transparent cursor-pointer items-start justify-start lg:border-r !pr-4  !pl-8 border-black/20 rounded-none flex-col h-auto "
            >
              <div className=" flex items-center gap-2">
                <Image
                  src="/icon/time.svg"
                  width={20}
                  height={20}
                  alt="image"
                  className="w-5 h-5"
                />
                <div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    Check in – check out
                  </div>
                  <div className="text-black text-start text-sm font-medium">
                    {appliedDateRange[0] && appliedDateRange[1]
                      ? `${appliedDateRange[0].toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })} - ${appliedDateRange[1].toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                          }
                        )}`
                      : `${new Date().toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })} - ${new Date(
                          Date.now() + 86400000
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}`}
                  </div>
                </div>
              </div>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-4">
            <DatePicker
              selected={dateRange[0]}
              onChange={(dates: [Date, Date]) => {
                setDateRange(dates);
                setStartDate(dates[0]);
                setEndDate(dates[1]);
              }}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              selectsRange
              inline
              monthsShown={
                typeof window !== "undefined" && window.innerWidth >= 640
                  ? 2
                  : 1
              }
              calendarClassName="custom-datepicker"
            />
            <div className="text-right mt-2">
              <button
                aria-label="Apply"
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

      {/* ✅ Guest */}

      <div className=" lg:border-0 border-b border-blackColor/20 w-full py-2 lg:py-0 flex justify-center">
        <Popover open={guestPopoverOpen} onOpenChange={setGuestPopoverOpen}>
          <PopoverTrigger asChild>
            <div aria-label="Guest" className="flex flex-col items-start px-2 cursor-pointer lg:border-r !pl-6 !pr-8 border-black/20 rounded-none">
              <div className="flex items-center gap-3 text-sm">
                <Image
                  src={usericon}
                  alt="user"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-grayColor1 !mb-1.5">Guest</p>
                  <p className="text-black text-sm !mb-0 whitespace-nowrap">
                    {`${rooms.length} Room${
                      rooms.length > 1 ? "s" : ""
                    }, ${totalPeople} People`}
                  </p>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4">
            <div className="">
              <h3 className="text-base font-medium text-black ">
                Guests and Rooms
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Choose your guest and rooms
              </p>

              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  aria-label="Room"
                  className="border border-yellow-400 rounded-lg  mb-4"
                >
                  <div className="flex justify-between bg-secondaryColor/12 items-center text-sm font-semibold p-2 mb-3">
                    <p>Room {room.id}</p>
                    <span className="text-grayColor1 font-normal text-sm ">
                      {room.people} People{room.people > 1 ? "s" : ""},{" "}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 pb-3">
                    <div>
                      <p className="text-sm font-medium text-black">People</p>
                      <p className="text-xs text-muted-foreground">15+ years</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Decrement"
                        onClick={() =>
                          handleChange(index, "people", "decrement")
                        }
                        className="rounded-full border cursor-pointer  p-1.5 border-gray-300 text-black"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-4 text-center text-sm">
                        {room.people}
                      </span>
                      <button
                        aria-label="Increment"
                        onClick={() =>
                          handleChange(index, "people", "increment")
                        }
                        className="rounded-full border cursor-pointer  p-1.5 border-gray-300 text-black"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* <div className="flex justify-between items-center px-4 pb-3">
                    <div>
                      <p className="text-sm font-medium text-black">People</p>
                      <p className="text-xs text-muted-foreground">1–9 years</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleChange(index, "people", "decrement")
                        }
                        className="rounded-full border cursor-pointer  p-1.5 border-gray-300 text-black"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-4 text-center text-sm">
                        {room.people}
                      </span>
                      <button
                        onClick={() =>
                            handleChange(index, "people", "increment")
                        }
                        className="rounded-full border cursor-pointer  p-1.5 border-gray-300 text-black"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div> */}
                </div>
              ))}

              <button
                aria-label="Add another room"
                onClick={addRoom}
                className="w-full bg-secondaryColor cursor-pointer flex items-center justify-center py-2 text-black font-semibold text-sm rounded-md mb-3"
              >
                <Plus className="mr-2 h-4 w-4" /> Add another Room
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Divider */}

      {/* ✅ Filter & Search */}
      <div className="flex justify-between mt-4 pl-2 gap-3 items-center">
        <Button
          ref={buttonRef}
          variant="outline"
          size="icon"
          aria-label="Filter"
          onClick={() => setOpenFilter((prev) => !prev)}
          className="bg-white border rounded-full w-10 h-10"
        >
          <Plus className="text-black" size={20} />
        </Button>

        <div className=" ">
          <button
            aria-label="Search"
            onClick={handleSearch}
            className="bg-secondaryColor cursor-pointer flex justify-center items-center text-black w-10 h-10 p-2 rounded-md"
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
          </button>
        </div>
      </div>
      {openFilter && (
        <div
          ref={filterRef}
          className="bg-white absolute top-full whitespace-nowrap md:w-[600px] w-[90vw] rounded-md shadow-2xl lg:w-[1000px] xl:w-[1100px] left-1/2 -translate-x-1/2 p-4 z-50"
        >
          <HomeAllFilter />
        </div>
      )}
    </div>
  );
}
