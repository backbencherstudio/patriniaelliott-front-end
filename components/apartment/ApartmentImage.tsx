"use client"
import Image from 'next/image';
import { useState } from 'react';
import ImageModal from './ImageModal';

function ApartmentImage({vendorPackage}:{vendorPackage:any}) {
    console.log("image",vendorPackage);
     const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());
     const [isOpen, setIsOpen] = useState(false);
  const getSlideSrc = (src: string, index: number) => {
    if (!src) return "/empty.png";
    return failedIndices.has(index) ? "/empty.png" : src;
  };

  const handleImageError = (index: number) => {
    setFailedIndices(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };
  return (
    <div>
      <div className="lg:grid grid-cols-6 gap-6">
          <div className=" col-span-4 h-auto lg:h-[536px] rounded-2xl overflow-hidden">
            <Image
              src={getSlideSrc(vendorPackage?.roomFiles[0], 0)}
              alt={"image"}
              width={900}
              height={600}
              onError={() => handleImageError(0)}
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="  col-span-2 flex  lg:flex-col gap-3 mt-3 lg:mt-0 lg:gap-6 mb-12 md:mb-14 lg:mb-20">
            <div className=" lg:h-[255px] rounded-2xl overflow-hidden">
              <Image
                src={getSlideSrc(vendorPackage?.roomFiles[1], 1)}
                alt={"image"}
                width={900}
                height={600}
                onError={() => handleImageError(1)}
                className=" w-full h-full object-cover"
              />
            </div>
            <div className=" relative lg:h-[255px] rounded-2xl overflow-hidden">
              <Image
                src={getSlideSrc(vendorPackage?.roomFiles[2], 2)}
                alt={"image"}
                width={900}
                height={600}
                onError={() => handleImageError(2)}
                className=" w-full h-full object-cover"
              />
              <div className=" absolute top-0 left-0 w-full h-full bg-black/50">
                <div className=" flex justify-center h-full items-center">
                  <button onClick={()=>setIsOpen(true)}  className="cursor-pointer flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_5471_6422)">
                        <path
                          d="M36.3609 50.0002C36.0109 50.0002 35.6525 49.9564 35.2984 49.8627L3.08379 41.2356C2.02168 40.9408 1.11782 40.2407 0.566841 39.2861C0.0158638 38.3314 -0.138154 37.1985 0.137954 36.1314L4.20254 20.9814C4.27745 20.7186 4.45262 20.4958 4.69029 20.361C4.92795 20.2262 5.20908 20.1901 5.47308 20.2606C5.73707 20.3311 5.96279 20.5025 6.10158 20.7379C6.24037 20.9733 6.28112 21.2538 6.21504 21.5189L2.15254 36.6648C1.86295 37.7689 2.52545 38.9189 3.6317 39.2252L35.8338 47.8481C36.3645 47.9893 36.9295 47.9142 37.4049 47.6392C37.8802 47.3643 38.2271 46.9119 38.3692 46.3814L39.9963 40.3523C40.0319 40.2201 40.0931 40.0963 40.1765 39.9878C40.26 39.8793 40.3639 39.7883 40.4825 39.7201C40.6011 39.6518 40.732 39.6075 40.8677 39.5898C41.0034 39.5721 41.1412 39.5813 41.2734 39.6168C41.4055 39.6524 41.5294 39.7136 41.6378 39.7971C41.7463 39.8805 41.8373 39.9845 41.9056 40.1031C41.9739 40.2217 42.0181 40.3525 42.0358 40.4882C42.0535 40.6239 42.0444 40.7618 42.0088 40.8939L40.3838 46.9148C40.1469 47.8004 39.6241 48.5831 38.8966 49.141C38.1691 49.699 37.2777 50.001 36.3609 50.0002Z"
                          fill="white"
                        />
                        <path
                          d="M45.832 37.5001H12.4987C10.2008 37.5001 8.33203 35.6313 8.33203 33.3334V8.33342C8.33203 6.0355 10.2008 4.16675 12.4987 4.16675H45.832C48.13 4.16675 49.9987 6.0355 49.9987 8.33342V33.3334C49.9987 35.6313 48.13 37.5001 45.832 37.5001ZM12.4987 6.25008C11.3508 6.25008 10.4154 7.1855 10.4154 8.33342V33.3334C10.4154 34.4813 11.3508 35.4167 12.4987 35.4167H45.832C46.9799 35.4167 47.9154 34.4813 47.9154 33.3334V8.33342C47.9154 7.1855 46.9799 6.25008 45.832 6.25008H12.4987Z"
                          fill="white"
                        />
                        <path
                          d="M18.7511 18.7501C16.4532 18.7501 14.5844 16.8813 14.5844 14.5834C14.5844 12.2855 16.4532 10.4167 18.7511 10.4167C21.049 10.4167 22.9178 12.2855 22.9178 14.5834C22.9178 16.8813 21.049 18.7501 18.7511 18.7501ZM18.7511 12.5001C17.6032 12.5001 16.6677 13.4355 16.6677 14.5834C16.6677 15.7313 17.6032 16.6667 18.7511 16.6667C19.899 16.6667 20.8344 15.7313 20.8344 14.5834C20.8344 13.4355 19.899 12.5001 18.7511 12.5001ZM9.52192 35.2709C9.31605 35.2709 9.11482 35.2098 8.94362 35.0955C8.77242 34.9812 8.63894 34.8187 8.56003 34.6285C8.48112 34.4384 8.46032 34.2291 8.50026 34.0272C8.54019 33.8252 8.63908 33.6396 8.78442 33.4938L18.624 23.6542C19.8032 22.4751 21.8636 22.4751 23.0428 23.6542L25.9719 26.5834L34.0802 16.8542C34.3713 16.5052 34.7349 16.2238 35.1458 16.0295C35.5567 15.8352 36.0049 15.7327 36.4594 15.7292H36.4823C36.933 15.729 37.3785 15.8263 37.788 16.0143C38.1976 16.2024 38.5617 16.4768 38.8553 16.8188L49.7511 29.5313C49.8419 29.6349 49.9113 29.7555 49.9552 29.886C49.9991 30.0166 50.0166 30.1546 50.0069 30.292C49.9971 30.4294 49.9602 30.5635 49.8982 30.6865C49.8363 30.8095 49.7505 30.919 49.646 31.0087C49.5414 31.0984 49.4201 31.1664 49.2891 31.2089C49.1581 31.2514 49.0199 31.2675 48.8826 31.2562C48.7453 31.245 48.6117 31.2066 48.4893 31.1433C48.367 31.08 48.2584 30.9931 48.1698 30.8876L37.274 18.1751C37.1765 18.0606 37.0551 17.9688 36.9183 17.9062C36.7815 17.8436 36.6327 17.8116 36.4823 17.8126C36.3304 17.8166 36.1809 17.852 36.0432 17.9166C35.9055 17.9811 35.7827 18.0734 35.6823 18.1876L26.8428 28.7938C26.7501 28.9052 26.6351 28.9959 26.5052 29.0602C26.3753 29.1244 26.2334 29.1607 26.0886 29.1667C25.9438 29.1758 25.7987 29.1533 25.6635 29.1007C25.5282 29.0482 25.406 28.967 25.3053 28.8626L21.5698 25.1272C21.3709 24.9387 21.1074 24.8337 20.8334 24.8337C20.5594 24.8337 20.2958 24.9387 20.0969 25.1272L10.2573 34.9668C10.1608 35.0634 10.0461 35.14 9.91995 35.1922C9.79375 35.2443 9.65848 35.2711 9.52192 35.2709Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_5471_6422">
                          <rect width="50" height="50" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p className="  mt-1 text-whiteColor font-medium">
                      View more photos
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen &&   <ImageModal images={vendorPackage?.roomFiles} isOpen={isOpen} setIsOpen={setIsOpen}/>}
    </div>
  )
}

export default ApartmentImage
