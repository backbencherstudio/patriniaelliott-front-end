'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdDone } from 'react-icons/md';
import FilterHeading from './FilterHeading';

const mealPlans = [
  'Breakfast Included',
  'All Inclusive',
  'Dinner included',
  'Lunch included',
];

const MealPlanFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedMealPlans, setSelectedMealPlans] = useState<string[]>([]);

  useEffect(() => {
    const param = searchParams.get('mealPlans');
    if (param) {
      setSelectedMealPlans(param.split(','));
    }
  }, []);

  const updateSearchParams = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length) {
      params.set('mealPlans', values.join(','));
    } else {
      params.delete('mealPlans');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleToggle = (mealPlan: string) => {
    const updated = selectedMealPlans.includes(mealPlan)
      ? selectedMealPlans.filter((item) => item !== mealPlan)
      : [...selectedMealPlans, mealPlan];

    setSelectedMealPlans(updated);
    updateSearchParams(updated);
  };

  const handleReset = () => {
    setSelectedMealPlans([]);
    updateSearchParams([]);
  };

  return (
    <div className="pb-4">
      <FilterHeading onReset={handleReset} title="Meal plans available" />

      <div className="mt-4 space-y-3">
        {mealPlans.map((mealPlan, idx) => {
          const isChecked = selectedMealPlans.includes(mealPlan);
          return (
            <label key={idx} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(mealPlan)}
                className="peer hidden"
              />
              <div
                className={`h-4 w-4 flex items-center justify-center border-2 rounded-xs
                  ${isChecked ? 'bg-checkBoxColor border-checkBoxColor' : 'border-grayColor1/20'}
                  transition-colors`}
              >
                {isChecked && <MdDone className="text-white text-base" />}
              </div>
              <span className="text-base text-grayColor1">{mealPlan}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanFilter;
