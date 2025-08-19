"use client";

import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import AccommodationCard from "../card/AccommodationCard";
import CustomButton from "../reusable/CustomButton";
import Loader from "../reusable/Loader";


function Accommodation() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const swiperRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<'apartment' | 'hotel'>('apartment');
  const endpoint = `/admin/vendor-package?type=${activeTab}&limit=${20}&page=${1}`
  const { data, loading, error } = useFetchData(endpoint);
   const packageData =data ? data?.data : []
  
      const goNext = () => swiperRef.current?.slideNext();
      const goPrev = () => swiperRef.current?.slidePrev();
  return (
    <section className=" bg-bgColor py-12">
 <div className="container px-4 md:px-16  relative">
      <div className="lg:my-20">
        <h2 className="text-3xl lg:text-5xl font-medium text-blackColor text-center mb-8">
          Our Popular Accommodation 
        </h2>
        <div className="flex justify-center text-center mx-auto  ">
        {['apartment', 'hotel'].map(tab => (
          <button
            key={tab}
            className={`text-2xl cursor-pointer font-medium px-4 pb-2 transition border-b-[2px] border-[#A5A5AB] ${
              activeTab === tab ? ' border-b-2 border-secondaryColor text-secondaryColor ' : 'text-[#A5A5AB]'
            }`}
            onClick={() => setActiveTab(tab as 'apartment' | 'hotel')}
          >
            {tab}
          </button>
        ))}
      </div>
        <div className="relative">
          {/* Swiper Navigation Buttons */}
       { !loading &&  <button
            onClick={goPrev}
            className="absolute z-10 top-1/2 cursor-pointer -translate-y-1/2 left-0 xl:-left-14 w-10 h-10 rounded-full bg-white/70 border border-gray-300 backdrop-blur-md flex items-center justify-center shadow hover:bg-yellow-400 transition"
          >
            <FaChevronLeft className="text-black text-sm" />
          </button>}
            { !loading && <button
            onClick={goNext}
            className="absolute z-10 top-1/2 cursor-pointer -translate-y-1/2 right-0 xl:-right-14 w-10 h-10 rounded-full bg-white/70 border border-gray-300 backdrop-blur-md flex items-center justify-center shadow hover:bg-yellow-400 transition"
          >
            <FaChevronRight className="text-black text-sm" />
          </button>}
          {/* Swiper Carousel */}
          <Swiper
            slidesPerView={1}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1200:{
                slidesPerView: 3,
              },
              1500: { slidesPerView: 3 },
            }}
            modules={[Autoplay, Navigation, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
            className="w-full"
          >
            {loading ? <Loader/> : packageData.length < 0 ? <div>Package Data Not Found!</div> : packageData.map((tour: any, index) => (
              <SwiperSlide key={index} className=" px-1 md:px-4 py-10">
                <AccommodationCard tour={tour} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
             { !loading &&<Link href="/apartments">
          <CustomButton>View All Apartments</CustomButton>
          </Link>}
        </div>
      </div>
    </div>
    </section>
   
  )
}

export default Accommodation
