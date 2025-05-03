'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"; // Adjust the import if needed
import ToureItinerary from './ToureItinerary';
import TourLocationOnMap from './ToureLocationOnMap ';
import ToureOverview from './ToureOverview';
import TourPolices from './TourPolices';

const ToureTabs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full">
      {/* Tab List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex lg:space-x-8 border border-gray-200 bg-whiteColor shadow-none py-6 w-full lg:px-40">
          <TabsTrigger
            value="overview"
            className={` text-sm lg:text-lg cursor-pointer  relative font-medium ${activeTab === 'overview' ? 'text-secondaryColor  ' : 'border-0 shadow-none text-gray-600'}`}
          >
            Overview
            <span className={`absolute -bottom-5 left-0 w-full h-[3px] ${activeTab === 'overview' ? 'bg-secondaryColor' : 'hidden'}`} />
          <TabsTrigger
            value="policies"
           className={` text-sm lg:text-lg cursor-pointer relative font-medium ${activeTab === 'policies' ? 'text-secondaryColor  ' : 'border-0 shadow-none text-gray-600'}`}
          >
            Policies
            <span className={`absolute -bottom-5 left-0 w-full h-[3px] ${activeTab === 'policies' ? 'bg-secondaryColor' : 'hidden'}`} />
          </TabsTrigger>
          </TabsTrigger>
          <TabsTrigger
            value="Itinerary"
            className={` text-sm lg:text-lg cursor-pointer relative font-medium ${activeTab === 'Itinerary' ? 'text-secondaryColor  ' : 'border-0 shadow-none text-gray-600'}`}
            
          >
            Itinerary
            <span className={`absolute -bottom-5 left-0 w-full h-[3px] ${activeTab === 'Itinerary' ? 'bg-secondaryColor' : 'hidden'}`} />
          </TabsTrigger>
          <TabsTrigger
            value="map"
            className={` text-sm lg:text-lg cursor-pointer relative font-medium ${activeTab === 'map' ? 'text-secondaryColor  ' : 'border-0 shadow-none text-gray-600'}`}
          >
            Map
            <span className={`absolute -bottom-5 left-0 w-full h-[3px] ${activeTab === 'map' ? 'bg-secondaryColor' : 'hidden'}`} />
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className={` text-sm lg:text-lg cursor-pointer relative font-medium ${activeTab === 'reviews' ? 'text-secondaryColor  ' : 'border-0 shadow-none text-gray-600'}`}
          >
            Reviews
            <span className={`absolute -bottom-5 left-0 w-full h-[3px] ${activeTab === 'reviews' ? 'bg-secondaryColor' : 'hidden'}`} />
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="overview" className="pt-10 pb-8">
         <ToureOverview/>
        </TabsContent>
        <TabsContent value="policies" className="pt-10 pb-8">
         <TourPolices/>
        </TabsContent>
        <TabsContent value="Itinerary" className="pt-10 pb-8">
          <ToureItinerary/>
        </TabsContent>
        <TabsContent value="map" className="pt-10 pb-8">
          <TourLocationOnMap/>
        </TabsContent>
        <TabsContent value="reviews" className="pt-10 pb-8">
          <p>Reviews content goes here...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ToureTabs;
