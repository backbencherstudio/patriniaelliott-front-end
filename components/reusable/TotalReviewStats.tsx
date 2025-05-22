"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";

interface TotalReviewStatsProps {
  averageRating: number;
}

const TotalReviewStats: React.FC<TotalReviewStatsProps> = ({ averageRating }) => {
  const ratingRef = useRef<HTMLDivElement | null>(null);
  const circlePathRef = useRef<SVGCircleElement | null>(null);

  const radius = 11; // Smaller radius
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (ratingRef.current) {
      const ratingNumber = { val: 0 };
      gsap.to(ratingNumber, {
        val: averageRating,
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
      const offset = circumference - (averageRating / 5) * circumference;

      gsap.fromTo(
        circlePathRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: offset,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  }, [averageRating]);

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="relative w-14 h-14">
        <svg viewBox="0 0 26 26" className="w-full h-full rotate-[-90deg]">
          <circle
            cx="13"
            cy="13"
            r={radius}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
          <circle
            ref={circlePathRef}
            cx="13"
            cy="13"
            r={radius}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </svg>
        <div
          ref={ratingRef}
          className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-blackColor"
        >
          0.0
        </div>
      </div>

      <div className=" flex mt-2 flex-col items-center">
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
                    <p className="text-gray-500 text-base mt-1">
                      From 120 reviews
                    </p>
                  </div>
                  <div>
                    <button className=" mt-2 text-base text-[#0068EF] py-2 px-5 cursor-pointer rounded-md border border-[#0068EF] bg-whiteColor">See reviews</button>
                  </div>
    </div>
  );
};

export default TotalReviewStats;
