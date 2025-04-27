'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import usericon from "@/public/icon/user.svg";
import {
  CalendarIcon,
  ChevronDown,
  MapPin,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GuestsAndRooms from './GuestsAndRooms';
const destinations = ['Japan', 'London', 'Nepal', 'China', 'India'];

export default function TourSearch() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [guestType, setGuestType] = useState<'travelers' | 'guestsAndRooms'>('travelers');
  const [travelers, setTravelers] = useState(2);

  const [roomList, setRoomList] = useState([
    { id: 1, adults: 2, children: 0 },
  ]);

  const totalAdults = roomList.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = roomList.reduce((acc, r) => acc + r.children, 0);

  return (
    <div className="bg-white rounded-[12px] px-4 py-[14px] lg:flex items-center justify-between space-x-2 shadow-md w-full">
      {/* Location */}
      <div>
     <Popover>
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
              {selectedLocation || 'Select Location'}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-2">
          <Input
            placeholder="Type your destination"
            onChange={(e) => setSelectedLocation(e.target.value)}
          />
          <ul className="mt-2">
            {destinations
              .filter((item) =>
                item.toLowerCase().includes(selectedLocation.toLowerCase())
              )
              .map((loc) => (
                <li
                  key={loc}
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                  onClick={() => setSelectedLocation(loc)}
                >
                  {loc}
                </li>
              ))}
          </ul>
        </PopoverContent>
      </Popover>
      </div>
 
      {/* Divider */}
      <div className="w-px hidden lg:block h-10 bg-gray-200" />
      {/* Date Picker */}
      <div>
 <Popover>
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
              {startDate && endDate
                ? `${startDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  })} - ${endDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  })}`
                : '04 Jan–04 Feb'}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <DatePicker
            selected={startDate}
            onChange={(dates: [Date, Date]) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </PopoverContent>
      </Popover>
      </div>
     

      {/* Divider */}
    
      {/* Guest Type Dropdown */}
      <div>

      <div className="flex flex-col items-start px-2">
        <div className="flex items-center gap-3  text-sm">
          <Image src={usericon} alt="user" width={32} height={24} className=''/>
          <div>
            <p className='text-grayColor1'>Guest</p>
  
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-black text-base font-medium p-0 hover:bg-transparent"
            >
              {guestType === 'travelers'
                ? ` Total travelers`
                : `${roomList.length} Room${roomList.length > 1 ? 's' : ''}, ${totalAdults} Adults, ${totalChildren} Children`}
              <span className=""><ChevronDown size={16} /></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setGuestType('travelers')}>
              Total travelers
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setGuestType('guestsAndRooms')}>
              Your guests and rooms
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          </div>
        
        </div>
        
      </div>
      </div>

      {/* Divider */}
      <div className="w-px hidden lg:block h-10 bg-gray-200" />

      {/* Plus Popover (based on guestType) */}
      <div className=' flex justify-between gap-3'>

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
        <PopoverContent className="w-80 p-4">
          {guestType === 'travelers' ? (
            <div className="space-y-3">
              <p className="font-semibold text-sm">Total Travelers</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                >
                  –
                </Button>
                <span>{travelers}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTravelers(travelers + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          ) : (
            <GuestsAndRooms />
          )}
        </PopoverContent>
      </Popover>
<Button className="bg-yellow-400 hover:bg-yellow-500 text-black w-10 h-10 p-2 rounded-md">
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

      {/* Search button */}
      
    </div>
  );
}
