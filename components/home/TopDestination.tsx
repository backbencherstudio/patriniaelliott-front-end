"use client"

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import CustomImage from "../reusable/CustomImage";

function TopDestination() {
       const [currentIndex, setCurrentIndex] = useState(1);
       const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());
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

  const getSlideSrc = (src: string | null | undefined, index: number) => {
    if (!src || src === "null" || src === "undefined") return "/empty.png";
    return failedIndices.has(index) ? "/empty.png" : src;
  };

  const handleImageError = (index: number) => {
    setFailedIndices(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

      const swiperRef = useRef<any>(null);
    
      const goNext = () => swiperRef.current?.slideNext();
      const goPrev = () => swiperRef.current?.slidePrev();
  return (
    <section className=' container '>
        <div className="mt-24 mb-20">
        
        <h2 className=' text-3xl lg:text-5xl font-medium text-blackColor text-center'>Top Destinations</h2>
        <div className=" relative">
           <div >
          <div className="container justify-center lg:justify-between  flex gap-15">
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
        {loading ? (
          <div className="flex gap-6 justify-center items-center px-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton className="w-[180px] h-[180px] rounded-full" />
                <div className="mt-4 text-center">
                  <Skeleton className="w-24 h-6 mx-auto mb-2" />
                  <Skeleton className="w-20 h-4 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
             slidesPerView: 3,
          },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
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
              <Link href={`/toure/${des?.package_id}`}>
              <div className=" w-full flex justify-center flex-col items-center ">
                <div className=" xl:w-[190px] lg:w-[170px] lg:h-[170px] h-[120px] md:w-[156px] md:h-[156px] w-[120px] xl:h-[190px] rounded-full overflow-hidden">
                <CustomImage
                    src={getSlideSrc(des?.img, index)}
                    alt={`des ${index + 1}`}
                    loading="lazy"
                    width={220}
                    height={220}
                    onError={() => handleImageError(index)}
                    className=" !w-full !h-full hover:scale-110 transition-all duration-300 rounded-full object-cover"
                  />
                </div>
                <div className=" text-center mt-4">
                  <h3 className=" text-lg md:text-2xl font-medium ">{des?.country}</h3>
                  <p className="text-sm md:text-base text-descriptionColor leading-[150%] ">{des?.count} Times Tour</p>
                </div>
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        )}
        </div>
        
        </div>


        </div>
      
    </section>
  )
}

export default TopDestination
