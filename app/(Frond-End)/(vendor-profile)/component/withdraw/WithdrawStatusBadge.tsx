import Image from "next/image";

interface WithdrawData {
  date: string;
  transactionId: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Canceled';
}

export const withdrawStatusStyles = {
  Completed: {
    bg: 'bg-[#38c976]/10',
    border: 'outline-[#abefc6]',
    text: 'text-[#067647]',
    icon: '/vendor/check.svg'
  },
  Processing: {
    bg: 'bg-[#ffa23a]/10',
    border: 'outline-[#ffa23a]',
    text: 'text-[#ffa23a]',
    icon: '/vendor/pending.svg'
  },
  Canceled: {
    bg: 'bg-[#fe5050]/10',
    border: 'outline-[#fe5050]',
    text: 'text-[#fe5050]',
    icon: '/vendor/redx.svg'
  }
};

export const WithdrawStatusBadge = ({ status }: { status: WithdrawData['status'] }) => {
  const style = withdrawStatusStyles[status];

  return (
    <div className={`pl-1.5 pr-2 py-2 w-[60%] justify-center ${style.bg} rounded-2xl outline-1 outline-offset-[-1px] ${style.border} flex  items-center gap-1`}>
      <div className="w-3 h-3 relative overflow-hidden">
        <Image
          src={style.icon}
          alt={status}
          width={12}
          height={12}
        />
      </div>
      <div className={`text-center justify-start ${style.text} text-xs font-normal font-['Inter'] leading-3`}>{status}</div>
    </div>
  );
}; 