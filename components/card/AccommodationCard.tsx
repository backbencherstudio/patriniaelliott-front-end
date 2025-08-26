"use client";

import { Package } from "@/types/index";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaArrowRight, FaWifi } from "react-icons/fa6";
import { IoBedOutline, IoLocationSharp } from "react-icons/io5";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";


export default function AccommodationCard({ tour }: { tour: Package }) {
  const { id, name, type, reviews, roomFiles, amenities, bedrooms, bathrooms, cancellation_policy, breakfast_available, price, address, rating_summary } = tour
 

  return (
    <div className="bg-white shadow-lg hover:-mt-2  transition-all duration-200 rounded-2xl hover:shadow-xl group overflow-hidden w-full">
      <div className="relative ">
        <div className=" p-3 ">
          {
            roomFiles?.length >= 2 ?
              <Swiper
                slidesPerView={1}
                loop={true}
                speed={1000}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}

                modules={[Autoplay, Navigation, Pagination]}
                pagination={{
                  clickable: true,
                  bulletClass: 'hero-bullet',
                  bulletActiveClass: 'hero-bullet-active',
                }}>
                {
                  roomFiles?.slice(0, 4).map((file: any, index: number) => (
                    <SwiperSlide key={index} className="w-full lg:!h-[240px] !rounded-lg !h-[200px] overflow-hidden ">
                      <Image
                        src={file}
                        alt={name}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300 !rounded-lg "
                      />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              :
              <div className="lg:!h-[240px] !rounded-lg !h-[200px] overflow-hidden  w-full">
                <Image
                  src={"/Accommodation/a1.png"}
                  alt={name}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300 !rounded-lg "
                />
              </div>
          }
        </div>
        {breakfast_available && <span className="absolute top-6 left-6 bg-redColor text-white text-xs px-3 py-1 rounded-full font-semibold z-10">
          Breakfast Included
        </span>}
      </div>
      <div className="p-4 space-y-1">
        <div className="flex items-center gap-2 text-sm text-grayColor1">
          <IoLocationSharp size={18} className=" text-grayColor1" />
          <span>{address}</span>
        </div>
        <Link href={`${type === "apartment" ? "/apartment" : "/hotel"}/${id}`} className="font-medium text-[22px] text-blackColor">{name}</Link>

        <div className="flex items-center gap-2 text-sm text-seborder-secondaryColor">
          <span className="text-gray-800">{Number(rating_summary?.averageRating ?? 0).toFixed(1)}</span>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={i < Math.round(rating_summary?.averageRating) ? 'text-yellow-400' : 'text-[#A7B6CC]'} />
          ))}

        </div>

        <div className="flex items-center gap-2 text-sm text-[#0068EF]">
          Free cancellation{""}
          <span className="text-xs text-gray-400">(Cancel within 24h)</span>
        </div>

        <div className="flex items-center  text-descriptionColor text-sm mt-4 mb-5">
          {amenities?.entertainment?.flat_screen_tv
 && <div className="flex items-center gap-1 pr-3 border-r border-[#D2D2D5]">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M16.2 2H1.8C1.32261 2 0.864773 2.20108 0.527208 2.55901C0.189642 2.91694 0 3.4024 0 3.90859V12.1791C0 12.6853 0.189642 13.1708 0.527208 13.5287C0.864773 13.8866 1.32261 14.0877 1.8 14.0877H3.348L2.574 14.9084C2.51776 14.9676 2.47313 15.0379 2.44267 15.1154C2.4122 15.193 2.39652 15.2761 2.39652 15.3601C2.39652 15.4441 2.4122 15.5273 2.44267 15.6048C2.47313 15.6823 2.51776 15.7527 2.574 15.8118C2.63006 15.8708 2.69655 15.9174 2.76966 15.9491C2.84276 15.9807 2.92104 15.9968 3 15.9963C3.07896 15.9968 3.15724 15.9807 3.23034 15.9491C3.30345 15.9174 3.36994 15.8708 3.426 15.8118L5.058 14.0877H12.942L14.574 15.8118C14.6298 15.8714 14.6961 15.9188 14.7693 15.9511C14.8424 15.9834 14.9208 16 15 16C15.0792 16 15.1576 15.9834 15.2307 15.9511C15.3039 15.9188 15.3702 15.8714 15.426 15.8118C15.4822 15.7527 15.5269 15.6823 15.5573 15.6048C15.5878 15.5273 15.6035 15.4441 15.6035 15.3601C15.6035 15.2761 15.5878 15.193 15.5573 15.1154C15.5269 15.0379 15.4822 14.9676 15.426 14.9084L14.652 14.0877H16.2C16.6774 14.0877 17.1352 13.8866 17.4728 13.5287C17.8104 13.1708 18 12.6853 18 12.1791V3.90859C18 3.4024 17.8104 2.91694 17.4728 2.55901C17.1352 2.20108 16.6774 2 16.2 2ZM16.8 12.1791C16.8 12.3479 16.7368 12.5097 16.6243 12.629C16.5117 12.7483 16.3591 12.8153 16.2 12.8153H1.8C1.64087 12.8153 1.48826 12.7483 1.37574 12.629C1.26321 12.5097 1.2 12.3479 1.2 12.1791V3.90859C1.2 3.73986 1.26321 3.57804 1.37574 3.45873C1.48826 3.33942 1.64087 3.27239 1.8 3.27239H16.2C16.3591 3.27239 16.5117 3.33942 16.6243 3.45873C16.7368 3.57804 16.8 3.73986 16.8 3.90859V12.1791Z"
                fill="#D6AE29"
              />
            </svg>
            TV
          </div>
          }
          {
            bedrooms &&
            <div className="flex items-center gap-1 px-3 border-r border-[#D2D2D5]">
              <IoBedOutline className=" text-secondaryColor" size={18} />
              {bedrooms} Bed
            </div>
          }
          <div className="flex items-center gap-1 px-3 border-r border-[#D2D2D5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clip-path="url(#clip0_5471_6109)">
                <path
                  d="M8.71184 3.28863L8.86617 2.21929C8.95554 1.60009 8.6412 0.992609 8.08415 0.707922C7.36483 0.340282 6.48369 0.62539 6.11605 1.3447L3.68359 5.48745V9.96289"
                  stroke="#D6AE29"
                  stroke-width="1.05271"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.8885 16.3994L15.583 17.4521M5.17755 16.3994L4.48308 17.4521M2.33444 3.68441L1.58997 2.93994M1.57628 5.41759H0.523438M6.45333 5.2933L10.0645 5.98387L10.1695 5.43475C10.3602 4.43756 9.70636 3.47458 8.70917 3.2839C7.71198 3.09322 6.749 3.74702 6.55832 4.74421L6.45333 5.2933ZM17.4707 9.96293H2.59534V12.4029C2.80774 12.4029 2.97993 12.575 2.97993 12.7874V14.0751C2.97993 15.3588 4.02053 16.3994 5.30419 16.3994H14.7619C16.0456 16.3994 17.0862 15.3588 17.0862 14.0751V12.7874C17.0862 12.575 17.2584 12.4029 17.4708 12.4029V9.96293H17.4707Z"
                  stroke="#D6AE29"
                  stroke-width="1.05271"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_5471_6109">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {bathrooms} Bath
          </div>
          {amenities?.general?.wifi && (
            <div className="flex items-center gap-1 px-3 ">
              <FaWifi size={16} className=" text-secondaryColor" />
              Free WiFi
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t">
          <div>
            <p className="text-descriptionColor text-sm">Starting From</p>
            <p className="text-xl font-medium capitalize leading-[150%] mt-[1px] text-primaryColor">
              ${price}/night
            </p>
          </div>
          <Link href={`${type === "apartment" ? "/apartment" : "/hotel"}/${id}`} className="text-sm flex items-center gap-1 lg:gap-3 font-medium border border-secondaryColor text-secondaryColor px-2 lg:px-4 py-1 lg:py-2 rounded-full hover:bg-secondaryColor cursor-pointer hover:text-blackColor transition">
            Check Availability <FaArrowRight />

          </Link>
        </div>
      </div>
      <style jsx global>{` 
        

        .hero-bullet-active {
          position: relative;
          // transform: scale(1.1);
          }
         
      `}</style>
    </div>
  );
}
