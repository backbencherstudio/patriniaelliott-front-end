// ProfileCard.tsx

import Image from "next/image";
import { FaStar } from "react-icons/fa6";

const ProfileCard = ({ user }) => {

  return (
    <div className="bg-[#D6AE29]/8 border border-secondaryColor rounded-lg p-6 lg:p-4 lg:py-6 xl:p-6 ">
      <div className="flex items-center space-x-4">
        <Image
          src={ user?.user?.avatar_url || "/profile.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full"
          width={100}
          height={100}
        />
        <div className="flex-1">
          <h2 className="text-xl flex items-center gap-2 font-semibold text-blackColor">
            {user?.user?.name}
            <Image
              src="/icon/check.svg"
              alt="checkicon"
              width={16}
              height={16}
            />
          </h2>
          <div className="flex items-center text-sm text-grayColor1 leading-[124%]">
            <span className="mr-2 text-base text-headerColor gap-2 flex items-center">
              {" "}
              <FaStar className=" text-ratingColor" size={25} /> 4.9
            </span>
            <span className="text-grayColor1 text-base">(256 reviews)</span>
          </div>
          <p className="text-xs text-grayColor1 mt-2">
            Member since {user?.user?.created_at && user?.user?.created_at}
          </p>
        </div>
      </div>
      <div className=" flex items-center gap-2 my-6">
        <Image
          src="/icon/checkblue.svg"
          alt="checkicon"
          width={16}
          height={16}
        />{" "}
        <h1 className=" text-sm text-headerColor font-medium">
          NID, Phone & Email Verified
        </h1>
      </div>
      <div className=" py-3 bg-[#F7EFD4] lg:px-2 xl:px-8 flex justify-between text-sm text-descriptionColor rounded-2xl">
        <div className=" items-center flex gap-2">
          <Image
            src="/icon/proparty.svg"
            alt="checkicon"
            width={20}
            height={20}
          />
          <h5 className="text-base lg:text-xs xl:text-base">3 Properties</h5>
        </div>
        <div className="items-center flex gap-2">
          <Image src="/icon/house.svg" alt="checkicon" width={22} height={20} />
          <h5 className="text-base lg:text-xs xl:text-base">Served Guests: 248</h5>
        </div>
      </div>
      <button className="w-full cursor-pointer bg-secondaryColor text-headerColor my-6 py-3 font-medium rounded-lg">
        Contact Host
      </button>
      <div className="text-sm text-grayColor1 leading-[140%] ">
        <p>
          {user?.user?.bio && user?.user?.bio}
        </p>
      </div>
      <button className="text-xs flex gap-2 cursor-pointer items-center text-red-500 mt-6 w-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <g clip-path="url(#clip0_5471_6625)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 4.5L9.58504 2.65079C10.141 2.00212 9.68013 1 8.82578 1L2 1L2 8L8.82578 8C9.68013 8 10.141 6.99788 9.58504 6.34921L8 4.5ZM3 7L8.82578 7L6.68292 4.5L8.82578 2L3 2L3 7Z"
              fill="#E3322C"
            />
            <path
              d="M2 0.5C2 0.223858 2.22386 0 2.5 0V0C2.77614 0 3 0.223858 3 0.5L3 11.5C3 11.7761 2.77614 12 2.5 12V12C2.22386 12 2 11.7761 2 11.5L2 0.5Z"
              fill="#E3322C"
            />
          </g>
          <defs>
            <clipPath id="clip0_5471_6625">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>Report this host</span>
      </button>
    </div>
  );
};

export default ProfileCard;
