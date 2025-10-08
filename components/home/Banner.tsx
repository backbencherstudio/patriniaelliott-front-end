'use client';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

 // adjust this path as needed
import { heroSlides } from '@/DemoAPI/heroSlide';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import AllSearch from './AllSearch';

export default function Banner() {
     const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef<any>(null);

  const goNext = () => swiperRef.current?.slideNext();
  const goPrev = () => swiperRef.current?.slidePrev();
  return (
     <section className=''>
      <div className="relative w-full">
        {/* Desktop Navigation */}
        <div className="">
          <div className="container  flex justify-between">
            <button onClick={goPrev}>
              <div className="absolute top-[50%] -translate-1/2 z-10 left-10 lg:left-50 flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-white/20 border border-white backdrop-blur-[5px]">
                <FaChevronLeft className="text-white" />
              </div>
            </button>
            <button onClick={goNext}>
              <div className="absolute top-[50%] -translate-1/2 right-0 lg:right-50 z-10 flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-white/20 border border-white backdrop-blur-[5px]">
                <FaChevronRight className="text-white" />
              </div>
            </button>
          </div>
        </div>

        <Swiper
          slidesPerView={1}
          loop={true}
          speed={1500}
          autoplay={{
            delay: 30000000,
            disableOnInteraction: false,
          }}
        
          modules={[Navigation, Autoplay, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
          className="w-full"
        >
          {heroSlides.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full">
                <Image
                  src={banner.imageUrl}
                  alt={`Banner ${index + 1}`}
                  width={1920}
                  height={700}
                  className="w-full h-[500px] md:h-[450px] lg:h-[500px] xl:h-auto object-cover"
                />
                <div className="absolute inset-0 " />
                <div className="absolute inset-0 z-30 flex justify-center text-center items-center px-5 md:px-10 lg:px-20 text-white container">
                  <div className="max-w-3xl">
                    <h1 className="text-4xl  md:text-[42px]  md:pr-48 lg:pr-0 lg:text-[60px] text-white font-bold leading-[126%] ">
                      {banner.title}
                    </h1>
                    <p className="mt-6 text-base leading-[150%] text-white ">
                      {banner.subtitle}
                    </p>
                 
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile Pagination Dots */}
       <div className=' absolute bottom-12 left-1/2 -translate-x-1/2 z-40'>
           <AllSearch/>
       </div>
      </div>

 
    </section>
  );
}
