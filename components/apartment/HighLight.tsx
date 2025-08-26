"use client"
import { featuresData } from "@/DemoAPI/featureData";
import icon7 from "@/public/icon/ac.svg";
import bar from "@/public/icon/bar.svg";
import icon2 from "@/public/icon/bed.svg";
import icon9 from "@/public/icon/car.svg";
import icon5 from "@/public/icon/fitness.svg";
import heating from "@/public/icon/heater.svg";
import kitchen from "@/public/icon/kitchen.svg";
import laundry from "@/public/icon/laundry.svg";
import icon3 from "@/public/icon/pool.svg";
import private_beach from "@/public/icon/private_beach.svg";
import icon6 from "@/public/icon/proparty.svg";
import sauna from "@/public/icon/sauna.svg";
import icon10 from "@/public/icon/service.svg";
import icon1 from "@/public/icon/tv.svg";
import icon4 from "@/public/icon/wifi.svg";
import Image from "next/image";
import { useState } from "react";

function HighLight({ aminate }) {

  return (
    <div>
      <h3 className="text-2xl lg:text-[32px] font-medium text-blackColor leading-[126%]">
        Highlights
      </h3>
      <div className="grid grid-cols-3 gap-6 my-8">


        {
          aminate?.entertainment?.flat_screen_tv && <div className=" flex items-center gap-4">
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
          aminate?.general?.wifi && <div className=" flex items-center gap-4">
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
          aminate?.general?.wifi && <div className=" flex items-center gap-4">
            <Image
              src={heating}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Heating</p>
          </div>
        }
        {
          aminate?.general?.air_conditioning &&
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
          aminate?.general?.room_service &&
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
          aminate?.general?.private_beach &&
          <div className=" flex items-center gap-4">
            <Image
              src={private_beach}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Private Beach</p>
          </div>
        }
        {
          aminate?.general?.minibar &&
          <div className=" flex items-center gap-4">
            <Image
              src={bar}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">minibar</p>
          </div>
        }
        {
          aminate?.entertainment?.swimming_pool &&
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
          aminate?.general?.parking &&
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
          aminate?.cooking_cleaning?.washing_machine &&
          <div className=" flex items-center gap-4">
            <Image
              src={laundry}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Washing Machine</p>
          </div>
        }
        {
          aminate?.entertainment?.sauna &&
          <div className=" flex items-center gap-4">
            <Image
              src={sauna}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Kitchen</p>
          </div>
        }
        {
          aminate?.cooking_cleaning?.kitchen &&
          <div className=" flex items-center gap-4">
            <Image
              src={kitchen}
              alt="icon1"
              width={26}
              height={26}
              className=""
            />
            <p className=" text-base text-descriptionColor">Kitchen</p>
          </div>
        }
        {
          aminate?.general?.restaurant && <div className=" flex items-center gap-4">
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
          aminate?.general?.spa &&
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
