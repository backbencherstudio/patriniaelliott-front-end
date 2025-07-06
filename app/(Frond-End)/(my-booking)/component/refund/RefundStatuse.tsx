import Image from 'next/image';

function RefundStatuse({ value }: { value: string }) {
  let bg = '';
  let outline = '';
  let text = '';
  let icon = '';

  if (value === 'completed') {
    bg = 'bg-[#ecfcf2]';
    outline = 'outline-[#aaefc6]';
    text = 'text-[#057647]';
    icon = '/booking/check.svg';
  } else if (value === 'processing') {
    bg = 'bg-[#ffa23a]/10';
    outline = 'outline-[#ffa23a]';
    text = 'text-[#ffa23a]';
    icon = '/booking/processing.svg';
  } else if (value === 'canceled') {
    bg = 'bg-[#fe5050]/10';
    outline = 'outline-[#fe5050]';
    text = 'text-[#fe5050]';
    icon = '/booking/redx.svg';
  } else {
    bg = 'bg-[#ecfcf2]';
    outline = 'outline-[#aaefc6]';
    text = 'text-[#057647]';
    icon = '/booking/check.svg';
  }

  // Capitalize first letter
  const label = value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <div>
      <div className={`pl-1.5 pr-2 py-2 ${bg} ${outline} rounded-2xl outline-1 outline-offset-[-1px] flex justify-center w-full lg:w-[90%] items-center gap-1`}>
        <Image
          src={icon}
          alt={value}
          width={16}
          height={16}
          className="w-3 h-3 object-contain"
        />
        <span className={`text-xs ${text}`}>{label}</span>
      </div>
    </div>
  )
}

export default RefundStatuse
