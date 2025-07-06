import Image from "next/image"

export default function TransStatuse ({ status }: { status: string }) {
  const statusConfig = {
    Completed: {
      bg: 'bg-[#38c976]/10',
      border: 'outline-[#abefc6]',
      text: 'text-[#067647]',
      icon: '/vendor/check.svg'
    },
    Pending: {
      bg: 'bg-[#ffa23a]/10',
      border: 'outline-[#ffa23a]',
      text: 'text-[#ffa23a]',
      icon: '/vendor/pending.svg'
    },
    Failed: {
      bg: 'bg-[#fe5050]/10',
      border: 'outline-[#fe5050]',
      text: 'text-[#fe5050]',
      icon: '/vendor/redx.svg'
    }
  }

  const style = statusConfig[status as keyof typeof statusConfig]

  return (
     <div className={`pl-1.5 pr-2 py-2 w-full lg:w-[90%]  justify-center ${style.bg} rounded-2xl outline-1 outline-offset-[-1px] ${style.border} flex  items-center gap-1`}>
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
  )
}
