"use client";



export default function SatisfactionCard({data}:any) {
  const dataCard = {
    poor: data?.overall_satisfaction?.dissatisfied?.percentage
,
    average: data?.overall_satisfaction?.neutral?.percentage,
    good: data?.overall_satisfaction?.satisfied?.percentage,
  };

  return (
    <div className="py-4 px-6 bg-bgColor border-0 rounded-lg shadow-none">
      <div className=" flex flex-col justify-around h-full">
        <p className="text-sm  text-descriptionColor mb-3">Overall Satisfaction</p>

        {/* Progress Bar */}
        <div className="flex h-4 w-full rounded-xs overflow-hidden mb-4 relative">
          {/* Poor - Red section */}
          <div className="bg-[#FE5050]" style={{ width: `${dataCard.poor}%` }} />

          {/* Average - Gray section */}
          <div className="bg-gray-300" style={{ width: `${dataCard.average}%` }} />

          {/* Good - Green section */}
          <div className="bg-[#6DD287]" style={{ width: `${dataCard.good}%` }} />

        
        </div>

        {/* Labels and Icons */}
        <div className="flex justify-between text-xs text-gray-600 items-center">
          <div className="flex items-center gap-1 text-[#FE5050]">
            <span>{dataCard.poor}%</span>
           <span className="">{data?.overall_satisfaction?.dissatisfied?.emoji}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span>{dataCard.average}%</span>
            <span>{data?.overall_satisfaction?.neutral?.emoji}</span>
          </div>
          <div className="flex items-center gap-1 text-[#6DD287]">
            <span>{dataCard.good}%</span>
            <span>{data?.overall_satisfaction?.satisfied?.emoji}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
