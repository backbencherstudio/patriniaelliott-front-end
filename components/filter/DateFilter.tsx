'use client';
import { CalendarIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'; // To update search params
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'; // Correct import for AccordionItem
import FilterHeading from './FilterHeading';

const DurationFilter = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const startParam = searchParams.get("startDate");
    const endParam = searchParams.get("endDate");

    if (startParam) {
      setStartDate(new Date(startParam));
    }

    if (endParam) {
      setEndDate(new Date(endParam));
    }
  }, []);
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      // Update the searchParams with the selected start date
      const startDateParam = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set('startDate', startDateParam);
      router.replace(`${window.location.pathname}?${currentParams.toString()}`,  { scroll: false });
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    if (date) {
      // Update the searchParams with the selected end date
      const endDateParam = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set('endDate', endDateParam);
      router.replace(`${window.location.pathname}?${currentParams.toString()}`,  { scroll: false });
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    // Reset searchParams
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete('startDate');
    currentParams.delete('endDate');
    router.replace(`${window.location.pathname}?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1" className=' border-b-0'>
        <AccordionTrigger className='border-b pb-3 rounded-none border-grayColor1/20'>
        <div className=' w-[95%]'>
          <FilterHeading onReset={handleReset} title="Durations" />
        </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4 border-b-0 space-y-4">
          {/* Start Date */}
          <div className="flex cursor-pointer items-center justify-between border border-gray-300 rounded-md p-2" onClick={() => {
            // Trigger date picker on input focus (clicking the input)
            const input = document.getElementById('start-date-picker');
            input?.click();
          }}>
            <input
              type="text"
              placeholder="Start date"
              value={startDate ? startDate.toLocaleDateString() : ''}
              readOnly
              className="border-0 outline-none text-gray-700 text-sm w-full"
            />
            <DatePicker
              id="start-date-picker"
              selected={startDate}
              onChange={handleStartDateChange}
              placeholderText="Select a date"
              className="hidden"
              minDate={new Date()}
            />
            <CalendarIcon className="text-yellow-500" />
          </div>
          {/* End Date */}
          <div className="flex items-center cursor-pointer justify-between border border-gray-300 rounded-md p-2" onClick={() => {
            // Trigger date picker on input focus (clicking the input)
            const input = document.getElementById('end-date-picker');
            input?.click();
          }}>
            <input
              type="text"
              value={endDate ? endDate.toLocaleDateString() : ''}
              placeholder="End date"
              readOnly
              className="border-0 outline-none text-gray-700 text-sm w-full"
            />
            <DatePicker
              id="end-date-picker"
              selected={endDate}
              onChange={handleEndDateChange}
              placeholderText="Select a date"
              className="hidden"
              minDate={startDate || new Date()}
            />
            <CalendarIcon className="text-yellow-500" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DurationFilter;
