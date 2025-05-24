import Image from "next/image";
interface UserData {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    joinDate: string;
    status: 'Confirmed' | 'Pending' | 'Canceled';
  }
  export const statusStyles = {
    Confirmed: {
      bg: 'bg-[#38c976]/10',
      border: 'outline-[#abefc6]',
      text: 'text-[#067647]',
      icon: '/dashboard/icon/tik.svg'
    },
    Pending: {
      bg: 'bg-[#ffa23a]/10',
      border: 'outline-[#ffa23a]',
      text: 'text-[#ffa23a]',
      icon: '/dashboard/icon/loading.svg'
    },
    Canceled: {
      bg: 'bg-[#fe5050]/10',
      border: 'outline-[#fe5050]',
      text: 'text-[#fe5050]',
      icon: '/dashboard/icon/cross.svg'
    }
  };

function BokingStatuse({ status }: { status: UserData['status'] }) {
 
    const style = statusStyles[status];
  return (
    <div className={`px-1  py-1.5 ${style.bg} rounded-2xl  outline-1 outline-offset-[-1px] ${style.border} flex justify-center items-center gap-1`}>
      <div className="w-3 h-3 relative overflow-hidden">
        <Image
          src={style.icon} 
          alt={status} 
          width={12} 
          height={12} 
          className={style.text}
        />
      </div>
      <div className={`text-center justify-start ${style.text} text-xs font-normal font-['Inter'] leading-3`}>
        {status}
      </div>
    </div>
  )
}

export default BokingStatuse


