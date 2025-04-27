'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import TourSearch from './TourSearch';

export default function AllSearch() {
  const [tab, setTab] = useState('tour');
  return (
    <div className="  rounded-t-md  flex flex-col md:flex-row items-center ">
      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="w-full relative gap-0 p-0  md:w-auto">
        <TabsList className='p-0  rounded-t-2xl '> 
          <TabsTrigger className={`${tab =="tour" ? "!bg-secondaryColor": "!bg-whiteColor"} data-[state=active]:shadow-none text-base px-9 py-6 rounded-tl-2xl rounded-tr-none rounded-b-none`} value="tour">Tour</TabsTrigger>
          <TabsTrigger className={`${tab =="apartment" ? "!bg-secondaryColor": "!bg-whiteColor"} data-[state=active]:shadow-none text-base px-9 py-6 rounded-none`} value="apartment">Apartment</TabsTrigger>
          <TabsTrigger className={`${tab =="hotel" ? "!bg-secondaryColor": "!bg-whiteColor"} data-[state=active]:shadow-none text-base px-9 py-6 rounded-tr-2xl rounded-tl-none rounded-b-none `} value="hotel">Hotel</TabsTrigger>
        </TabsList>
        <TabsContent value='tour'>
            <div className=' absolute top-[100%] lg:-bottom-24   left-1/2 w-auto  -translate-x-1/2'>

             <TourSearch/>
            </div>
            </TabsContent> 
      </Tabs>

   
    </div>
  );
}
