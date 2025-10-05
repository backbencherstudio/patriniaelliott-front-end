'use client';

import BudgetFilter from './BudgetFilter';
import DateFilter from './DateFilter';
import DestinationSearch from './DestinationSearch';
import FreeCancellationFilter from './FreeCancellationChange';
import PopularAreaFilter from './PopularAreaFilter';
import PopularDestinationFilter from './PopularDestinationFilter';
import RatingFilter from './RatingFilter';

export default function FilterSidebar({toure}:any) {

  return (
    <div className="w-full   space-y-6  bg-white mb-30 rounded-xl">
      <div className="overflow-hidden rounded-lg shadow-md">
        <iframe
          className="w-full h-40"
          src="https://maps.google.com/maps?q=New+York&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className="w-full p-4  space-y-3 shadow-xl bg-white  rounded-xl">
      <div className=' '>
        <DestinationSearch/>
      </div>

      <div>
         <DateFilter/>
      </div>

      <div>
         <BudgetFilter/>
      </div>

      <div>
        <RatingFilter/>
      </div>

      <div>
        <FreeCancellationFilter/>
      </div>

      <div>
     {   <PopularDestinationFilter/>} 
      </div>

      {/* <div>
      { !toure &&   <ResidenceFilter/>}
      </div> */}

      {/* <div>
         <MealPlanFilter/>
      </div> */}

      <div>
        { !toure &&  <PopularAreaFilter/>}
      </div>
</div>
      
    </div>
  );
}
