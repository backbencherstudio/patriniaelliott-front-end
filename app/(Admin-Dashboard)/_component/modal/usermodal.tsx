import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

interface UserModalProps {
  
  onClose?: () => void;
  userData?: any;
}



export default function Usermodal({  onClose, userData  }: UserModalProps) {
 

console.log(userData);


  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleBackdropClick}>
      <div className="p-4 md:p-6 bg-white rounded-xl flex flex-col gap-4 md:gap-6 max-h-[90vh] overflow-auto w-full max-w-[974px] m-4">
        <div className="flex justify-between items-start">
          <h2 className="text-[#070707] text-xl md:text-[28px] font-medium">User Details</h2>
          <div className="w-[34px] h-[34px] p-[9px] bg-[#e9e9ea] rounded-full flex items-center cursor-pointer" onClick={onClose}>
            <Image src="/modal/close.svg" alt="close" width={16} height={16} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[300px] lg:w-[349px] p-4 rounded-2xl outline outline-[#f3f3f4] flex flex-col gap-6">
            {/* <div className="flex justify-between items-center">
              <div className={`flex items-center gap-1 px-2 py-1.5 ${currentStatus.bg} rounded-2xl outline ${currentStatus.border}`}>
                <Image src={`${currentStatus.icon}`} alt={userData.status.toLowerCase()} width={12} height={12} />
                <span className={`${currentStatus.text} text-xs`}>{userData.status}</span>
              </div>
              <div className="w-[34px] h-[34px] bg-white rounded-full shadow-sm outline outline-[#edf2f7] flex items-center justify-center">
                <Image src="/modal/threedot.svg" alt="menu" width={16} height={16} />
              </div>
            </div> */}

            <div className="flex flex-col items-center">
              <div className="w-[100px] h-[100px] mb-4">
                <img src={userData?.profile_image} alt="profile" className="rounded-full w-full h-full object-cover" />
              </div>
              <div className="text-center w-full">
                <h3 className="text-[#22262e] text-xl font-medium mb-2">{userData?.name}</h3>
                <p className="text-[#777980] text-base mb-2">{userData?.type}</p>
                <div className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-neutral-50 rounded-lg outline outline-[#e9e9ea]">
                  <span className="text-[#777980]">ID {userData?.id}</span>
                  <Image src="/modal/copy.svg" alt="copy" width={16} height={16} />
                </div>
              </div>
            </div>

            <div className='bg-secondaryColor/5 border border-secondaryColor rounded-xl p-4'>
            <div className="flex justify-between items-center mb-4">
             {
              userData.type == "host" ? <div className="flex items-center gap-2">
              <Image src="/modal/redclock.svg" alt="pending" width={20} height={20} />
              <span className="text-[#fe5050] text-base">{userData?.status}</span>
            </div> :  <div className="flex items-center gap-2">
                <Image src="/modal/redclock.svg" alt="pending" width={20} height={20} />
                <span className="text-[#fe5050] text-base">{userData?.status}</span>
              </div>
             }
            
              <span className="text-[#4a4c56] flex items-center gap-1 text-base"><FaStar className='text-yellow-400'/> {userData?.rating}</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <Image src="/modal/mail.svg" alt="email" width={20} height={20} />
                <span className="text-[#4a4c56] text-base">{userData?.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Image src="/modal/call.svg" alt="phone" width={20} height={20} />
                <span className="text-[#4a4c56] text-base">{userData?.phone_number}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Image src="/modal/location.svg" alt="address" width={20} height={20} />
                <span className="text-[#4a4c56] text-base">{userData?.address}</span>
              </div>
            </div>
            </div>
          </div>

          <div className="flex-1 bg-bgColor rounded-xl p-4">
            <div className="border-b border-[#f3f3f4] pb-4  md:mb-8">
              <h3 className="text-[#070707] text-xl md:text-2xl font-medium mb-4 md:mb-8">Hi, I'm {userData?.name}</h3>
              <p className="text-[#4a4c56] text-base md:text-lg leading-[27px]">{userData?.bio}</p>
            </div>

            <div className="flex  md:flex-row gap-4 md:gap-6">
              <div className="flex flex-col gap-3 md:gap-5">
                {["Join date", "Gender", "Date of Birth", "Language", "Last Active"].map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Image src={`/modal/${['calendar', 'gender', 'birthdaycake', 'language', 'lastseen'][i]}.svg`} alt={label} width={20} height={20} />
                    <span className="text-[#777980] text-base md:text-lg">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex-1 flex flex-col gap-3 md:gap-5">
                {[ dayjs(userData.created_at).format("MMMM D YYYY") , userData?.gender ? userData?.gender : "N/A", userData?.date_of_birth ? dayjs(userData?.date_of_birth).format("MMMM D YYYY") : "N/A", userData?.language ? userData?.language : "N/A", dayjs(userData?.updated_at).format("MMMM D YYYY")].map((text, i) => (
                  <div key={i} className="text-[#070707] text-base md:text-lg">{text}</div>
                ))}
              </div>
            </div>
            {
              userData.type == "Host" && <div className=' flex flex-wrap  gap-3 justify-center  mt-3 py-1.5 rounded-md border border-blackColor/20'>
                <div className='flex gap-1'>
                  <Image src="/icon/proparty.svg" alt='proparty' width={16} height={16}/>
                    <p className='text-sm text-blackColor/70'>Property: <span className='text-blackColor'>3</span> </p>
                </div>
                <div className='flex gap-1'>
                  <Image src="/icon/tureIcon.svg" alt='proparty' width={16} height={16}/>
                    <p className='text-sm text-blackColor/70'>Tour: <span className='text-blackColor'>3</span> </p>
                </div>
                <div className='flex gap-1'>
                  <Image src="/icon/house.svg" alt='proparty' width={16} height={16}/>
                    <p className='text-sm text-blackColor/70'>Served Guest:<span className='text-blackColor'> 3</span> </p>
                </div>
              </div>
            }
          </div>

        </div>

        <button className="self-end px-6 md:px-8 py-3 md:py-3.5 rounded-full outline outline-[#fe5050] text-[#fe5050] font-medium text-sm md:text-base">
          Remove User
        </button>
      </div>
    </div>
  );
}
