'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaClock, FaSearch, FaUsers } from 'react-icons/fa';

export default function AvailabilitySearchBox() {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkin: checkIn,
      checkout: checkOut,
      guests: guests.toString(),
    });

    router.replace(`?${params.toString()}`);
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
      <button
        onClick={handleSearch}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-5 py-3 rounded-lg flex items-center space-x-2"
      >
        <FaSearch />
        <span>Check Availability</span>
      </button>
    </div>
  );
}