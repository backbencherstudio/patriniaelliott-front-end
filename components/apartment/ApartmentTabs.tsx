'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"; // Adjust the import if needed
import HighLight from './HighLight';
import LocationOnMap from './LocationOnMap ';
import Overview from './Overview';
import PolicyDetails from './PolicyDetails';

const ApatmentTabs = ({ singleApartment }: any) => {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'highlights', label: 'Highlights' },
    { key: 'map', label: 'Map' },
    { key: 'policies', label: 'Policies' },
  ];

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex lg:space-x-8 border border-gray-200 bg-whiteColor shadow-none py-6 w-full lg:px-40">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.key}
              value={t.key}
              className={` text-sm lg:text-lg cursor-pointer relative font-medium ${
                activeTab === t.key ? 'text-secondaryColor' : 'border-0 shadow-none text-gray-600'
              }`}
            >
              {t.label}
              <span
                className={`absolute -bottom-5 left-0 w-full h-[3px] ${
                  activeTab === t.key ? 'bg-secondaryColor' : 'hidden'
                }`}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="overview" className="pt-10 pb-8">
          <Overview overview={singleApartment} />
        </TabsContent>
        <TabsContent value="highlights" className="pt-10 pb-8">
          <HighLight aminate={singleApartment?.amenities} bedroom={singleApartment?.bathrooms}/>
        </TabsContent>
        <TabsContent value="map" className="pt-10 pb-8">
          <LocationOnMap />
        </TabsContent>
        <TabsContent value="policies" className="pt-10 pb-8">
          <PolicyDetails vendorPackage={singleApartment} />
        </TabsContent>
     
      </Tabs>
    </div>
  );
};

export default ApatmentTabs;
