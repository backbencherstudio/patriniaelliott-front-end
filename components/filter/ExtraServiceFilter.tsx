'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdDone } from 'react-icons/md';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import FilterHeading from './FilterHeading';

const extraServices = [
  'Breakfast included',
  'Grocery delivery',
  'Villa',
  'Daily housekeeping',
  'Car rental services',
  'Ironing service',
  'Full apartment cleaning',
  'Doctor on call',
];

const ExtraServiceFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Load from URL on mount
  useEffect(() => {
    const param = searchParams.get('extraServices');
    if (param) {
      setSelectedServices(param.split(','));
    }
  }, []);

  const updateSearchParams = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length) {
      params.set('extraServices', values.join(','));
    } else {
      params.delete('extraServices');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service];

    setSelectedServices(updated);
    updateSearchParams(updated);
  };

  const handleReset = () => {
    setSelectedServices([]);
    updateSearchParams([]);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="border-b pb-3 items-center rounded-none border-grayColor1/20">
          <div className="w-[95%]">
            <FilterHeading onReset={handleReset} title="Extra Service" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4 space-y-3">
          {extraServices.map((service, idx) => {
            const isChecked = selectedServices.includes(service);
            return (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggle(service)}
                  className="peer hidden"
                />
                <div
                  className={`h-4 w-4 flex items-center justify-center border-2 rounded-xs
                  ${
                    isChecked
                      ? 'bg-checkBoxColor border-checkBoxColor'
                      : 'border-grayColor1/20'
                  }
                  transition-colors`}
                >
                  {isChecked && <MdDone className="text-white text-base" />}
                </div>
                <span className="text-base text-grayColor1">{service}</span>
              </label>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExtraServiceFilter;
