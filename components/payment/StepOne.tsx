"use client";
import Image from "next/image";
import { BiEditAlt } from "react-icons/bi";
export default function StepOne({data,guests,setGuests}:{data?:any,guests:any,setGuests:any}) {
  const handleAddGuest = () => {
    setGuests((prev) => [
      ...prev,
      { firstName: "", lastName: "", email: "", phone: "" },
    ]);
  };


  const handleChange = (index, field, value) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
  };

  

  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-2xl lg:text-5xl font-medium text-headerColor">
        Booking Details
      </h2>

      <div className="mb-8">
        <h4 className="text-2xl text-headerColor font-medium leading-[150%]">
          Guest information
        </h4>
        <p className="text-descriptionColor text-sm mt-0.5">
          Guest names must match the valid ID which will be used at check-in.
        </p>
      </div>

      {/* Logged-in user preview */}
      <div className="flex items-center gap-4 py-5 px-4 bg-white border rounded-lg ">
        <Image
        width={40}
         height={40}
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
          alt="avatar"
        />
        <div className="flex-1 text-base">
          <p className="font-medium  text-headerColor">{data?.name}</p>
          <p className="text-descriptionColor text-sm mt-1">
            Email:{" "}
            <span className="text-headerColor">{data?.email}</span>{" "}
            • Number: <span className="text-headerColor">{data?.phone_number}</span>
          </p>
        </div>
        <button className=" cursor-pointer">
          <BiEditAlt className="text-blueColor" size={24} />
        </button>
      </div>

      {/* {guests.map((guest, index) => (
        <div>
          <h3 className="font-semibold text-xl text-headerColor mb-2">
            Guest {index + 1}
          </h3>
          <div className="p-4 bg-gray-50  rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor={`firstName-${index}`}
                  className="text-base font-medium text-headerColor"
                >
                  First name
                </label>
                <input
                  id={`firstName-${index}`}
                  placeholder="First name"
                  value={guest.firstName}
                  className=" border border-grayColor1/20 rounded-sm block w-full px-2 py-3"
                  onChange={(e) =>
                    handleChange(index, "firstName", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`lastName-${index}`}
                  className="text-base font-medium text-headerColor"
                >
                  Last name
                </label>
                <input
                  id={`lastName-${index}`}
                  placeholder="Last name"
                  className=" border border-grayColor1/20 rounded-sm block w-full px-2 py-3"
                  value={guest.lastName}
                  onChange={(e) =>
                    handleChange(index, "lastName", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`email-${index}`}
                  className="text-base font-medium text-headerColor"
                >
                  Email
                </label>
                <input
                  id={`email-${index}`}
                  placeholder="Email"
                  className=" border border-grayColor1/20 rounded-sm block w-full px-2 py-3"
                  value={guest.email}
                  onChange={(e) => handleChange(index, "email", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`phone-${index}`}
                  className="text-base font-medium text-headerColor"
                >
                  Phone number
                </label>
                <input
                  id={`phone-${index}`}
                  placeholder="Phone number"
                  className=" border border-grayColor1/20 rounded-sm block w-full px-2 py-3"
                  value={guest.phone}
                  onChange={(e) => handleChange(index, "phone", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))} */}
      {/* <div className="justify-end flex">
        <button
          className="text-blueColor flex items-center gap-2  text-lg  cursor-pointer"
          onClick={handleAddGuest}
        >
          <CiCirclePlus /> Add new guest (optional)
        </button>
      </div> */}
    </div>
  );
}
