import Image from 'next/image'

function ApartmentStatuse({value}:any) {
  return (
    <div>
       <div className={`pl-1.5 pr-2 py-2 ${value === "Completed" ? "bg-[#38c976]/10 outline-[#abefc6]" : "bg-[#fe5050]/10 outline-[#fe5050]"} rounded-2xl outline-1 outline-offset-[-1px] flex justify-center w-full lg:w-[90%] items-center gap-1`}>
          <Image
            src={value === 'Completed' ? "/booking/check.svg" : "/booking/redx.svg"}
            alt={value}
            width={16}
            height={16}
            className="w-3 h-3 object-contain"
          />
          <span className={`text-xs ${value === 'Completed' ? 'text-[#067647]' : 'text-[#fe5050]'}`}>{value}</span>
        </div>
    </div>
  )
}

export default ApartmentStatuse
