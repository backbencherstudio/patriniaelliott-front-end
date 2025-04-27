"use client";
import FilterSidebar from "@/components/filter/Sidebar";
import { ChevronRight, Link } from "lucide-react";
import { usePathname } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
export default function ApartmentHotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const sPath = pathname.split("/").filter(Boolean);

  return (
    <div>
      <div className=" container grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="flex flex-wrap mt-15 items-center gap-2 text-base text-gray-600">
            <span className="flex items-center gap-2 ">
              {" "}
              Home <ChevronRight className="w-4 h-4 text-[#737373]" />
            </span>

            {sPath.map((path, index) => {
              const fullPath = "/" + sPath.slice(0, index + 1).join("/");
              const isLast = index === sPath.length - 1;

              return (
                <div key={index} className="flex items-center gap-1">
                  {!isLast ? (
                    <>
                      <Link href={fullPath} className=" capitalize">
                        {path}
                      </Link>
                      <ChevronRight className="w-4 h-4 text-[#737373]" />
                    </>
                  ) : (
                    <span className="capitalize text-headerColor font-medium">
                      {path.split("-").join(" ")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className=" col-span-3">
          <FilterSidebar />
        </div>

        <div className=" col-span-9">{children}</div>
      </div>
    </div>
  );
}
