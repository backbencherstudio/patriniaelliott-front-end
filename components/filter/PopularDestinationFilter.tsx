'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdDone } from 'react-icons/md';
import FilterHeading from './FilterHeading';

const destinations = ['Indonesia', 'Bali', 'Dubai', 'Japan', 'Italy', 'Paris'];

const PopularDestinationFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  useEffect(() => {
    const param = searchParams.get('destinations');
    if (param) {
      setSelectedDestinations(param.split(','));
    }
  }, []);

  const updateSearchParams = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length) {
      params.set('destinations', values.join(','));
    } else {
      params.delete('destinations');
    }

    // ✅ Prevent scroll-to-top here
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleToggle = (country: string) => {
    const updated = selectedDestinations.includes(country)
      ? selectedDestinations.filter((item) => item !== country)
      : [...selectedDestinations, country];

    setSelectedDestinations(updated);
    updateSearchParams(updated);
  };

  const handleReset = () => {
    setSelectedDestinations([]);
    updateSearchParams([]);
  };

  return (
    <div className="pb-4">
      <FilterHeading onReset={handleReset} title="Popular Destination" />

      <div className="mt-4 space-y-3">
        {destinations.map((country, idx) => {
          const isChecked = selectedDestinations.includes(country);
          return (
            <label key={idx} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(country)}
                className="peer hidden"
              />
              <div className={`h-4 w-4 flex items-center justify-center border-2 rounded-xs
                ${isChecked ? 'bg-checkBoxColor border-checkBoxColor' : 'border-grayColor1/20'}
                transition-colors`}>
                {isChecked && <MdDone className="text-white text-base" />}
              </div>
              <span className="text-base text-grayColor1">{country}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PopularDestinationFilter;
