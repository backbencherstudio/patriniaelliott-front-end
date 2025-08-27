import ApartmentHeader from "@/components/apartment/ApartmentHeader";
import ApartmentImage from "@/components/apartment/ApartmentImage";
import PolicyDetails from "@/components/apartment/PolicyDetails";
import ProfileCard from "@/components/apartment/ProfileCard";
import VerifiedVendorCard from "@/components/apartment/VerifiedVendorCard";
import { UserService } from "@/service/user/user.service";
import { ChevronRight } from "lucide-react";
import dynamic from 'next/dynamic';
import { cookies } from "next/headers";


// ✅ Dynamic imports for all client components
const BookingForm = dynamic(() => import('@/components/apartment/BookingForm'), {
  loading: () => (
    <div className="p-6 bg-[#D6AE29]/8 shadow-xl border border-secondaryColor rounded-lg space-y-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
});

const ApatmentTabs = dynamic(() => import('@/components/apartment/ApartmentTabs'), {
  loading: () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  )
});

const AvailabilitySearchBox = dynamic(() => import('@/components/filter/AvailabilitySearchBox'), {
  loading: () => (
    <div className="animate-pulse">
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  )
});

const ReviewSection = dynamic(() => import('@/components/apartment/ReviewSection'), {
  loading: () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  )
});

async function HotelDetailsPage(props: {
  params: Promise<{ hotelSlug: string }>;
}) {
  const params = await props.params;
  const { hotelSlug } = params;
  const tokenStore = await cookies();
  const token = tokenStore.get("tourAccessToken")?.value;
  // Fetch server-side without causing side effects during render
  let vendorPackage: any = {};
  try {
    const res = await UserService.getData(`/admin/vendor-package/${hotelSlug}`, token);
    vendorPackage = res?.data?.data ?? {};
  } catch (error) {
    console.log(error);
  }


  return (
    <div>
      <div className=" container">
        <div className="py-10">
          <span className="flex items-center gap-2 ">
            {" "}
            Home <ChevronRight className="w-4 h-4 text-[#737373]" /> Hotel{" "}
            <ChevronRight className="w-4 h-4 text-[#737373]" /> Hotel
            details
          </span>
        </div>
        <div>
          <ApartmentHeader singleApartment={vendorPackage} />
        </div>
        <ApartmentImage vendorPackage={vendorPackage}/>
      
        <div className="lg:grid grid-cols-6 gap-8 pb-12 md:pb-14 lg:pb-20">
          <div className=" col-span-4 ">
            {/* ✅ Dynamic import - Client component */}
            <ApatmentTabs singleApartment={vendorPackage} />
          </div>
          <div className=" col-span-2">
            {/* ✅ Dynamic import - Client component */}
            <BookingForm singleApartments={vendorPackage} type="hotel" />
          </div>
        </div>
      </div>
      <div className=" bg-bgColor relative lg:mt-15 py-12 lg:py-20">
        <div className="hidden md:block container absolute left-1/2 -translate-x-1/2 -top-2">
          {/* ✅ Dynamic import - Client component */}
          <AvailabilitySearchBox />
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  container">
          {/* {hotelData.map((tour: any, index) => (
            <div key={tour.title}>
              <ApartmentDettailsPageCard data={tour} />
            </div>
          ))} */}
        </div>
      </div>

      <div className=" py-14 lg:py-20 ">
        <div className="lg:grid flex flex-col-reverse grid-cols-6 gap-8 container">
          <div className=" col-span-4 ">
            <PolicyDetails />
            {/* ✅ Dynamic import - Client component */}
            <ReviewSection singleApartment={vendorPackage} />
          </div>
          <div className=" col-span-2">
            {vendorPackage && <ProfileCard user={vendorPackage} />}
            <VerifiedVendorCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetailsPage;

