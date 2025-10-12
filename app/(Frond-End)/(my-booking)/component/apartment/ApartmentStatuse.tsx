import Image from 'next/image'

function ApartmentStatuse({value}:any) {
  // Determine colors and icons based on status
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return {
          bg: 'bg-[#38c976]/10',
          outline: 'outline-[#abefc6]',
          text: 'text-[#067647]',
          icon: '/booking/check.svg'
        }
      case 'pending':
        return {
          bg: 'bg-[#ffa23a]/10',
          outline: 'outline-[#ffa23a]',
          text: 'text-[#ffa23a]',
          icon: '/booking/processing.svg'
        }
      case 'cancelled':
      case 'canceled':
      case 'rejected':
        return {
          bg: 'bg-[#fe5050]/10',
          outline: 'outline-[#fe5050]',
          text: 'text-[#fe5050]',
          icon: '/booking/redx.svg'
        }
      default:
        return {
          bg: 'bg-[#fe5050]/10',
          outline: 'outline-[#fe5050]',
          text: 'text-[#fe5050]',
          icon: '/booking/redx.svg'
        }
    }
  }

  const styles = getStatusStyles(value)

  return (
    <div>
       <div className={`pl-1.5 pr-2 py-2 ${styles.bg} ${styles.outline} rounded-2xl outline-1 outline-offset-[-1px] flex justify-center w-full lg:w-[90%] items-center gap-1`}>
          <Image
            src={styles.icon}
            alt={value}
            width={16}
            height={16}
            className="w-3 h-3 object-contain"
          />
          <span className={`text-xs ${styles.text}`}>{value}</span>
        </div>
    </div>
  )
}

export default ApartmentStatuse
