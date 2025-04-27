"use client";

import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { accommodationsData } from "@/DemoAPI/accommodationsData";
import AccommodationCard from "../card/AccommodationCard";
import CustomButton from "../reusable/CustomButton";


function Accommodation() {
      const [currentIndex, setCurrentIndex] = useState(1);
      const swiperRef = useRef<any>(null);
      const [activeTab, setActiveTab] = useState<'Apartments' | 'Hotels'>('Apartments');

  const filteredList = accommodationsData.filter(item => item.category === activeTab);
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
        {['Apartments', 'Hotels'].map(tab => (
          <button
            key={tab}
            className={`text-2xl cursor-pointer font-medium px-4 pb-2 transition border-b-[2px] border-[#A5A5AB] ${
              activeTab === tab ? ' border-b-2 border-secondaryColor text-secondaryColor ' : 'text-[#A5A5AB]'
            }`}
            onClick={() => setActiveTab(tab as 'Apartments' | 'Hotels')}
          >
            {tab}
          </button>
        ))}
      </div>
        <div className="relative">
          {/* Swiper Navigation Buttons */}
          <button
            onClick={goPrev}
            className="absolute z-10 top-1/2 cursor-pointer -translate-y-1/2 left-0 lg:-left-14 w-10 h-10 rounded-full bg-white/70 border border-gray-300 backdrop-blur-md flex items-center justify-center shadow hover:bg-yellow-400 transition"
          >
            <FaChevronLeft className="text-black text-sm" />
          </button>
          <button
            onClick={goNext}
            className="absolute z-10 top-1/2 cursor-pointer -translate-y-1/2 right-0 lg:-right-14 w-10 h-10 rounded-full bg-white/70 border border-gray-300 backdrop-blur-md flex items-center justify-center shadow hover:bg-yellow-400 transition"
          >
            <FaChevronRight className="text-black text-sm" />
          </button>
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
              1024: { slidesPerView: 3 },
              1500: { slidesPerView: 3 },
            }}
            modules={[Autoplay, Navigation, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
            className="w-full"
          >
            {filteredList.map((tour: any, index) => (
              <SwiperSlide key={index} className=" px-4 py-10">
                <AccommodationCard {...tour} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <CustomButton>View All Apartments</CustomButton>
        </div>
      </div>
    </div>
    </section>
   
  )
}

export default Accommodation
