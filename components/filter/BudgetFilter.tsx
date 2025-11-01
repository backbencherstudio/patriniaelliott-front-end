"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import FilterHeading from "./FilterHeading";

const BudgetFilter = () => {
  const MIN = 1;
  const MAX = 5000;

  const [minValue, setMinValue] = useState(MIN);
  const [maxValue, setMaxValue] = useState(MAX);
  const [hasInteracted, setHasInteracted] = useState(false);
  const searchParams = useSearchParams();
  const debouncedMin = useDebounce(minValue, 500);
  const debouncedMax = useDebounce(maxValue, 500);
  const Pathname = usePathname()
  const router = useRouter();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 100);
    setMinValue(value);
    setHasInteracted(true); // ✅ Mark interaction
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 100);
    setMaxValue(value);
    setHasInteracted(true); // ✅ Mark interaction
  };

  const handleReset = () => {
    setMinValue(MIN);
    setMaxValue(MAX);
    setHasInteracted(false); // ✅ Reset interaction
    
    // Remove min and max from URL params
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete("min");
    currentParams.delete("max");
    
    const newParams = currentParams.toString();
    router.replace(newParams ? `?${newParams}` : Pathname, { scroll: false });
  };
  useEffect(() => {
    const minParam = searchParams.get("min");
    const maxParam = searchParams.get("max");

    if (minParam) setMinValue(Number(minParam));
    if (maxParam) setMaxValue(Number(maxParam));
  }, []);
  useEffect(() => {
    if (!hasInteracted) return;

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("min", debouncedMin.toString());
    currentParams.set("max", debouncedMax.toString());

    router.replace(`?${currentParams.toString()}`, { scroll: false });
  }, [debouncedMin, debouncedMax, hasInteracted]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="border-b pb-3 rounded-none border-grayColor1/20">
          <div className="w-[95%]">
            <FilterHeading onReset={handleReset} title="Budget" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4 space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm text-gray-600 font-medium">
              <span>${minValue}</span>
              <span>${maxValue}</span>
            </div>

            <div className="relative h-6">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2" />
              <div
                className="absolute top-1/2 h-1 bg-green-500 rounded-full transform -translate-y-1/2"
                style={{
                  left: `${(minValue / MAX) * 100}%`,
                  right: `${100 - (maxValue / MAX) * 100}%`,
                }}
              />
              <input
                type="range"
                min={MIN}
                max={MAX}
                value={minValue}
                onChange={handleMinChange}
                className="absolute top-1/2 w-full h-1 bg-transparent appearance-none pointer-events-auto"
              />
              <input
                type="range"
                min={MIN}
                max={MAX}
                value={maxValue}
                onChange={handleMaxChange}
                className="absolute top-1/2 w-full h-1 bg-transparent appearance-none pointer-events-auto"
              />
            </div>

            <style jsx>{`
              input[type='range']::-webkit-slider-thumb {
                appearance: none;
                height: 20px;
                width: 20px;
                background: white;
                border: 3px solid #22c55e;
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
