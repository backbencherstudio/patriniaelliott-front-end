'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'; // Correct import for 
import FilterHeading from './FilterHeading';
const BudgetFilter = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5000);

  const MIN = 0;
  const MAX = 5000;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 100);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 100);
    setMaxValue(value);
  };

  const handleReset = () => {
    setMinValue(MIN);
    setMaxValue(MAX);
  };

  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1" className=' border-b-0'>
        <AccordionTrigger className='border-b pb-3 rounded-none border-grayColor1/20'>
        <div className=' w-[95%]'>

         <FilterHeading onReset={handleReset} title="Budget" />
        </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4 border-b-0 space-y-4">
         <div className="mt-4">
        <div className="flex justify-between mb-2 text-sm text-gray-600 font-medium">
          <span>${minValue}</span>
          <span>${maxValue}</span>
        </div>

        <div className="relative h-6">
          {/* Track background */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2"
          
          ></div>

          {/* Active range */}
          <div
            className="absolute top-1/2 h-1 bg-green-500 rounded-full transform -translate-y-1/2"
            style={{
              left: `${(minValue / MAX) * 100}%`,
              right: `${100 - (maxValue / MAX) * 100}%`,
            }}
          ></div>

          {/* Min slider */}
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={minValue}
            onChange={handleMinChange}
            className="absolute top-1/2  w-full h-1 bg-transparent appearance-none pointer-events-auto"
          />

          {/* Max slider */}
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={maxValue}
            onChange={handleMaxChange}
            className="absolute w-full top-1/2  right-0 h-1 bg-transparent appearance-none pointer-events-auto"
          />
        </div>

        {/* Custom Thumb Styling */}
        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            background: white;
            border: 3px solid #22c55e; /* green-500 */
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
            margin-top: -9px;
          }
          input[type='range']::-moz-range-thumb {
            height: 20px;
            width: 20px;
            background: white;
            border: 3px solid #22c55e;
            border-radius: 50%;
            cursor: pointer;
          }
        `}</style>
      </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  

      
    
  );
};

export default BudgetFilter;

