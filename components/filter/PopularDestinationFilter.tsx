"use client";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import FilterHeading from "./FilterHeading";

const destinations = ["Indonesia", "Bali", "Dubai", "Japan", "Italy", "Paris"];

const PopularDestinationFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
    const [loading, setLoading]=useState(true);
       const [error, setError]=useState(null);
       const [data, setData]=useState(null);
      const endpoint = `/application/packages/top-destinations?limit=${10}&page=${1}`
      const {token} = useToken()
      const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
       const fetchData = async()=>{
        setLoading(true)
        try {
          const response = await UserService.getData(endpoint,token)
          setData(response.data.data)
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
       }

         useEffect(()=>{
        fetchData()
       },[endpoint])
  

  useEffect(() => {
    const param = searchParams.get("destinations");
    if (param) {
      setSelectedDestinations(param.split(","));
    }
  }, []);

  const updateSearchParams = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length) {
      params.set("destinations", values.join(","));
    } else {
      params.delete("destinations");
    }

    // ✅ Prevent scroll-to-top here
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleToggle = (country: string) => {
    const updated = selectedDestinations.includes(country)
      ? selectedDestinations.filter((item) => item !== country)
      : [...selectedDestinations, country];

    setSelectedDestinations(updated);
    updateSearchParams(updated);
  };

  const handleReset = () => {
    setSelectedDestinations([]);
    updateSearchParams([]);
  };

  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1" className=" border-b-0">
        <AccordionTrigger className="border-b pb-3 items-center rounded-none border-grayColor1/20">
          <div className=" w-[95%]">
            <FilterHeading onReset={handleReset} title="Popular Destination" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4 border-b-0 space-y-4">
          <div className="mt-4 space-y-3">
            {data?.map((country, idx) => {
              const isChecked = selectedDestinations.includes(country?.country);
              return (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggle(country?.country)}
                    className="peer hidden"
                  />
                  <div
                    className={`h-4 w-4 flex items-center justify-center border-2 rounded-xs
                ${
                  isChecked
                    ? "bg-checkBoxColor border-checkBoxColor"
                    : "border-grayColor1/20"
                }
                transition-colors`}
                  >
                    {isChecked && <MdDone className="text-white text-base" />}
                  </div>
                  <span className="text-base text-grayColor1">{country?.country}</span>
                </label>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PopularDestinationFilter;
