import Image from "next/image";

interface UserData {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    joinDate: string;
    status: 'paid' | 'pending' | 'cancel' | 'approved';
  }
function BookingPymentStatuse({ status }: { status: UserData['status'] }) {
  const label = (status === 'paid' || status === "approved") ? 'Full Paid' : status === 'pending' ? 'Pending' : 'Canceled';
  const bgClass = status === 'paid' || status === "approved" ? 'bg-[#38c976]/10' : status === 'pending' ? 'bg-[#ffa23a]/10' : 'bg-[#fe5050]/10';
  const borderClass = status === 'paid' || status === "approved" ? 'outline-[#abefc6]' : status === 'pending' ? 'outline-[#ffa23a]' : 'outline-[#fe5050]';
  const textClass = status === 'paid' || status === "approved" ? 'text-[#067647]' : status === 'pending' ? 'text-[#ffa23a]' : 'text-[#fe5050]';
  const iconSrc = status === 'paid' || status === "approved" ? '/dashboard/icon/tik.svg' : status === 'pending' ? '/dashboard/icon/loading.svg' : '/dashboard/icon/cross.svg';
  return (
    <div className={`pl-1.5 pr-2 py-1.5 rounded-2xl outline-1 outline-offset-[-1px] flex justify-center items-center gap-1 ${bgClass} ${borderClass}`}>
      <div className="w-3 h-3 relative overflow-hidden">
        <Image src={iconSrc || "/dashboard/icon/tik.svg"} alt={status} width={12} height={12} />
      </div>
      <div className={`text-center justify-start text-xs font-normal font-['Inter'] leading-3 ${textClass}`}>
        {label}
      </div>
    </div>
  )
}

export default BookingPymentStatuse


