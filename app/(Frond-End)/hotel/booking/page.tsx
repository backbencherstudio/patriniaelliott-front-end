"use client";

import BookingSummary from "@/components/payment/BookingSummary";
import StepOne from "@/components/payment/StepOne";
import StepTwo from "@/components/payment/StepTwo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

function Page() {
      const [activeTab, setActiveTab] = useState('step1');
      console.log(activeTab);
      
  return (
    <div className="py-12 lg:py-20">
      <div className="container grid grid-cols-12 gap-7">
        <div className="col-span-12">
          <span className="flex flex-wrap items-center text-grayColor1 gap-2">
            Home <ChevronRight className="w-4 h-4 text-[#737373]" /> Apartment{" "}
            <ChevronRight className="w-4 h-4 text-[#737373]" /> Apartment
            details <ChevronRight className="w-4 h-4 text-[#737373]" /> <span className=" text-headerColor">Booking</span> 
          </span>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <Tabs value={activeTab} onValueChange={setActiveTab} className=" ">
            <TabsList className="flex gap-3 lg:space-x-2 border-b border-grayColor1/20 rounded-none   bg-whiteColor shadow-none pb-3 max-w-[250px] ">
              <TabsTrigger
                value="step1"
                 className={`px-0 text-sm lg:text-lg  cursor-pointer  relative font-medium ${activeTab === 'step1' ? 'text-secondaryColor  ' : 'border-0 shadow-none text-gray-600'}`}
              >
                First Step
                  <span className={`absolute -bottom-[13px] left-0 w-full h-[2px] ${activeTab === 'step1' ? 'bg-secondaryColor' : 'hidden'}`} />
              </TabsTrigger>
              <TabsTrigger
                value="step2"
                className={` px-0 text-sm lg:text-lg cursor-pointer  relative font-medium ${activeTab === 'step2' ? 'text-secondaryColor  ' : 'border-0 shadow-none text-gray-600'}`}
              >
                Second Step
                 <span className={`absolute -bottom-[13px] left-0 w-full h-[2px] ${activeTab === 'step2' ? 'bg-secondaryColor' : 'hidden'}`} />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step1">
              <StepOne  />
            </TabsContent>
            <TabsContent value="step2">
              <StepTwo />
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <BookingSummary activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>
      </div>
    </div>
  );
}

export default Page;
