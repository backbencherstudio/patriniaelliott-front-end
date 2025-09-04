import BudgetFilter from './BudgetFilter'
import ExtraServiceFilter from './ExtraServiceFilter'
import MealPlanFilter from './MealPlanFilter'
import RatingFilter from './RatingFilter'

function HomeAllFilter() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3   xl:grid-cols-4 gap-6'>
         <BudgetFilter/>
        <RatingFilter/>
       {/* <ResidenceFilter/> */}
       <ExtraServiceFilter/>
       <MealPlanFilter/>

    </div>
  )
}

export default HomeAllFilter
