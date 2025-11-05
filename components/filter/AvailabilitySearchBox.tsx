'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaClock, FaSearch, FaUsers } from 'react-icons/fa';
import { X } from 'lucide-react';

export default function AvailabilitySearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  useEffect(() => {
    const durationStart = searchParams.get('duration_start');
    const durationEnd = searchParams.get('duration_end');
    const people = searchParams.get('people');
    if (durationStart) setCheckIn(durationStart);
    if (durationEnd) setCheckOut(durationEnd);
    if (people) setGuests(Number(people));
  }, [searchParams]);
  const handleSearch = () => {
    const params = new URLSearchParams({
      duration_start: checkIn,
      duration_end: checkOut,
      people: guests.toString(),
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    setCheckIn('');
    setCheckOut('');
    setGuests(1);
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete('duration_start');
    currentParams.delete('duration_end');
    currentParams.delete('people');
    router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between space-x-4 max-w-5xl mx-auto">

      {/* Check-in */}
      <div className="flex items-center space-x-2 border-r pr-6">
        <FaClock className="text-xl text-black" />
        <div>
          <p className="text-sm text-gray-500">Check in</p>
          <input
            type="date"
            value={checkIn}
            onChange={e => setCheckIn(e.target.value)}
            className="text-base font-medium text-black outline-none"
          />
        </div>
      </div>

      {/* Check-out */}
      <div className="flex items-center space-x-2 border-r pr-6">
        <FaClock className="text-xl text-black" />
        <div>
          <p className="text-sm text-gray-500">Check out</p>
          <input
            type="date"
            value={checkOut}
            onChange={e => setCheckOut(e.target.value)}
            className="text-base font-medium text-black outline-none"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="flex items-center space-x-2 border-r pr-6">
        <FaUsers className="text-xl text-black" />
        <div>
          <p className="text-sm text-gray-500">Guests</p>
          <input
            type="number"
            min={1}
            value={guests}
            onChange={e => setGuests(Number(e.target.value))}
            className="text-base font-medium text-black outline-none w-16"
          />
        </div>
      </div>

      {/* Button */}
      <div className='flex items-center gap-2'>
       
      <button
        onClick={handleSearch}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-5 py-3 rounded-lg flex items-center space-x-2 cursor-pointer"
      >
        <FaSearch />
        <span>Check Availability</span>
      </button>
    {(checkIn || checkOut || guests > 1) && <button onClick={handleReset} className="bg-redColor/30 text-redColor border border-redColor w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"><X className="w-5 h-5 text-redColor"/></button>}
      </div>
    </div>
  );
}