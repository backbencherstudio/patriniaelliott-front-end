// VerifiedVendorCard.tsx

import Image from "next/image";

const VerifiedVendorCard = () => {
  return (
    <div className="bg-[#D6AE29]/3 border border-secondaryColor rounded-lg p-6  mt-5">
      <div className="flex items-center space-x-3 mb-4">
        <div className="">
          <Image
            src="/icon/verify.svg"
            alt="checkicon"
            width={30}
            height={30}
          />
        </div>
        <h2 className="text-xl font-medium text-headerColor">
          Verified vendor information
        </h2>
      </div>
      <div className="space-y-3">
        <div className="flex items-center text-base space-x-2 mt-5 ">
          <Image
            src="/icon/identy.svg"
            alt="checkicon"
            width={20}
            height={20}
          />
          <span className="text-sm font-medium">Identity</span>
          <Image
            src="/icon/checkblue.svg"
            alt="checkicon"
            width={16}
            height={16}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Image src="/icon/mail.svg" alt="checkicon" width={20} height={20} />
          <span className="text-sm font-medium">Email Address</span>
          <Image
            src="/icon/checkblue.svg"
            alt="checkicon"
            width={16}
            height={16}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/icon/contact.svg"
            alt="checkicon"
            width={20}
            height={20}
          />
          <span className="text-sm font-medium">Phone Number</span>
          <Image
            src="/icon/checknormal.svg"
            alt="checkicon"
            width={16}
            height={16}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifiedVendorCard;
