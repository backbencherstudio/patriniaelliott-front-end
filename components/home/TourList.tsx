'use client';

import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { toursData } from '@/DemoAPI/toureData';
import TourCard from '../card/TourCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TourList() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef<any>(null);

  const goNext = () => swiperRef.current?.slideNext();
  const goPrev = () => swiperRef.current?.slidePrev();

  return (
    <section className="container px-4 md:px-16  relative">
      <div className='my-20'>
<h2 className="text-5xl font-medium text-blackColor text-center mb-5">
        Top Travel Packages
      </h2>

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
          {toursData.map((tour:any, index) => (
            <SwiperSlide key={index} className=' px-4 py-10'>
              <TourCard {...tour} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
      
    </section>
  );
}
