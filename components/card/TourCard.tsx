'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaArrowRight, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type TourCardProps = {
    image: string;
    location: string;
    tag: string;
    type: string;
    title: string;
    rating: number;
    cancellation: string;
    duration: string;
    groupSize: string;
    price: string;
};

export default function TourCard({ tour }: any) {
    const [failedIndice, setFailedIndice] = useState<Set<number>>(new Set());
    const getSlideSrc = (src: string, index: number) => {
        if (!src) return "/empty.png";
        return failedIndice.has(index) ? "/empty.png" : src;
    };

    const handleImageError = (index: number) => {
        setFailedIndice(prev => {
            const next = new Set(prev);
            next.add(index);
            return next;
        });
    };
    
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full ">
            <div className="relative">
                <div className=' p-3'>
                    {
                        tour?.package_files?.length >= 2 ?
                            <Swiper
                                slidesPerView={1}
                                loop={true}
                                speed={1000}
                                spaceBetween={20}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}

                                modules={[Autoplay, Navigation, Pagination]}
                                pagination={{
                                    clickable: true,
                                    bulletClass: 'hero-bullet',
                                    bulletActiveClass: 'hero-bullet-active',
                                }}>
                                {
                                    tour?.package_files?.length > 0 &&
                                    tour?.package_files?.slice(0, 4).map((file: any, index: number) => (
                                        <SwiperSlide key={index} className="w-full lg:!h-[240px] !rounded-lg !h-[200px] overflow-hidden ">
                                            <Image
                                                src={getSlideSrc(file?.file_url, index)}
                                                alt={tour?.name}
                                                width={400}
                                                height={200}
                                                onError={() => handleImageError(index)}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300 !rounded-lg "
                                            />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            :
                            <div className="lg:!h-[240px] !rounded-lg !h-[200px] overflow-hidden  w-full">
                                <Image
                                    src={tour?.package_files[0]?.file_url || "/Accommodation/a1.png"}
                                    alt={tour?.name}
                                    width={400}
                                    height={200}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300 !rounded-lg "
                                />
                            </div>
                    }
                </div>

                {tour?.breakfast_available && <span className="absolute z-20 top-6 left-6 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  "Breakfast Included" 
                </span>}
                <span className="absolute bottom-6 z-20 left-6 flex items-center bg-white text-gray-700 text-xs px-2 py-1 rounded-full shadow">
                    <FaMapMarkerAlt className="mr-1" /> {tour?.city}
                </span>
            </div>

            <div className="p-4 space-y-2">
                <span className="text-xs text-primaryColor bg-[#90A9C3]/20 px-3 py-1 rounded-full  font-medium">
                    Hotel + All inclusive
                </span>
                <h3 className="font-medium mt-3 text-[22px] text-blackColor leading-[130%]">
                    {tour?.name}
                </h3>

                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <span className="text-headerColor  text-sm">{tour?.rating_summary?.averageRating}</span>
                    {Array.from({ length: 5 }, (_, i) => (
                        <FaStar key={i} className={i < tour?.rating_summary?.averageRating ? 'text-yellow-400' : 'text-[#A7B6CC]'} />
                    ))}

                </div>
                <p className="text-sm text-[#0068EF]">Free cancellation <span className='text-grayColor1 text-xs'>(24 hours)</span></p>

                <div className="flex  text-xs text-gray-600 mt-2 mb-4">
                    <div className="flex items-center gap-2 border-r border-grayColor1/30 pr-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_5500_3505)">
                                <path d="M12 24C18.616 24 24 18.616 24 12C24 5.38401 18.6161 0 12 0C5.38394 0 0 5.38401 0 12C0 18.616 5.38401 24 12 24ZM12 1.59997C17.736 1.59997 22.4 6.26396 22.4 12C22.4 17.736 17.736 22.4 12 22.4C6.26396 22.4 1.59997 17.736 1.59997 12C1.59997 6.26396 6.26402 1.59997 12 1.59997Z" fill="#D6AE29" />
                                <path d="M15.4992 15.8238C15.6472 15.9438 15.8232 15.9998 15.9992 15.9998C16.1191 16.0001 16.2375 15.9732 16.3455 15.9213C16.4536 15.8693 16.5485 15.7936 16.6232 15.6998C16.8992 15.3558 16.8431 14.8518 16.4992 14.5758L12.7992 11.6158V5.59979C12.7992 5.15979 12.4392 4.7998 11.9992 4.7998C11.5592 4.7998 11.1992 5.15979 11.1992 5.59979V11.9998C11.1992 12.2438 11.3112 12.4718 11.4992 12.6238L15.4992 15.8238Z" fill="#D6AE29" />
                            </g>
                            <defs>
                                <clipPath id="clip0_5500_3505">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <div >
                            <h3 className=' text-sm font-medium text-descriptionColor'>Duration</h3>
                            <span>{tour?.duration} {tour?.duration_type}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pl-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.4844 12.57H18.1351C17.8154 12.57 17.5058 12.6137 17.2112 12.694C16.63 11.5516 15.4435 10.7666 14.0763 10.7666H9.92367C8.55647 10.7666 7.36997 11.5516 6.78881 12.694C6.48774 12.6117 6.17702 12.57 5.86491 12.57H3.51562C1.57711 12.57 0 14.1471 0 16.0856V19.8411C0 21.0042 0.946266 21.9505 2.10938 21.9505H21.8906C23.0537 21.9505 24 21.0042 24 19.8411V16.0856C24 14.1471 22.4229 12.57 20.4844 12.57ZM6.40805 14.2823V20.5443H2.10938C1.72167 20.5443 1.40625 20.2289 1.40625 19.8412V16.0856C1.40625 14.9225 2.35252 13.9763 3.51562 13.9763H5.86491C6.05578 13.9763 6.24061 14.0022 6.41658 14.05C6.41119 14.1273 6.40834 14.2048 6.40805 14.2823ZM16.1857 20.5443H7.8143V14.2823C7.8143 13.1192 8.76056 12.1729 9.92367 12.1729H14.0763C15.2394 12.1729 16.1857 13.1192 16.1857 14.2823V20.5443ZM22.5938 19.8412C22.5938 20.2289 22.2783 20.5443 21.8906 20.5443H17.592V14.2823C17.5917 14.2047 17.5888 14.1273 17.5834 14.0499C17.7632 14.001 17.9488 13.9763 18.1351 13.9762H20.4844C21.6475 13.9762 22.5938 14.9225 22.5938 16.0856V19.8412Z" fill="#D6AE29" />
                            <path d="M4.69044 5.92988C2.96783 5.92988 1.56641 7.3313 1.56641 9.05391C1.56636 10.7765 2.96783 12.1779 4.69044 12.1779C6.413 12.1779 7.81447 10.7765 7.81447 9.05391C7.81447 7.3313 6.41305 5.92988 4.69044 5.92988ZM4.69039 10.7717C3.74319 10.7717 2.97261 10.0011 2.97261 9.05391C2.97261 8.10671 3.74319 7.33613 4.69039 7.33613C5.63759 7.33613 6.40817 8.10671 6.40817 9.05391C6.40817 10.0011 5.63759 10.7717 4.69039 10.7717ZM12.0001 2.0498C9.69875 2.0498 7.82647 3.92209 7.82647 6.22346C7.82647 8.52484 9.69875 10.3971 12.0001 10.3971C14.3015 10.3971 16.1738 8.52484 16.1738 6.22346C16.1738 3.92213 14.3015 2.0498 12.0001 2.0498ZM12.0001 8.99087C10.4742 8.99087 9.23272 7.74943 9.23272 6.22346C9.23272 4.69754 10.4742 3.45605 12.0001 3.45605C13.5261 3.45605 14.7675 4.69749 14.7675 6.22346C14.7675 7.74943 13.5261 8.99087 12.0001 8.99087ZM19.3098 5.92988C17.5872 5.92988 16.1858 7.3313 16.1858 9.05391C16.1858 10.7765 17.5872 12.1779 19.3098 12.1779C21.0324 12.1779 22.4338 10.7765 22.4338 9.05391C22.4338 7.3313 21.0324 5.92988 19.3098 5.92988ZM19.3098 10.7717C18.3627 10.7717 17.592 10.0011 17.592 9.05391C17.5921 8.10671 18.3627 7.33613 19.3098 7.33613C20.257 7.33613 21.0276 8.10671 21.0276 9.05391C21.0276 10.0011 20.257 10.7717 19.3098 10.7717Z" fill="#D6AE29" />
                        </svg><div >
                            <h3 className=' text-sm font-medium text-descriptionColor'>Group Size</h3>
                            <span>{tour?.max_capacity} Pepole</span>
                        </div>

                    </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t ">
                    <div>
                        <p className="text-grayColor1 text-sm font-semibold">
                            Starting From<br />
                        </p>
                        <p className="text-xl text-primaryColor capitalize font-medium">${tour?.price}/person</p>
                    </div>
                    <Link href={`/toure/${tour?.id}`} className="lg:text-[18px] text-base gap-1 flex lg:gap-3 items-center font-medium border border-secondaryColor text-secondaryColor px-3 lg:px-4 py-2 rounded-full hover:text-blackColor cursor-pointer hover:bg-secondaryColor transition">
                        Check Details <FaArrowRight />

                    </Link>
                </div>
            </div>
        </div>
    );
}
