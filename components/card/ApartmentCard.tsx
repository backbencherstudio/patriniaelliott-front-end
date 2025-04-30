"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaArrowRight, FaWifi } from "react-icons/fa6";
import { IoBedOutline, IoLocationSharp } from "react-icons/io5";

interface ApartmentCardProps {
  hotel: {
    image: string;
    location: string;
    title: string;
    rating: number;
    price: number;
    tv: boolean;
    bed: number;
    bath: number;
    wifi: boolean;
    cancellation: string;
    breakfast: boolean;
    apartmentSlug: string;
  };
}

const ApartmentCard = ({ hotel }: ApartmentCardProps) => {
  const {
    image,
    location,
    title,
    rating,
    price,
    tv,
    bed,
    bath,
    wifi,
    cancellation,
    apartmentSlug,
    breakfast,
  } = hotel;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden gap-5  lg:grid grid-cols-8 p-4  hover:shadow-xl transition-shadow">
      {/* Left - Hotel Image */}
      <div className=" col-span-3 relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-full object-cover rounded-xl"
        />
        {breakfast && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1  rounded-full">
            Breakfast Included
          </span>
        )}
      </div>

      {/* Right - Hotel Info */}
      <div className=" py-4 col-span-3 flex flex-col justify-between">
        {/* Hotel Details */}
        <div className=" mb-3">
          <div className="flex items-center gap-2 text-sm text-grayColor1">
            <IoLocationSharp size={18} className=" text-grayColor1" />
            <span>{location}</span>
          </div>
          <div className="py-1">
            <Link
              href={`/apartment/${apartmentSlug}`}
              className="text-xl font-semibold text-black mb-2"
            >
              {title}
            </Link>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-headerColor text-sm">{rating}</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
        </div>
        {/* Free Cancellation */}
        <div className="flex items-center gap-2 text-sm text-[#0068EF] border-b pb-2 border-secondaryColor/20">
          Free cancellation{" "}
          <span className="text-xs text-gray-400">({cancellation})</span>
        </div>

        <div className="grid grid-cols-2 gap-4 w-[85%] items-center  text-descriptionColor text-sm mt-4 ">
          <div className="flex items-center gap-1 pr-3 ">
            {tv && (
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
            )}{" "}
            TV
          </div>
          <div className="flex items-center gap-1  ">
            <IoBedOutline className=" text-secondaryColor" size={18} />
            {bed} Bed
          </div>
          <div className="flex items-center gap-1  ">
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
            {bath} Bath
          </div>
          {wifi && (
            <div className="flex items-center gap-1  ">
              <FaWifi size={16} className=" text-secondaryColor" />
              Free WiFi
            </div>
          )}
        </div>
      </div>
      {/* Price and Check Availability */}
      <div className=" flex flex-col justify-between items-center lg:items-end text-end  px-4 py-7 rounded-[12px] h-full col-span-2 bg-[#D6AE29]/20">
        <div>
          <p className="text-sm  text-descriptionColor mb-1">Starting from</p>
          <h5 className="text-[32px] font-semibold text-primaryColor">
            ${price}
          </h5>
          <p className="text-sm text-gray-500">per night</p>
        </div>
        <Link
          href={`/apartment/${apartmentSlug}`}
          className="bg-secondaryColor mt-4 lg:mt-0 font-medium flex justify-center items-center gap-1  py-2 px-3 rounded-full cursor-pointer text-blackColor transition-colors"
        >
          Check Availability <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ApartmentCard;
