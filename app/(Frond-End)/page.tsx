import Banner from "@/components/home/Banner";
import TopDestination from "@/components/home/TopDestination";
import TourList from "@/components/home/TourList";
import WhyTravelWithUs from "@/components/home/WhyTravelWithUs";


export default function Home() {
  return (
    <div className="">
      <Banner/>
      <TopDestination/>
      <WhyTravelWithUs/>
      <TourList/>
    </div>
  );
}
