"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import FilterHeading from "./FilterHeading";
const areas = [
  { label: "Beach", count: 8 },
  { label: "Mountain", count: 9 },
  { label: "City", count: 10 },
  { label: "Adventure", count: 22 },
  { label: "Thematic Tours", count: 22 },
  { label: "Cultural", count: 22 },
  { label: "Historical", count: 22 },
  { label: "Personalized Tours", count: 22 },
];

const PopularAreaFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    const param = searchParams.get("areas");
    if (param) {
      setSelectedAreas(param.split(","));
    }
  }, []);

  const updateSearchParams = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length) {
      params.set("areas", values.join(","));
    } else {
      params.delete("areas");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const handleToggle = (area: string) => {
    const updated = selectedAreas.includes(area)
      ? selectedAreas.filter((item) => item !== area)
      : [...selectedAreas, area];

    setSelectedAreas(updated);
    updateSearchParams(updated);
  };
  const handleReset = () => {
    setSelectedAreas([]);
    updateSearchParams([]);
  };

  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1" className=" border-b-0">
        <AccordionTrigger className="border-b pb-3 items-center rounded-none border-grayColor1/20">
          <div className=" w-[95%]">
            <FilterHeading onReset={handleReset} title="Popular Area" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4 border-b-0 space-y-4">
          <div className="mt-4 space-y-3">
            {areas.map((area, idx) => {
              const isChecked = selectedAreas.includes(area.label);
              return (
                <label
                  key={idx}
                  className="flex justify-between items-center cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    {/* Hidden checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggle(area.label)}
                      className="peer hidden"
                    />

                    {/* Styled checkbox */}
                    <div
                      className={`h-4 w-4 flex items-center justify-center border-2 rounded-xs
                    ${
                      isChecked
                        ? "bg-checkBoxColor border-checkBoxColor"
                        : "border-grayColor1/20"
                    }
                    transition-colors`}
                    >
                      {isChecked && <MdDone className="text-white text-base" />}
                    </div>

                    <label
                      htmlFor={`area-${idx}`}
                      className="text-base text-grayColor1"
                    >
                      {area.label}
                    </label>
                  </div>
                  <span className="text-base text-grayColor1">
                    {area.count}
                  </span>
                </label>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PopularAreaFilter;
