
import FilterHeader from "@/components/filter/FilterHeader";

import { toursData } from "@/DemoAPI/toureData";
import TureAllPackage from "@/components/toure/TureAllPackage";



function TourePage() {
 

  return (
    <div className="pb-10 lg:pb-20">
      <FilterHeader title="Tour" data={toursData}/>
      <TureAllPackage/>
    </div>
  );
}

export default TourePage;
