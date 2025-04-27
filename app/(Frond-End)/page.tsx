import Accommodation from "@/components/home/Accommodation";
import Banner from "@/components/home/Banner";
import Questions from "@/components/home/Questions";
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
      <Accommodation/>
      <Questions/>
    </div>
  );
}
