"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import TourCard from "../card/TourCard";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardSkeleton from "../card/CardSkeleton";
import CustomButton from "../reusable/CustomButton";

export default function TourList() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const {token} = useToken()
  const swiperRef = useRef<any>(null);

  // React Query for fetching tour data
  const getTourData = async () => {
    const endpoint = `/admin/vendor-package?type=tour&limit=${10}&page=${1}`;
    const response = await UserService.getData(endpoint, token);
    return response?.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["tourData"],
    queryFn: getTourData,
  });

  const packageData = data?.data || [];

  const goNext = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  const goPrev = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);


  return (
    <section className="container px-4 md:px-16  relative">
      <div className="my-20">
        <h2 className="text-3xl lg:text-5xl font-medium text-blackColor text-center mb-2 lg:mb-5">
          Top Travel Packages
        </h2>
        <div className="relative">
          {/* Swiper Navigation Buttons */}
          <button
            aria-label="Previous"
            onClick={goPrev}
            className="absolute z-10 top-1/2 cursor-pointer -translate-y-1/2 left-0 xl:-left-14 w-10 h-10 rounded-full bg-white/70 border border-gray-300 backdrop-blur-md flex items-center justify-center shadow hover:bg-yellow-400 transition"
          >
            <FaChevronLeft className="text-black text-sm" />
          </button>
          <button
            aria-label="Next"
            onClick={goNext}
            className="absolute z-10 top-1/2 cursor-pointer -translate-y-1/2 right-0 xl:-right-14 w-10 h-10 rounded-full bg-white/70 border border-gray-300 backdrop-blur-md flex items-center justify-center shadow hover:bg-yellow-400 transition"
          >
            <FaChevronRight className="text-black text-sm" />
          </button>
          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
              {Array.from({ length: 3 }, (_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : packageData?.length === 0 ? (
            <div className="text-center text-xl md:text-2xl font-semibold py-10">Package Data Not Found!</div>
          ) : (
            <Swiper
              slidesPerView={1}
              loop={packageData?.length > 3}
              speed={1000}
              autoplay={false}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
                1500: { slidesPerView: 3 },
              }}
              modules={[Autoplay, Navigation, Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
              className="w-full"
            >
              {packageData.map((tour: any, index) => (
                <SwiperSlide key={index} className="px-1 md:px-4 py-10">
                  <TourCard tour={tour} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {(error && packageData?.length === 0) && (
            <div className="text-center text-2xl font-bold text-redColor py-10">Server is not responding!</div>
          )}
        </div>

        <div>
          <CustomButton>View All Packages</CustomButton>
        </div>
      </div>
    </section>
  );
}
