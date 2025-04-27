'use client';

import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function DestinationSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get('destination') || '');

  // Debounced route update
  const updateQuery = debounce((value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('destination', value);
    } else {
      params.delete('destination');
    }
    router.push(`?${params.toString()}`);
  }, 500); // debounce delay 500ms

  useEffect(() => {
    updateQuery(input);
    return () => {
      updateQuery.cancel();
    };
  }, [input]);

  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search Destination"
        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
      />
    </div>
  );
}
