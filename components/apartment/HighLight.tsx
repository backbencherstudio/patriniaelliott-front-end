"use client"
import { featuresData } from "@/DemoAPI/featureData";
import icon7 from "@/public/icon/ac.svg";
import icon2 from "@/public/icon/bed.svg";
import icon9 from "@/public/icon/car.svg";
import icon5 from "@/public/icon/fitness.svg";
import icon11 from "@/public/icon/kitchen.svg";
import icon3 from "@/public/icon/pool.svg";
import icon6 from "@/public/icon/proparty.svg";
import icon10 from "@/public/icon/service.svg";
import icon1 from "@/public/icon/tv.svg";
import icon4 from "@/public/icon/wifi.svg";
import Image from "next/image";
import { useState } from "react";

function HighLight({ aminate }) {
  const [data, setData] = useState(12)
  const [isShow, setIsShow] = useState()
  const feture = featuresData.slice(0, data)
  return (
    <div>
      <h3 className="text-2xl lg:text-[32px] font-medium text-blackColor leading-[126%]">
        Highlights
      </h3>
      <div className="grid grid-cols-3 gap-6 my-8">


        {
          aminate?.TV && <div className=" flex items-center gap-4">
            <Image
              src={icon1}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">TV/ Entertainment</p>
          </div>
        }
        <div className=" flex items-center gap-4">
          <Image
            src={icon2}
            alt="icon1"
            width={26}
            height={26}
            className=""
          />
          <p className=" text-base text-descriptionColor">3 Bedrooms</p>
        </div>
        {
          aminate?.wifi && <div className=" flex items-center gap-4">
            <Image
              src={icon4}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Free Wifi</p>
          </div>
        }
        {
          aminate?.air_conditioning &&
          <div className=" flex items-center gap-4">
            <Image
              src={icon7}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Air Conditioner</p>
          </div>
        }
        {
          aminate?.room_service &&
          <div className=" flex items-center gap-4">
            <Image
              src={icon10}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Room Service</p>
          </div>
        }
        {
          aminate?.private_beach &&
          <div className=" flex items-center gap-4">
            <Image
              src={icon11}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Private Beach</p>
          </div>
        }
        {
          aminate?.swimming_pool &&
          <div className=" flex items-center gap-4">
            <Image
              src={icon3}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Swimming Pool</p>
          </div>
        }
        {
          aminate?.parking &&
          <div className=" flex items-center gap-4">
            <Image
              src={icon9}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Parking</p>
          </div>
        }
        {
          aminate?.restaurant && <div className=" flex items-center gap-4">
            <Image
              src={icon6}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Restaurant</p>
          </div>}
        {
          aminate?.spa &&
          <div className=" flex items-center gap-4">
            <Image
              src={icon5}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">SPA</p>
          </div>
        }
      </div>
      {/* <div>
        <button onClick={() => setData(featuresData.length)} className="flex items-center text-lg text-blueColor underline cursor-pointer ">See all property amenities <ChevronRight /></button>
      </div> */}
    </div>
  );
}

export default HighLight;
