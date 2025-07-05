import Image from "next/image";

export default function PaymentStatCard  ({ title, value, icon }: any){
    return(
  <div className="flex-1 xl:p-6 p-2 bg-neutral-50 rounded-lg flex items-center gap-1.5 md:gap-2.5">
    <div className="md:w-9 md:h-9 w-7 h-7 p-[3px] bg-[#d6ae29] rounded-md flex items-center justify-center">
      <Image src={icon} alt={title} width={18} height={18} />
    </div>
    <div className="flex flex-col md:gap-2">
      <div className="text-[#070707] text-sm sm:text-base font-medium">{value}</div>
      <div className="text-[#777980] text-xs">{title}</div>
    </div>
  </div>
)}