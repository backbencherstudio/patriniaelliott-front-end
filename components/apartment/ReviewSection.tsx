"use client";

import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";

const ReviewSection = () => {
  const searchParams = useSearchParams();
  const progressRefs = useRef<HTMLDivElement[]>([]);
  const ratingRef = useRef<HTMLDivElement>(null);
  const circlePathRef = useRef<SVGCircleElement>(null); // Updated to circle
  const [reviewStats, setReviewStats] = useState([
    { rating: 5, count: 160 },
    { rating: 4, count: 12 },
    { rating: 3, count: 8 },
    { rating: 2, count: 0 },
    { rating: 1, count: 0 },
  ]);

  const totalReviews = reviewStats.reduce((acc, item) => acc + item.count, 0);

  const averageRating =
    totalReviews > 0
      ? (
          reviewStats.reduce((acc, item) => acc + item.rating * item.count, 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  useEffect(() => {
    if (progressRefs.current.length > 0) {
      progressRefs.current.forEach((bar, index) => {
        const item = reviewStats[index];
        const percentage =
          totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;

        gsap.fromTo(
          bar,
          { width: "0%" },
          { width: `${percentage}%`, duration: 1.2, ease: "power2.out" }
        );
      });
    }

    if (ratingRef.current) {
      const ratingNumber = { val: 0 };
      gsap.to(ratingNumber, {
        val: parseFloat(averageRating),
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (ratingRef.current) {
            ratingRef.current.innerText = ratingNumber.val.toFixed(1);
          }
        },
      });
    }

    if (circlePathRef.current) {
      const ratingPercent = (parseFloat(averageRating) / 5) * 100;
      gsap.fromTo(
        circlePathRef.current,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 100 - ratingPercent,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  }, [reviewStats, totalReviews, averageRating]);

  return (
    <div className=" my-8">
      <h2 className="text-2xl lg:text-[32px] font-semibold mb-4">
        Add a review
      </h2>

      {/* Input Box */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Share your overall thoughts"
            className="flex-1 border-none outline-none text-sm"
          />
          <button className="bg-secondaryColor hover:bg-secondaryColor text-headerColor text-sm font-medium px-4 py-2 rounded-[4px] cursor-pointer">
            Submit
          </button>
        </div>
      </div>

      {/* Rating Section */}
      <div className="bg-white border rounded-lg p-6">
        <div className="lg:grid grid-cols-10 items-center space-x-4 mb-4">
          <div className=" col-span-2 flex-col flex items-center">
            <div className="relative w-20 h-20">
              {/* Center Rating Text */}
              <div
                ref={ratingRef}
                className="absolute inset-0 flex items-center justify-center text-2xl lg:text-[32px] font-bold text-secbg-secondaryColor"
              >
                0.0
              </div>
              {/* Circular Progress */}
              <svg
                viewBox="0 0 36 36"
                className="w-full h-full rotate-[-90deg]"
              >
                {/* Background Circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Animated Progress Circle */}
                <circle
                  ref={circlePathRef}
                  cx="18"
                  cy="18"
                  r="16"
                  stroke="#FAAD14"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* Star Icons */}
            <div className=" mt-4 flex flex-col items-center">
              <div className="flex  items-center">
                <div className="flex gap-0.5 text-lg text-[#FAAD14]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(Number(averageRating))
                          ? "text-[#FAAD14]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                From {totalReviews} reviews
              </p>
            </div>
          </div>
          {/* Rating Bars */}
          <div className=" col-span-8 space-y-2 w-full mt-4 lg:mt-0">
            {reviewStats.map((item, index) => {
              const percentage =
                totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
              const barColor = item.count > 0 ? "bg-[#725951]" : "bg-gray-300";

              return (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-5 lg:w-10 text-sm">{item.rating}.0</div>
                  <div className="text-[#FAAD14]">
                    <FaStar />
                  </div>
                  <div
                    className={`flex-1 h-2 bg-gray-200 rounded-full overflow-hidden  `}
                  >
                    <div
                      ref={(el) => {
                        if (el) progressRefs.current[index] = el;
                      }}
                      className={`progress-bar-inner rounded-full h-full ${barColor}`}
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <div className="w-16 text-right text-base font-medium text-descriptionColor">{item.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
