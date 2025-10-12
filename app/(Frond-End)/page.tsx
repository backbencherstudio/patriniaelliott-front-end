import dynamic from "next/dynamic";

// Lazy load components for better performance
const Banner = dynamic(() => import("@/components/home/Banner"), {
  loading: () => <div className="h-[500px] bg-gray-200 animate-pulse rounded-lg" />,
});

const TopDestination = dynamic(() => import("@/components/home/TopDestination"), {
  loading: () => <div className="h-[400px] bg-gray-200 animate-pulse rounded-lg" />,
});

const WhyTravelWithUs = dynamic(() => import("@/components/home/WhyTravelWithUs"), {
  loading: () => <div className="h-[300px] bg-gray-200 animate-pulse rounded-lg" />,
});

const TourList = dynamic(() => import("@/components/home/TourList"), {
  loading: () => <div className="h-[500px] bg-gray-200 animate-pulse rounded-lg" />,
});

const Accommodation = dynamic(() => import("@/components/home/Accommodation"), {
  loading: () => <div className="h-[400px] bg-gray-200 animate-pulse rounded-lg" />,
});

const Questions = dynamic(() => import("@/components/home/Questions"), {
  loading: () => <div className="h-[300px] bg-gray-200 animate-pulse rounded-lg" />,
});

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
