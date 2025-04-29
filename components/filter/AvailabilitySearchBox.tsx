'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaClock, FaSearch, FaUsers } from 'react-icons/fa';

export default function AvailabilitySearchBox() {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState('04 Jan');
  const [checkOut, setCheckOut] = useState('10 Jan');
  const [guests, setGuests] = useState('1 room');

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkin: checkIn,
      checkout: checkOut,
      guests: guests,
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between space-x-4 max-w-5xl mx-auto">
      
      {/* Check-in */}
      <div className="flex items-center space-x-2 border-r pr-6">
        <FaClock className="text-xl text-black" />
        <div>
          <p className="text-sm text-gray-500">Check in</p>
          <p className="text-base font-medium text-black">{checkIn}</p>
        </div>
      </div>

      {/* Check-out */}
      <div className="flex items-center space-x-2 border-r pr-6">
        <FaClock className="text-xl text-black" />
        <div>
          <p className="text-sm text-gray-500">Check out</p>
          <p className="text-base font-medium text-black">{checkOut}</p>
        </div>
      </div>

      {/* Guests */}
      <div className="flex items-center space-x-2 border-r pr-6">
        <FaUsers className="text-xl text-black" />
        <div>
          <p className="text-sm text-gray-500">Guests</p>
          <p className="text-base font-medium text-black">{guests}</p>
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
