import dayjs from 'dayjs'

function DateCheck({date}) {
  return (
    <div>
     {date ? dayjs(date).format("YYYY-MM-DD") : "N/A"}
    </div>
  )
}

export default DateCheck
