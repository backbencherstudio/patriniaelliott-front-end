"use client";

import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AccommodationCard from "../card/AccommodationCard";
import CardSkeleton from "../card/CardSkeleton";
import CustomButton from "../reusable/CustomButton";

function Accommodation() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<'apartment' | 'hotel' | 'tour'>('apartment');
  const endpoint = `/admin/vendor-package?type=${activeTab}&limit=${10}&page=${1}`
  const { data, loading, error } = useFetchData(endpoint);
  const packageData = data ? data?.data : []
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
    <section className=" bg-bgColor py-12">
      <div className="container px-4 md:px-16  relative">
        <div className="lg:my-20">
          <h2 className="text-3xl lg:text-5xl font-medium text-blackColor text-center mb-8">
            Our Popular Accommodation
          </h2>
          <div className="flex justify-center text-center mx-auto  ">
            {['apartment', 'hotel',"tour"].map(tab => (
              <button
                aria-label={tab}
                key={tab}
                className={`text-2xl cursor-pointer font-medium px-4 pb-2 transition border-b-[2px] border-[#A5A5AB] ${activeTab === tab ? ' border-b-2 border-secondaryColor text-secondaryColor ' : 'text-[#A5A5AB]'
                  }`}
                onClick={() => setActiveTab(tab as 'apartment' | 'hotel' | 'tour')}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            {/* Swiper Navigation Buttons */}
            {!error && (!loading && <button
              aria-label="Previous"
              onClick={goPrev}
              className="absolute z-10 top-1/2 cursor-pointer -translate-y-1/2 left-0 xl:-left-14 w-10 h-10 rounded-full bg-white/70 border border-gray-300 backdrop-blur-md flex items-center justify-center shadow hover:bg-yellow-400 transition"
            >
              <FaChevronLeft className="text-black text-sm" />
            </button>)}
            {!error && (!loading && <button
              aria-label="Next"
              onClick={goNext}
              className="absolute z-10 top-1/2 cursor-pointer -translate-y-1/2 right-0 xl:-right-14 w-10 h-10 rounded-full bg-white/70 border border-gray-300 backdrop-blur-md flex items-center justify-center shadow hover:bg-yellow-400 transition"
            >
              <FaChevronRight className="text-black text-sm" />
            </button>)}
            {/* Swiper Carousel */}
            <Swiper
              slidesPerView={1}
             loop={packageData?.length > 3}
              speed={1000}
              autoplay={false}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
                1200: {
                  slidesPerView: 3,
                },
                1500: { slidesPerView: 3 },
              }}
              modules={[Autoplay, Navigation, Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
              className="w-full"
            >
              {loading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                {Array.from({ length: 3 }, (_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div> : packageData?.length < 0 ? <div>Package Data Not Found!</div> : packageData?.map((tour: any, index) => (
                <SwiperSlide key={index} className=" px-1 md:px-4 py-10 ">
                  <AccommodationCard tour={tour} />
                </SwiperSlide>
              ))}
              {(error && packageData?.length === 0) && <div className="text-center text-2xl font-bold text-redColor py-10">Server is not responding!</div>}
            </Swiper>
          </div>
          <div>
            {!error && (!loading && <Link aria-label="View All Apartments" href={`/${activeTab}s`}>
              <CustomButton>View All Apartments</CustomButton>
            </Link>)}
          </div>
        </div>
      </div>
    </section>

  )
}

export default Accommodation
