"use client"

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function TopDestination() {
       const [currentIndex, setCurrentIndex] = useState(1);
       const [loading, setLoading]=useState(true);
       const [error, setError]=useState(null);
       const [data, setData]=useState(null);
       const endpoint = `/application/packages/top-destinations?limit=${10}&page=${1}`
      const {token} = useToken()
      
       const fetchData = async()=>{
        setLoading(true)
        try {
          const response = await UserService.getData(endpoint,token)
          setData(response.data.data)
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
       }

         useEffect(()=>{
        fetchData()
       },[endpoint])

       console.log(data,"data");
       
      const swiperRef = useRef<any>(null);
    
      const goNext = () => swiperRef.current?.slideNext();
      const goPrev = () => swiperRef.current?.slidePrev();
  return (
    <section className=' container '>
        <div className="mt-24 mb-20">
        
        <h2 className=' text-3xl lg:text-5xl font-medium text-blackColor text-center'>Top Destinations</h2>
        <div className=" relative">
           <div >
          <div className="container justify-center md:justify-between  flex gap-15">
            <button onClick={goPrev}>
              <div className="absolute -bottom-20  lg:top-[50%] -translate-1/2 z-10 xl:-left-10 flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-white/20 border border-secondaryColor backdrop-blur-[5px] hover:bg-secondaryColor  shadow shadow-stone-300 transition-all">
                <FaChevronLeft className="text-blackColor" />
              </div>
            </button>
            <button onClick={goNext}>
              <div className="absolute lg:top-[50%] -bottom-20 -translate-1/2 xl:-right-20 z-10 flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-white/20 border border-secondaryColor hover:bg-secondaryColor  shadow shadow-stone-300 transition-all backdrop-blur-[5px]">
                <FaChevronRight className="text-blackColor " />
              </div>
            </button>
          </div>
        </div>
          <div className=" mt-12">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
         breakpoints={{
          0:{
             slidesPerView: 2,
          },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
              
              1500:{
                slidesPerView:6
              }
            }}
          modules={[Navigation, Autoplay, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
          className="w-full"
        >
          {data?.map((des, index) => (
            <SwiperSlide key={index}>
              <div className=" w-full ">
                <div className=" w-full h-full rounded-full overflow-hidden">
                <Image
                  src={des?.image || "/empty.png"}
                  alt={`des ${index + 1}`}
                  width={220}
                  height={220}
                  className="w-full h-full hover:scale-110 transition-all duration-300 overflow-hidden rounded-full object-cover"
                />
                </div>
                <div className=" text-center mt-4">
                    <h3 className=" text-2xl font-medium ">{des?.country}</h3>
                    <p className="text-base text-descriptionColor leading-[150%] ">{des?.count} Times Tour</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        
        </div>


        </div>
      
    </section>
  )
}

export default TopDestination
