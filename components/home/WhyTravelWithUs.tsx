'use client';

import call from "@/public/destination/call.svg";
import des from "@/public/destination/destination.svg";
import fly from "@/public/destination/fly.svg";
  import Image from 'next/image';
import CustomImage from "../reusable/CustomImage";

const travelFeatures = [
  {
    icon: fly,
    title: 'Expert Travel Planners',
    description:
      'Our experienced team designs unforgettable trips tailored to your preferences.',
  },
  {
    icon: des,
    title: 'Customizable Itineraries',
    description:
      'Design your perfect journey with flexible, personalized itineraries tailored to your travel dreams.',
  },
  {
    icon: call,
    title: '24/7 Customer Support',
    description:
      'Available around the clock, we ensure your travel needs are met anytime.',
  },
];

export default function WhyTravelWithUs() {
  return (
    <section className="bg-bgColor  py-20  md:px-16">
        <div className=' container'>
  <h2 className="text-3xl lg:text-5xl leading-[150%] font-semibold text-center mb-12">
        Why Travel with Us
      </h2>

      <div className="md:grid flex flex-col-reverse grid-cols-11  items-center justify-between gap-10">
        {/* Left side */}
        <div className="col-span-5 flex flex-col gap-8 w-full ">
          {travelFeatures.map((feature, index) => (
            <div key={index} className="flex gap-4 items-start">
              <Image  src={feature.icon} alt={feature.title} width={42} height={42} loading="lazy" />
              <div className=" ">
                <h3 className="text-2xl font-medium text-blackColor">{feature.title}</h3>
                <p className="text-descriptionColor text-lg mt-2 leading-[150%]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="col-span-6 w-full lg:pl-10">
          <CustomImage
            src="/destination/travelimage.jpg"
            alt="Travel"
            width={600}
            height={400}
            loading="lazy"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
      </div>
        </div>
    
    </section>
  );
}
