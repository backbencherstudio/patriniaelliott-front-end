
import FilterSidebar from "@/components/filter/Sidebar";
import Pathname from "@/components/reusable/Pathname";

import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
export default function ApartmentHotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <div>
      <div className=" container grid grid-cols-12 gap-8">
        <div className="col-span-12">
          <Pathname/>
        </div>
        <div className=" col-span-3">
          <FilterSidebar />
        </div>

        <div className=" col-span-9">{children}</div>
      </div>
    </div>
  );
}
