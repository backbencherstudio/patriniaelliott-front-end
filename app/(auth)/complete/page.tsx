import completeImage from "@/public/auth/complete.jpg";
import completeIcon from "@/public/auth/completeicon.png";
import Image from "next/image";
import Link from "next/link";
function CompletePage() {
  return (
    <section className="max-w-[1346px] mx-auto min-h-screen flex items-center">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 items-center  h-full">
        <div className=" rounded-3xl overflow-hidden">
          <Image
            src={completeImage}
            alt="completeImage"
            width={650}
            height={750}
            className=" w-full "
          />
        </div>
        <div className=" w-full flex flex-col justify-center items-center space-y-8">
          <Image
            src={completeIcon}
            alt="completeIcon"
            width={182}
            height={182}
            className=""
          />
          <div className=" space-y-8">
            <h2 className=" text-headerColor font-extrabold text-[32px]  text-center">
              You successfully changed your password!
            </h2>
            <div className=" w-[70%] mx-auto">
              <Link
               href="/login"
                className="w-full block text-center  cursor-pointer bg-secondaryColor text-blackColor font-semibold py-4 rounded-md transition hover:bg-[#d4a900]"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompletePage;
