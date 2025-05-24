"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import FilterHeading from "./FilterHeading";

const RatingFilter = () => {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const router = useRouter();

  // ✅ Update URL params whenever selectedRatings changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (selectedRatings.length > 0) {
      params.set("ratings", selectedRatings.sort((a, b) => b - a).join(","));
    } else {
      params.delete("ratings");
    }

    router.replace(`?${params.toString()}`,{ scroll: false });
  }, [selectedRatings]);

  // ✅ Toggle rating selection
  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  // ✅ Reset both state and params
  const handleReset = () => {
    setSelectedRatings([]);
    const params = new URLSearchParams(window.location.search);
    params.delete("ratings");
    router.replace(`?${params.toString()}`,{ scroll: false });
  };

  const renderStars = (rating: number) => {
    const filledStars = Array(rating).fill(
      <FaStar className="text-ratingColor text-base" />
    );
    const emptyStars = Array(5 - rating).fill(
      <FaStar className="text-grayColor1/20 text-base" />
    );
    return [...filledStars, ...emptyStars];
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="border-b pb-3 rounded-none border-grayColor1/20">
          <div className="w-[95%]">
            <FilterHeading onReset={handleReset} title="Ratings" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4 space-y-4">
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                  />
                  <div className="h-4 w-4 flex justify-center items-center rounded-xs border-2 border-grayColor1/20 peer-checked:bg-checkBoxColor transition-colors">
                    <MdDone className="text-whiteColor text-xs" />
                  </div>
                  <span className="flex gap-[1px]">{renderStars(rating)}</span>
                </div>
                <span className="text-headerColor">({rating}.0)</span>
              </label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RatingFilter;
