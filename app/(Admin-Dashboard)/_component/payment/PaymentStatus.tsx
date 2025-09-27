import Image from "next/image";

interface UserData {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    joinDate: string;
    status: "succeeded" | "approved" |'pending' | 'cancel';
  }
  export const statusStyles = {
    succeeded: {
      bg: 'bg-[#38c976]/10',
      border: 'outline-[#abefc6]',
      text: 'text-[#067647]',
      icon: '/dashboard/icon/tik.svg'
    },
    approved: {
      bg: 'bg-[#38c976]/10',
      border: 'outline-[#abefc6]',
      text: 'text-[#067647]',
      icon: '/dashboard/icon/tik.svg'
    },
    pending: {
      bg: 'bg-[#ffa23a]/10',
      border: 'outline-[#ffa23a]',
      text: 'text-[#ffa23a]',
      icon: '/dashboard/icon/loading.svg'
    },
    cancel: {
      bg: 'bg-[#fe5050]/10',
      border: 'outline-[#fe5050]',
      text: 'text-[#fe5050]',
      icon: '/dashboard/icon/cross.svg'
    }
  };

function PaymentStatuse({ status }: { status: UserData['status'] }) {
    
    const style = statusStyles[status];

    
  return (
    <div className={`pl-1.5 pr-2 py-1.5 ${style?.bg ? style.bg  :''} rounded-2xl  outline-1 outline-offset-[-1px] ${style?.border ? style.border :""} flex justify-center items-center gap-1`}>
     <div className="w-3 h-3 relative overflow-hidden">
             <Image
               src={style?.icon} 
               alt={status} 
               width={12} 
               height={12} 
               className={style?.text}
             />
           </div>
      <div className={`text-center justify-start ${style?.text} text-xs font-normal font-['Inter'] leading-3`}>
         {status == "succeeded" && "Complete" }
         {status == "approved" && "approved" }
         {status == "pending" && "Pending" }
         {status == "cancel" && "Cancel" }
 
       
      </div>
    </div>
  )
}

export default PaymentStatuse
