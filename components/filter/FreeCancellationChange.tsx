"use client";
import { useState } from "react";
import { MdDone } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import FilterHeading from "./FilterHeading";

const FreeCancellationFilter = () => {
  const [isFreeCancellation, setIsFreeCancellation] = useState(false);

  const handleFreeCancellationChange = () => {
    setIsFreeCancellation((prev) => !prev);
  };

  const handleReset = () => {
    setIsFreeCancellation(false);
  };

  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1" className=" border-b-0">
        <AccordionTrigger className="border-b pb-3 items-center rounded-none border-grayColor1/20">
          <div className=" w-[95%]">
            <FilterHeading
              onReset={handleReset}
              title="Free Cancellation options"
            />
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4 border-b-0 space-y-4">
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              {/* Hidden Checkbox */}
              <input
                type="checkbox"
                checked={isFreeCancellation}
                onChange={handleFreeCancellationChange}
                className="peer hidden"
              />

              {/* Styled Checkbox Visual */}
              <div className="h-4 w-4 flex items-center justify-center border-2 border-grayColor1/20 rounded-xs peer-checked:bg-checkBoxColor peer-checked:border-checkBoxColor transition-colors">
                {isFreeCancellation && (
                  <MdDone className="text-white text-sm" />
                )}
              </div>

              {/* Label */}
              <span className="text-base text-gray-700">Free Cancellation</span>
            </label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FreeCancellationFilter;
