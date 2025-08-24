"use client";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";
import Loader from "../reusable/Loader";
import ReviewList from "./ReviewList";

const ReviewSection = ({ singleApartment }) => {
  const { token } = useToken()
  const searchParams = useSearchParams();
  const progressRefs = useRef<HTMLDivElement[]>([]);
  const ratingRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [reviewData, setReviewData] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [dloading, setDLoading] = useState(false)
  const circlePathRef = useRef<SVGCircleElement>(null); // Updated to circle

  useEffect(() => {
    const fetchReviewData = async () => {
      if (!singleApartment?.id) {
        setReviewData(null);
        return;
      }
      setReviewLoading(true);
      setReviewError(null);

      try {
        const endpoint = `/admin/vendor-package/${singleApartment.id}/reviews?page=${currentPage}&limit=${10}`;
        const response = await UserService.getData(endpoint, token)
        const data = response?.data?.data
        setReviewData(data);
        setReviewList(data?.reviews)
      } catch (error) {
        console.error('Error fetching review data:', error);
        setReviewError(error.message);
      } finally {
        setReviewLoading(false);
      }
    };
    fetchReviewData();
  }, [singleApartment?.id, currentPage]);
  const [comment, setComment] = useState("");
  const [reviewStats, setReviewStats] = useState([
    { rating: 5, count: 160 },
    { rating: 4, count: 12 },
    { rating: 3, count: 8 },
    { rating: 2, count: 0 },
    { rating: 1, count: 0 },
  ]);

  const [starValue, setStarValue] = useState(0);
  const totalReviews = reviewStats.reduce((acc, item) => acc + item.count, 0);


  const ratingNu = reviewData?.summary?.averageRating ? reviewData?.summary?.averageRating : 0
  const averageRating =
    totalReviews > 0
      ? ratingNu?.toFixed(1)
      : "0.0";

  const handleReviewComment = async () => {
    setLoading(true)
    const data = {
      rating_value: starValue,
      comment: comment,
    }

    const endpoint = `/admin/vendor-package/${singleApartment?.id}/reviews`
    try {
      const res = await UserService?.createData(endpoint, data, token)
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setComment("")
        setStarValue(0)
        setLoading(false)
        setReviewList((prev) => [...prev, res?.data?.data])
      } else {
        toast.warning(res?.data?.message)
      }
      console.log("create response", res);
    } catch (error) {
      console.log(error.message);
      setLoading(false)
    }
  }
  const handleDeleteComment = async (id) => {
    setDLoading(true)
    const endpoint = `/admin/vendor-package/${singleApartment?.id}/reviews/${id}`
    try {
      const res = await UserService?.deleteData(endpoint, token)
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setComment("")
        setStarValue(0)
        setDLoading(false)
        setReviewList((prev) => prev.filter((item) => item.id !== id))
      } else {
        toast.warning(res?.data?.message)
      }
      console.log("delete response", res);
    } catch (error) {
      console.log(error.message);
      setDLoading(false)
    }
  }

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

  console.log("test============", reviewList);

  if (reviewLoading) return <Loader />
  return (
    <div>
      <div className=" my-8">
        <h2 className="text-2xl lg:text-[32px] font-semibold mb-4">
          Add a review
        </h2>
        {/* Input Box */}
        <div className="flex items-center gap-4">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Rating (1 to 5)</label>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setStarValue(i + 1)}
                  className="focus:outline-none"
                >
                  <FaStar
                    size={28}
                    color={i < starValue ? "#FFD700" : "#e5e7eb"}
                    style={{ cursor: "pointer" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Share your overall thoughts"
              className="flex-1 border-none outline-none text-sm"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleReviewComment} disabled={loading} className="bg-secondaryColor disabled:bg-grayColor1 disabled:cursor-not-allowed cursor-pointer hover:bg-secondaryColor text-headerColor text-sm font-medium px-4 py-2 rounded-[4px] ">
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
                  0 0.
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
                          i < Math.round(Number(reviewData?.summary?.averageRating))
                            ? "text-[#FAAD14]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  From {reviewData?.summary?.totalReviews} reviews
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
      <ReviewList reviewData={reviewList} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={reviewData?.pagination?.totalPages} onDelete={handleDeleteComment} />
    </div>
  );
};

export default ReviewSection;
