"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const router = useRouter();

  // ✅ Sync with URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (isFreeCancellation) {
      params.set("freeCancel", "true");
    } else {
      params.delete("freeCancel");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [isFreeCancellation]);

  // ✅ Toggle handler
  const handleFreeCancellationChange = () => {
    setIsFreeCancellation((prev) => !prev);
  };

  // ✅ Reset handler
  const handleReset = () => {
    setIsFreeCancellation(false);

    const params = new URLSearchParams(window.location.search);
    params.delete("freeCancel");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="border-b pb-3 items-center rounded-none border-grayColor1/20">
          <div className="w-[95%]">
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

              {/* Styled Checkbox */}
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
