"use client";

import { Frown, Meh, Smile } from "lucide-react";

export default function SatisfactionCard() {
  const data = {
    poor: 20,
    average: 20,
    good: 60,
  };

  return (
    <div className="py-4 px-6 bg-bgColor border-0 rounded-lg shadow-none">
      <div className=" flex flex-col justify-around h-full">
        <p className="text-sm  text-descriptionColor mb-3">Overall Satisfaction</p>

        {/* Progress Bar */}
        <div className="flex h-4 w-full rounded-xs overflow-hidden mb-4 relative">
          {/* Poor - Red section */}
          <div className="bg-[#FE5050]" style={{ width: `${data.poor}%` }} />

          {/* Average - Gray section */}
          <div className="bg-gray-300" style={{ width: `${data.average}%` }} />

          {/* Good - Green section */}
          <div className="bg-[#6DD287]" style={{ width: `${data.good}%` }} />

        
        </div>

        {/* Labels and Icons */}
        <div className="flex justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1 text-[#FE5050]">
            <span>{data.poor}%</span>
            <Frown className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span>{data.average}%</span>
            <Meh className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-1 text-[#6DD287]">
            <span>{data.good}%</span>
            <Smile className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
