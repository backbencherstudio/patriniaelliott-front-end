import ToureTabs from "@/components/toure/ToureTabs";
import { toursData } from "@/DemoAPI/toureData";
import { UserService } from "@/service/user/user.service";

import { ChevronRight } from "lucide-react";
import { cookies } from "next/headers";

async function HotelDetailsPage(props: {
  params: Promise<{ tourSlug: string }>;
}) {
  const params = await props.params;
  const { tourSlug } = params;
  const singleHotel: any = toursData.find(
    (item: any) => item?.tourSlug == tourSlug
  );
  const tokenStore = await cookies();
  const token = tokenStore.get("tourAccessToken")?.value;

  // Fetch server-side without causing side effects during render
  let vendorPackage: any = {};
  try {
    const res = await UserService.getData(`/admin/vendor-package/${tourSlug}`, token);
    vendorPackage = res?.data?.data ?? {};
  } catch (error) {
    console.log(error);

  }
const singletour = vendorPackage ? vendorPackage : {}
console.log(singletour);
console.log(singletour?.package_files);

  return (
    <div>
      <div className=" container">
        <div className="py-10">
          <span className="flex items-center gap-2 ">
            {" "}
            Home <ChevronRight className="w-4 h-4 text-[#737373]" /> Toure{" "}
            <ChevronRight className="w-4 h-4 text-[#737373]" /> Toure
            details
          </span>
        </div>
        <div>
          {/* <ToureHeader singleApartment={singleHotel} /> */}
        </div>
        {/* <TourImage vendorPackage={vendorPackage}/> */}
        <div className="lg:grid grid-cols-6 gap-8 pb-20">
          <div className=" col-span-4 ">
            <ToureTabs />
          </div>
          <div className=" col-span-2">
            {/* <ToureBookingForm singlToureDetails={singleHotel} /> */}
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default HotelDetailsPage;
