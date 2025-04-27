'use client';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdDone } from "react-icons/md";
import FilterHeading from './FilterHeading';
const RatingFilter = () => {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const handleReset = () => {
    setSelectedRatings([]);
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
    <div className="bg-white">
      <FilterHeading onReset={handleReset} title="Ratings" />
      <div className="mt-4 space-y-4">
        {[5, 4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex justify-between items-center cursor-pointer">
            <div className="flex items-center gap-3">
              {/* Hidden checkbox */}
              <input
                type="checkbox"
                className="peer hidden"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
              />
              {/* Visual box with Check icon when selected */}
              <div className="h-4 w-4 flex justify-center items-center rounded-xs border-2 border-grayColor1/20 peer-checked:bg-checkBoxColor transition-colors">
                <MdDone className="text-whiteColor " />
              </div>

              {/* Stars */}
              <span className="flex gap-[1px]">{renderStars(rating)}</span>
            </div>

            <span className="text-headerColor">({rating}.0)</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
