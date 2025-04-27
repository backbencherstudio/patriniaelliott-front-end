'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdDone } from 'react-icons/md';
import FilterHeading from './FilterHeading';

const residences = [
  'Resort',
  'Hotel',
  'Villa',
  'Apartment',
  'Private vacation home',
  'Guesthouse',
  'Hostel',
];

const ResidenceFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedResidences, setSelectedResidences] = useState<string[]>([]);

  // Load from search params
  useEffect(() => {
    const param = searchParams.get('residences');
    if (param) {
      setSelectedResidences(param.split(','));
    }
  }, []);

  // Update search params
  const updateSearchParams = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length) {
      params.set('residences', values.join(','));
    } else {
      params.delete('residences');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleToggle = (residence: string) => {
    const updated = selectedResidences.includes(residence)
      ? selectedResidences.filter((item) => item !== residence)
      : [...selectedResidences, residence];

    setSelectedResidences(updated);
    updateSearchParams(updated);
  };

  const handleReset = () => {
    setSelectedResidences([]);
    updateSearchParams([]);
  };

  return (
    <div className="pb-4">
      <FilterHeading onReset={handleReset} title="Type of residence" />

      <div className="mt-4 space-y-3">
        {residences.map((residence, idx) => {
          const isChecked = selectedResidences.includes(residence);
          return (
            <label key={idx} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(residence)}
                className="peer hidden"
              />
              <div
                className={`h-4 w-4 flex items-center justify-center border-2 rounded-xs
                  ${isChecked ? 'bg-checkBoxColor border-checkBoxColor' : 'border-grayColor1/20'}
                  transition-colors`}
              >
                {isChecked && <MdDone className="text-white text-base" />}
              </div>
              <span className="text-base text-grayColor1">{residence}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ResidenceFilter;
