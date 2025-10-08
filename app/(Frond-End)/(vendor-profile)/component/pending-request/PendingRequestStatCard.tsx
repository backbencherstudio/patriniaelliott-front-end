import Image from "next/image";

interface StatCardProps {
    title: string;
    count: any;
    iconPath: string;
}

export default function PendingRequestStatCard({ title, count, iconPath }: StatCardProps) {
    return(
  <div className="flex-1 xl:p-6 p-2 bg-neutral-50 rounded-lg flex items-center gap-3 md:gap-2.5">
    <div className="md:w-9 md:h-9 w-7 h-7 p-[3px] bg-[#d6ae29] rounded-md flex items-center justify-center">
      <Image src={iconPath} alt={title} width={18} height={18} className="brightness-0 invert" />
    </div>
    <div className="flex flex-col gap-2 md:gap-2">
      <div className="text-[#070707] text-sm sm:text-base font-medium">{count}</div>
      <div className="text-[#777980] text-xs">{title}</div>
    </div>
  </div>
)}