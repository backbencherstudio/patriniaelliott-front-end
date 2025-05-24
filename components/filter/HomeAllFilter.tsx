import BudgetFilter from './BudgetFilter'
import ExtraServiceFilter from './ExtraServiceFilter'
import MealPlanFilter from './MealPlanFilter'
import RatingFilter from './RatingFilter'
import ResidenceFilter from './ResidenceFilter'

function HomeAllFilter() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3   xl:grid-cols-4 gap-6'>
       <div>
       <div>
         <BudgetFilter/>
      </div>

      <div>
        <RatingFilter/>
      </div>
       </div>
       <ResidenceFilter/>
       <ExtraServiceFilter/>
       <MealPlanFilter/>

    </div>
  )
}

export default HomeAllFilter
