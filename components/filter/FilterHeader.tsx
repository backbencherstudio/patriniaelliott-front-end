"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterHeader = ({ data, title }: { data: any[], title: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Optional: exclude non-filter params (like pagination)
    const ignoredParams = ["page"];
    const applied = [...params.entries()].filter(([key, value]) => {
      return !ignoredParams.includes(key) && value.trim() !== "";
    });

    setFilterCount(applied.length);
  }, [searchParams]);

  const handleClearAll = () => {
    router.replace(`${pathname}`, { scroll: false });
  };

  return (
    <div className="items-center mb-4">
      <h4 className="text-xl sm:text-2xl font-semibold text-headerColor">
        {title} found: {data?.length} available {title}
      </h4>

      <div className="flex gap-3 mt-2">

        <>
          <p className="text-sm sm:text-base text-grayColor1">
            {filterCount} {filterCount === 1 ? "Filter" : "Filters"} applied
          </p>
          <button
            onClick={handleClearAll}
            className="text-blueColor text-sm sm:text-base cursor-pointer"
          >
            Clear All
          </button>
        </>

      </div>
    </div>
  );
};

export default FilterHeader;
