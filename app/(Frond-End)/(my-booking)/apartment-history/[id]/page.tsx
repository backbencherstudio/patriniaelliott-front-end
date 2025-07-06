import Details from '../../component/apartment/details';

export const hotelData = [
    {
      id: 1,
      name: "Mandarin Oriental",
      image: "/profile.png",
      bookingDate: "Feb 6, 2022",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 2,
      name: "The Knicker Hotel",
      image: "/profile.png",
      bookingDate: "April 16, 2022",
      amount: "$2999",
      status: "Canceled"
    },
    {
      id: 3,
      name: "The Beverly Hills Hotel",
      image: "/profile.png",
      bookingDate: "May 22, 2023",
      amount: "$3559",
      status: "Completed"
    },
    {
      id: 4,
      name: "The Hopkins Hotel",
      image: "/profile.png",
      bookingDate: "Jun 5, 2024",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 5,
      name: "The Plaza Hotel",
      image: "/profile.png",
      bookingDate: "Sep 9, 2024",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 6,
      name: "The Greenbrier",
      image: "/profile.png",
      bookingDate: "Jan 8, 2025",
      amount: "$2999",
      status: "Completed"
    }
  ];

async function page({params}:any) {
const {id} = await params
console.log(id);

const apartment = hotelData?.find((item)=>item?.id == id)
console.log(apartment);

  return (
    <div>
      <Details back={`/apartment-history`} apartment={apartment}/>
    </div>
  )
}

export default page
