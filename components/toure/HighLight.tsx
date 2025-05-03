"use client"
import { featuresData } from "@/DemoAPI/featureData";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function HighLight() {
    const [data,setData]=useState(12)
    const [isShow, setIsShow]= useState()
    const feture= featuresData.slice(0,data )
  return (
    <div>
      <h3 className="text-2xl lg:text-[32px] font-medium text-blackColor leading-[126%]">
        Highlights
      </h3>
      <div className="grid grid-cols-3 gap-6 my-8">
        {featuresData.length > 0 ? (
          feture.map((item) => (
            <div className=" flex items-center gap-4">
              <Image
                src={item.icon}
                alt={item.name}
                width={26}
                height={26}
                className=""
              />
              <p className=" text-base text-descriptionColor">{item.name}</p>
            </div>
          ))
        ) : (
          <p> Not found HighLight item</p>
        )}
      </div>
      <div>
        <button onClick={()=>setData(featuresData.length)} className="flex items-center text-lg text-blueColor underline cursor-pointer ">See all property amenities <ChevronRight /></button>
      </div>
    </div>
  );
}

export default HighLight;
