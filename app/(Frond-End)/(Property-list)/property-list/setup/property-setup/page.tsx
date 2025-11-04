"use client"

import Dropdownmenu from "@/components/reusable/Dropdownmenu";
import PropertySuggestion from "@/components/reusable/PropertySuggestion";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { usePropertyContext } from "@/provider/PropertySetupProvider";
import { Check } from "lucide-react";
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import AddExtraServices from "../_components/AddExtraServices";
import PolicyEditor from '../../_components/PolicyEditor';
import toast, { Toaster } from "react-hot-toast";


export default function page() {
    const router = useRouter()
    const { listProperty, updateListProperty } = usePropertyContext();
    const [numberOfGuest, setNumberOfGuest] = useState(0)
    const [numberOfBathRooms, setnumberOfBathRooms] = useState(0);
    const [selectedApartmentSizeType, setSelectedApartmentSizeType] = useState("")
    const [guestGeneral, setGuestGeneral] = useState({ "air_condition": false, "heating": false, "free_wifi": false, "ev_charging": false })
    const [guestCooking, setGuestCooking] = useState({ "kitchen": false, "kitchenette": false, "washing_machine": false })
    const [guestEntertainment, setGuestEntertainment] = useState({ "flat_tv": false, "pool": false, 'minibar': false, "sauna": false })
    const [guestParking, setGuestParking] = useState({ "price": 0, "isavailable": "yes_free", "reservation": "reservation", "parkingtype": "private" })
    const [guestFood, setGuestFood] = useState({ "breakfast": "yes" })
    const [houseRules, setHouseRules] = useState({ "smoking": false, "pets": false, "children": false, "events": false })
    const [formData, setFormData] = useState({})
    const [services, setServices] = useState([]);
    const [bedrooms, setBedRooms] = useState<
        {
            name: string;
            description: string;
            bedrooms: bedTypes;
            max_guests: number;
            bathrooms: number;
            size_sqm?: number;
            price: number;
        }[]
    >([{
        name: "alsdkfjlaskdjf;lasd fkalsdjf",
        description: "alskdjflaksjdf;lkasjdf;lkajs",
        bedrooms: {
            single_bed: 2,
            double_bed: 1,
            large_bed: 0,
            extra_large_bed: 0
        },
        max_guests: 3,
        bathrooms: 2,
        price: 120
    }]);


    interface bedTypes {
        single_bed?: number;
        double_bed?: number;
        large_bed?: number;
        extra_large_bed?: number;
    }

    const bedIcons = {
        single_bed: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
                <path d="M78.25 48h-60.5C16.1 48 15 49.1 15 50.77v30.46C15 82.9 16.1 84 17.75 84s2.75-1.1 2.75-2.77V70.15h55v11.08c0 1.66 1.1 2.77 2.75 2.77S81 82.9 81 81.23V50.77C81 49.1 79.9 48 78.25 48zm-22-27.7h-27.5v-5.53c0-1.66-1.1-2.77-2.75-2.77s-2.75 1.1-2.75 2.77v27.7h33V20.3z" fill="currentColor"></path>
                <path d="M72.75 23.08v-8.3c0-1.67-1.1-2.78-2.75-2.78s-2.75 1.1-2.75 2.77v5.54h-27.5v22.16h33V23.08z" fill="currentColor"></path>
            </svg>
        ),
        double_bed: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
                <path d="M89.25 48H6.75C5.1 48 4 49.1 4 50.77v30.46C4 82.9 5.1 84 6.75 84s2.75-1.1 2.75-2.77V70.15h77v11.08c0 1.66 1.1 2.77 2.75 2.77S92 82.9 92 81.23V50.77C92 49.1 90.9 48 89.25 48zm-44-27.7h-27.5v-5.53c0-1.66-1.1-2.77-2.75-2.77s-2.75 1.1-2.75 2.77v27.7h33V20.3zm38.5 2.78v-8.3c0-1.67-1.1-2.78-2.75-2.78s-2.75 1.1-2.75 2.77v5.54h-27.5v22.16h33V23.08z" fill="currentColor"></path>
            </svg>
        ),
        large_bed: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
                <path d="M89.25 48H6.75C5.1 48 4 49.1 4 50.77v30.46C4 82.9 5.1 84 6.75 84s2.75-1.1 2.75-2.77V70.15h77v11.08c0 1.66 1.1 2.77 2.75 2.77S92 82.9 92 81.23V50.77C92 49.1 90.9 48 89.25 48zm-44-27.7h-27.5v-5.53c0-1.66-1.1-2.77-2.75-2.77s-2.75 1.1-2.75 2.77v27.7h33V20.3zm38.5 2.78v-8.3c0-1.67-1.1-2.78-2.75-2.78s-2.75 1.1-2.75 2.77v5.54h-27.5v22.16h33V23.08z" fill="currentColor"></path>
            </svg>
        ),
        extra_large_bed: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
                <path d="M89.25 48H6.75C5.1 48 4 49.1 4 50.77v30.46C4 82.9 5.1 84 6.75 84s2.75-1.1 2.75-2.77V70.15h77v11.08c0 1.66 1.1 2.77 2.75 2.77S92 82.9 92 81.23V50.77C92 49.1 90.9 48 89.25 48zm-44-27.7h-27.5v-5.53c0-1.66-1.1-2.77-2.75-2.77s-2.75 1.1-2.75 2.77v27.7h33V20.3zm38.5 2.78v-8.3c0-1.67-1.1-2.78-2.75-2.78s-2.75 1.1-2.75 2.77v5.54h-27.5v22.16h33V23.08z" fill="currentColor"></path>
            </svg>
        ),
    };

    // State for dialog
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [propertyName, setPropertyName] = useState("")
    const [propertyDescription, setPropertyDescription] = useState("");
    const [apartmentsize, setApartmentsize] = useState(0);
    // Temporary state while adding/editing a bedroom
    const [newBedroomTitle, setNewBedroomTitle] = useState("");
    const [newBedroomDesc, setNewBedroomDesc] = useState("");
    const [newBedroomPrice, setNewBedroomPrice] = useState(0);
    const [totalBedRooms, setTotalBedRooms] = useState(0)
    const [newBedCounts, setNewBedCounts] = useState<bedTypes>({
        single_bed: 0,
        double_bed: 0,
        large_bed: 0,
        extra_large_bed: 0
    });

    const increaseNewBed = (type: string) => {
        setNewBedCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
        setTotalBedRooms(prev => prev + 1)
    };

    const decreaseNewBed = (type: string) => {
        setNewBedCounts((prev) => ({
            ...prev,
            [type]: prev[type] > 0 ? prev[type] - 1 : 0,
        }));
        setTotalBedRooms(prev => prev - 1);
    };

    const openEditDialog = (index: number) => {
        const room = bedrooms[index];
        setNewBedroomTitle(room.name);
        setNewBedCounts({ ...room.bedrooms });
        setEditingIndex(index);
        setDialogOpen(true);
        setApartmentsize(room?.size_sqm);
        setNewBedroomDesc(room?.description);
        setNewBedroomPrice(room?.price);
        setNumberOfGuest(room?.max_guests);
        setnumberOfBathRooms(room?.bathrooms);
    };

    const handleExtraServices = (data: { name: string, price: number }[]) => {
        setServices(data);
    }

    const openAddDialog = () => {
        setNewBedroomTitle("");
        setNewBedCounts({
            single_bed: 0,
            double_bed: 0,
            large_bed: 0,
            extra_large_bed: 0,
        });
        setEditingIndex(null);
        setDialogOpen(true);
    };

    const saveBedroom = () => {
        if (!newBedroomTitle) {
            toast.error("Please enter bedroom title");
            return;
        };

        const newBedroom = {
            name: newBedroomTitle,
            bedrooms: { ...newBedCounts },
            description: newBedroomDesc,
            max_guests: numberOfGuest,
            bathrooms: numberOfBathRooms,
            size_sqm: apartmentsize,
            price: newBedroomPrice
        };

        if (editingIndex !== null) {
            // Update existing bedroom
            setBedRooms((prev) => {
                const updated = [...prev];
                updated[editingIndex] = newBedroom;
                return updated;
            });
        } else {
            // Add new bedroom
            setBedRooms((prev) => [...prev, newBedroom]);
        }

        // Close dialog and reset state
        setDialogOpen(false);
        setNewBedroomTitle("");
        setNewBedCounts({
            single_bed: 0,
            double_bed: 0,
            large_bed: 0,
            extra_large_bed: 0,
        });
        setNewBedroomDesc('');
        setNewBedroomPrice(0);
        setApartmentsize(0);
        setnumberOfBathRooms(0);
        setNumberOfGuest(0);
        setEditingIndex(null);
        console.log("Total bedrooms : ", totalBedRooms)
    };

    const deleteBedroom = (index: number) => {
        setBedRooms((prev) => prev.filter((_, i) => i !== index));
    };

    const handleApartmentSizeType = (data: FormEvent<HTMLFormElement>) => {
        setSelectedApartmentSizeType(data.currentTarget.value)
    }

    // State for check-in times
    const [checkIn, setCheckIn] = useState({
        from: "3:00 PM",
        until: "6:00 PM"
    });

    // State for check-out times
    const [checkOut, setCheckOut] = useState({
        from: "8:00 AM",
        until: "11:00 AM"
    });

    // Time options
    const ampmTimes = [
        "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM",
        "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
        "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
    ];
    const checkInFromOptions = ampmTimes;
    const checkInUntilOptions = ampmTimes;
    const checkOutFromOptions = ampmTimes;
    const checkOutUntilOptions = ampmTimes;

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData({
            name: propertyName,
            bedroom: bedrooms,
            guestgeneral: guestGeneral,
            guestcooking: guestCooking,
            guestentertainment: guestEntertainment,
            guestfood: guestFood,
            guestparking: guestParking,
            houserules: houseRules,
            checkin: checkIn,
            checkout: checkOut
        })

        updateListProperty({
            name: propertyName,
            property_description: propertyDescription,
            general: {
                wifi: guestGeneral.free_wifi,
                air_conditioning: guestGeneral.air_condition,
                heating: guestGeneral.heating,
                electric_vehicle_charging_station: guestGeneral.ev_charging
            },
            cooking_cleaning: {
                kitchen: guestCooking.kitchen,
                kitchenette: guestCooking.kitchenette,
                washing_machine: guestCooking.washing_machine
            },
            entertainment: {
                flat_screen_tv: guestEntertainment.flat_tv,
                swimming_pool: guestEntertainment.pool,
                minibar: guestEntertainment.minibar,
                sauna: guestEntertainment.sauna
            },
            breakfast_available: guestFood.breakfast === "yes",
            parking: {
                available: guestParking.isavailable === "yes_free" || guestParking.isavailable === "yes_paid",
                reserveParkingSpot: guestParking.reservation === "yes",
                parkingType: guestParking.parkingtype === 'public',
                cost: guestParking.price,
                type: guestParking.reservation === "yes_free" ? "free" : "paid"
            },
            house_rules: {
                no_smoking: houseRules.smoking,
                no_pets: houseRules.pets,
                no_children: houseRules.children,
                parties_allowed: houseRules.events
            },
            check_in_from: checkIn.from,
            check_in_untill: checkIn.until,
            check_out_from: checkOut.from,
            check_out_untill: checkOut.until,
            bedrooms: [...bedrooms],
            // bathrooms: numberOfBathRooms,
            // number_of_guest_allowed: numberOfGuest,
            total_bedroom: totalBedRooms,
            extra_services: services,
            // apartment_size: apartmentsize.toString()
        })

        router.push("/property-list/setup/apartment-photos")
    }

    return (
        <div className="flex justify-center items-center w-full bg-[#F6F7F7] relative">
            <Toaster />
            <div className="py-15 px-4 max-w-[1320px] w-full space-y-[48px]">
                <div className="flex gap-6 w-full">
                    <form className="flex-1 space-y-5" onSubmit={(e) => handleSubmitForm(e)}>

                        {/* First part of the form */}

                        <div className="flex gap-6 w-full">
                            <div className="p-6 space-y-5 select-none bg-white rounded-lg flex-1">
                                <h3>Property Details</h3>
                                <div>
                                    <label htmlFor="property-name" className="block text-[#070707] font-medium mb-3">Property Name</label>
                                    <input type="text" name="property-name" id="property-name" placeholder="Enter property name" className="outline-none  w-full border px-2 py-2 md:p-3 rounded-lg" onChange={(e) => setPropertyName(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="property-description" className="block text-[#070707] font-medium mb-3">Property Description</label>
                                    <PolicyEditor content={propertyDescription} onContentChange={(data) => setPropertyDescription(data)} />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="bedrooms" className="block text-[#070707] font-medium">Bedrooms</label>
                                    {bedrooms.map((room, idx) => (
                                        <div key={idx} className="p-3 rounded-lg border cursor-pointer relative group space-y-3" onClick={() => openEditDialog(idx)}>
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 rounded-full"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteBedroom(idx);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                            <div className="">
                                                <h4 className="font-semibold text-lg">{room.name}</h4>
                                                <ul className="text-sm text-gray-600 list-none pl-5 flex gap-3 flex-wrap font-medium">
                                                    {Object.entries(room.bedrooms)
                                                        .filter(([_, count]) => count > 0)
                                                        .map(([type, count]) => (
                                                            <li key={type}>
                                                                {count} × {type.split("_").join(" ")}
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <div>
                                                    <span>Price: </span>
                                                    <span>${room?.price}</span>
                                                </div>
                                                <div>
                                                    <span>Maximum guests: </span>
                                                    <span>{room?.max_guests}</span>
                                                </div>
                                                <div>
                                                    <span>Bathrooms : </span>
                                                    <span>{room?.bathrooms}</span>
                                                </div>
                                                {room?.size_sqm&&<div>
                                                    <span>Size : </span>
                                                    <span>{room?.size_sqm} sqrm</span>
                                                </div>}
                                            </div>
                                            <p className="text-xs">{room?.description}</p>
                                        </div>
                                    ))}
                                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                        <DialogTrigger className="flex items-center gap-2 p-[10px] border border-[#E9E9EA] w-fit rounded-[8px] cursor-pointer" onClick={openAddDialog}>
                                            <div className="bg-[#0068EF] w-[16px] h-[16px] rounded-full flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M8.00057 12C7.70032 12 7.45703 11.7567 7.45703 11.4565V4.54354C7.45703 4.24329 7.70032 4 8.00057 4C8.30082 4 8.54411 4.24329 8.54411 4.54354V11.4565C8.54411 11.7567 8.30082 12 8.00057 12Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M11.4565 8.54411H4.54354C4.24329 8.54411 4 8.30082 4 8.00057C4 7.70032 4.24329 7.45703 4.54354 7.45703H11.4565C11.7567 7.45703 12 7.70032 12 8.00057C12 8.30082 11.7567 8.54411 11.4565 8.54411Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-[#0068EF] text-sm font-medium">Add bedroom</h3>
                                        </DialogTrigger>

                                        <DialogContent className="[&>button]:hidden p-0 overflow-hidden py-4">
                                            <div className=" h-full overflow-y-auto max-h-[600px] space-y-4 px-4">
                                                <div className="border p-4 rounded-lg">
                                                    <DialogTitle className="pb-5">
                                                        {editingIndex !== null ? 'Edit Bedroom' : 'Which beds are available in this room?'}
                                                    </DialogTitle>
                                                    <div className="space-y-6">
                                                        {/* Title input */}
                                                        <div className="flex flex-col gap-1">
                                                            <label htmlFor="title">Enter bedroom title</label>
                                                            <input
                                                                type="text"
                                                                name="title"
                                                                id="title"
                                                                placeholder="Enter bedroom title"
                                                                value={newBedroomTitle}
                                                                onChange={(e) => setNewBedroomTitle(e.target.value)}
                                                                className="outline-none border px-2 py-2 rounded-lg"
                                                            />
                                                        </div>

                                                        {/* Bed types list */}
                                                        <div className="text-[#D6AE29] space-y-4">
                                                            {Object.keys(bedIcons).map((item) => (
                                                                <div key={item} className="flex items-center gap-2">
                                                                    <div className="w-7">{bedIcons[item]}</div>

                                                                    <div className="capitalize flex-1 text-[#4A4C56] font-medium text-base">
                                                                        {item.split("_").join(" ")}
                                                                    </div>

                                                                    <div className="w-fit px-[10px] py-[13px] border border-[#E9E9EA] rounded-[8px] flex gap-4 items-center select-none">

                                                                        {/* Decrease */}
                                                                        <div
                                                                            className="border border-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center"
                                                                            onClick={() => decreaseNewBed(item)}
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M11.5545 7.99913C11.5545 8.11701 11.5076 8.23005 11.4243 8.3134C11.3409 8.39675 11.2279 8.44358 11.11 8.44358H4.8878C4.76993 8.44358 4.65688 8.39675 4.57353 8.3134C4.49018 8.23005 4.44336 8.11701 4.44336 7.99913C4.44336 7.88126 4.49018 7.76821 4.57353 7.68486C4.65688 7.60151 4.76993 7.55469 4.8878 7.55469H11.11C11.2279 7.55469 11.3409 7.60151 11.4243 7.68486C11.5076 7.76821 11.5545 7.88126 11.5545 7.99913Z" fill="#D6AE29" /> </svg>
                                                                        </div>
                                                                        {/* Count */}
                                                                        <div className="text-[#4A4C56] text-sm w-[20px] text-center">
                                                                            {newBedCounts[item] || 0}
                                                                        </div>
                                                                        {/* Increase */}
                                                                        <div
                                                                            className="bg-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center"
                                                                            onClick={() => increaseNewBed(item)}
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" > <path d="M8.00057 12C7.70032 12 7.45703 11.7567 7.45703 11.4565V4.54354C7.45703 4.24329 7.70032 4 8.00057 4C8.30082 4 8.54411 4.24329 8.54411 4.54354V11.4565C8.54411 11.7567 8.30082 12 8.00057 12Z" fill="black" /> <path d="M11.4565 8.54411H4.54354C4.24329 8.54411 4 8.30082 4 8.00057C4 7.70032 4.24329 7.45703 4.54354 7.45703H11.4565C11.7567 7.45703 12 7.70032 12 8.00057C12 8.30082 11.7567 8.54411 11.4565 8.54411Z" fill="black" /> </svg>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="price" className="text-sm text-gray-600">Price</label>
                                                    <input
                                                        type="number"
                                                        id="price"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        placeholder="Enter price"
                                                        value={newBedroomPrice}
                                                        onChange={(e) => setNewBedroomPrice(Number(e.target.value))}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="desc">Enter bedroom description</label>
                                                    <textarea
                                                        name="desc"
                                                        id="desc"
                                                        placeholder="Enter bedroom description"
                                                        value={newBedroomDesc}
                                                        onChange={(e) => setNewBedroomDesc(e.target.value)}
                                                        className="outline-none border px-2 py-2 rounded-lg resize-none h-[120px]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-[#070707] font-medium">How many guests can stay?</h3>
                                                    <div className="w-fit px-[10px] py-[13px] border border-[#E9E9EA] rounded-[8px] flex gap-4 select-none">
                                                        <div className="border border-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center" onClick={() => setNumberOfGuest(prev => (prev > 0 ? prev - 1 : prev))}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.5545 7.99913C11.5545 8.11701 11.5076 8.23005 11.4243 8.3134C11.3409 8.39675 11.2279 8.44358 11.11 8.44358H4.8878C4.76993 8.44358 4.65688 8.39675 4.57353 8.3134C4.49018 8.23005 4.44336 8.11701 4.44336 7.99913C4.44336 7.88126 4.49018 7.76821 4.57353 7.68486C4.65688 7.60151 4.76993 7.55469 4.8878 7.55469H11.11C11.2279 7.55469 11.3409 7.60151 11.4243 7.68486C11.5076 7.76821 11.5545 7.88126 11.5545 7.99913Z" fill="#D6AE29" />
                                                            </svg>
                                                        </div>
                                                        <div className="text-[#4A4C56] text-sm flex items-center justify-center w-[20px]">{numberOfGuest < 9 ? `0${numberOfGuest}` : numberOfGuest}</div>
                                                        <div className="bg-[#D6AE29] border border-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center" onClick={() => setNumberOfGuest(prev => prev + 1)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M8.00057 12C7.70032 12 7.45703 11.7567 7.45703 11.4565V4.54354C7.45703 4.24329 7.70032 4 8.00057 4C8.30082 4 8.54411 4.24329 8.54411 4.54354V11.4565C8.54411 11.7567 8.30082 12 8.00057 12Z" fill="black" />
                                                                <path d="M11.4565 8.54411H4.54354C4.24329 8.54411 4 8.30082 4 8.00057C4 7.70032 4.24329 7.45703 4.54354 7.45703H11.4565C11.7567 7.45703 12 7.70032 12 8.00057C12 8.30082 11.7567 8.54411 11.4565 8.54411Z" fill="black" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-[#070707] font-medium">How many bathrooms are there?</h3>
                                                    <div className="w-fit px-[10px] py-[13px] border border-[#E9E9EA] rounded-[8px] flex gap-4 select-none">
                                                        <div className="border border-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center" onClick={() => setnumberOfBathRooms(prev => (prev > 0 ? prev - 1 : prev))}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.5545 7.99913C11.5545 8.11701 11.5076 8.23005 11.4243 8.3134C11.3409 8.39675 11.2279 8.44358 11.11 8.44358H4.8878C4.76993 8.44358 4.65688 8.39675 4.57353 8.3134C4.49018 8.23005 4.44336 8.11701 4.44336 7.99913C4.44336 7.88126 4.49018 7.76821 4.57353 7.68486C4.65688 7.60151 4.76993 7.55469 4.8878 7.55469H11.11C11.2279 7.55469 11.3409 7.60151 11.4243 7.68486C11.5076 7.76821 11.5545 7.88126 11.5545 7.99913Z" fill="#D6AE29" />
                                                            </svg>
                                                        </div>
                                                        <div className="text-[#4A4C56] text-sm flex items-center justify-center w-[20px]">{numberOfBathRooms < 9 ? `0${numberOfBathRooms}` : numberOfBathRooms}</div>
                                                        <div className="bg-[#D6AE29] border border-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center" onClick={() => setnumberOfBathRooms(prev => prev + 1)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M8.00057 12C7.70032 12 7.45703 11.7567 7.45703 11.4565V4.54354C7.45703 4.24329 7.70032 4 8.00057 4C8.30082 4 8.54411 4.24329 8.54411 4.54354V11.4565C8.54411 11.7567 8.30082 12 8.00057 12Z" fill="black" />
                                                                <path d="M11.4565 8.54411H4.54354C4.24329 8.54411 4 8.30082 4 8.00057C4 7.70032 4.24329 7.45703 4.54354 7.45703H11.4565C11.7567 7.45703 12 7.70032 12 8.00057C12 8.30082 11.7567 8.54411 11.4565 8.54411Z" fill="black" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex gap-1">
                                                        <h3 className="text-[#070707] text-base font-medium">Apartment size</h3>
                                                        <span className="text-[#777980] text-sm">(optional)</span>
                                                    </div>
                                                    <div className="flex flex-col lg:flex-row gap-2">
                                                        <input type="number" id="apartmentsize" placeholder="Square meter" value={apartmentsize} onChange={(e) => setApartmentsize(Number(e.target.value))} name="apartmentsize" className="flex-1 outline-none border border-[#E9E9EA] rounded-[8px] p-4 text-[#777980] text-sm flex items-center" />
                                                        {/* <div className="w-[165px]">
                                                            <Dropdownmenu data={[{ code: "square_meter", name: "Square meters" }]} handleSelect={handleApartmentSizeType} selectedData={selectedApartmentSizeType} title="type" showTitle={false} />
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setDialogOpen(false)}
                                                        className="text-[#D6AE29] px-6 py-2 border border-[#D6AE29] rounded-[8px] cursor-pointer text-lg"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={saveBedroom}
                                                        className="text-[#fff] px-6 py-2 border border-[#fff] bg-[#D6AE29] rounded-[8px] cursor-pointer text-lg"
                                                    >
                                                        {editingIndex !== null ? 'Update' : 'Save'}
                                                    </button>
                                                </div>
                                            </div>
                                        </DialogContent>

                                    </Dialog>
                                </div>
                                {/* <div className="space-y-2">
                                    <h3 className="text-[#070707] font-medium">How many guests can stay?</h3>
                                    <div className="w-fit px-[10px] py-[13px] border border-[#E9E9EA] rounded-[8px] flex gap-4">
                                        <div className="border border-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center" onClick={() => setNumberOfGuest(prev => (prev > 0 ? prev - 1 : prev))}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.5545 7.99913C11.5545 8.11701 11.5076 8.23005 11.4243 8.3134C11.3409 8.39675 11.2279 8.44358 11.11 8.44358H4.8878C4.76993 8.44358 4.65688 8.39675 4.57353 8.3134C4.49018 8.23005 4.44336 8.11701 4.44336 7.99913C4.44336 7.88126 4.49018 7.76821 4.57353 7.68486C4.65688 7.60151 4.76993 7.55469 4.8878 7.55469H11.11C11.2279 7.55469 11.3409 7.60151 11.4243 7.68486C11.5076 7.76821 11.5545 7.88126 11.5545 7.99913Z" fill="#D6AE29" />
                                            </svg>
                                        </div>
                                        <div className="text-[#4A4C56] text-sm flex items-center justify-center w-[20px]">{numberOfGuest < 9 ? `0${numberOfGuest}` : numberOfGuest}</div>
                                        <div className="bg-[#D6AE29] border border-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center" onClick={() => setNumberOfGuest(prev => prev + 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8.00057 12C7.70032 12 7.45703 11.7567 7.45703 11.4565V4.54354C7.45703 4.24329 7.70032 4 8.00057 4C8.30082 4 8.54411 4.24329 8.54411 4.54354V11.4565C8.54411 11.7567 8.30082 12 8.00057 12Z" fill="black" />
                                                <path d="M11.4565 8.54411H4.54354C4.24329 8.54411 4 8.30082 4 8.00057C4 7.70032 4.24329 7.45703 4.54354 7.45703H11.4565C11.7567 7.45703 12 7.70032 12 8.00057C12 8.30082 11.7567 8.54411 11.4565 8.54411Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-[#070707] font-medium">How many bathrooms are there?</h3>
                                    <div className="w-fit px-[10px] py-[13px] border border-[#E9E9EA] rounded-[8px] flex gap-4">
                                        <div className="border border-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center" onClick={() => setnumberOfBathRooms(prev => (prev > 0 ? prev - 1 : prev))}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.5545 7.99913C11.5545 8.11701 11.5076 8.23005 11.4243 8.3134C11.3409 8.39675 11.2279 8.44358 11.11 8.44358H4.8878C4.76993 8.44358 4.65688 8.39675 4.57353 8.3134C4.49018 8.23005 4.44336 8.11701 4.44336 7.99913C4.44336 7.88126 4.49018 7.76821 4.57353 7.68486C4.65688 7.60151 4.76993 7.55469 4.8878 7.55469H11.11C11.2279 7.55469 11.3409 7.60151 11.4243 7.68486C11.5076 7.76821 11.5545 7.88126 11.5545 7.99913Z" fill="#D6AE29" />
                                            </svg>
                                        </div>
                                        <div className="text-[#4A4C56] text-sm flex items-center justify-center w-[20px]">{numberOfBathRooms < 9 ? `0${numberOfBathRooms}` : numberOfBathRooms}</div>
                                        <div className="bg-[#D6AE29] border border-[#D6AE29] rounded-full cursor-pointer p-[6px] flex items-center justify-center" onClick={() => setnumberOfBathRooms(prev => prev + 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8.00057 12C7.70032 12 7.45703 11.7567 7.45703 11.4565V4.54354C7.45703 4.24329 7.70032 4 8.00057 4C8.30082 4 8.54411 4.24329 8.54411 4.54354V11.4565C8.54411 11.7567 8.30082 12 8.00057 12Z" fill="black" />
                                                <path d="M11.4565 8.54411H4.54354C4.24329 8.54411 4 8.30082 4 8.00057C4 7.70032 4.24329 7.45703 4.54354 7.45703H11.4565C11.7567 7.45703 12 7.70032 12 8.00057C12 8.30082 11.7567 8.54411 11.4565 8.54411Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex gap-1">
                                        <h3 className="text-[#070707] text-base font-medium">Apartment size</h3>
                                        <span className="text-[#777980] text-sm">(optional)</span>
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-2">
                                        <input type="number" id="apartmentsize" value={apartmentsize} onChange={(e) => setApartmentsize(e.target.value)} name="apartmentsize" className="flex-1 outline-none border border-[#E9E9EA] rounded-[8px] p-4 text-[#777980] text-sm flex items-center" />
                                        <div className="w-[165px]">
                                            <Dropdownmenu data={[{ code: "square_meter", name: "Square meters" }]} handleSelect={handleApartmentSizeType} selectedData={selectedApartmentSizeType} title="type" showTitle={false} />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block"></div>
                        </div>


                        {/* Second part of the form */}

                        <div className="flex gap-6 w-full">
                            <div className="space-y-5 bg-white p-6 rounded-lg flex-1">
                                <h3 className="text-[#23262F] text-2xl font-medium">What can guests use at your place?</h3>

                                {/* General */}

                                <div className="space-y-3">
                                    <h2 className="text-[#070707] font-medium">General</h2>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="air_condition" id="air_condition" className="hidden" onChange={() => setGuestGeneral(prev => ({
                                            ...prev,
                                            air_condition: !prev.air_condition
                                        }))} />
                                        <label htmlFor="air_condition" className={`select-none w-[24px] h-[24px] ${!guestGeneral["air_condition"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestGeneral["air_condition"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Air conditioning</h3>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="heating" id="heating" className="hidden" onChange={() => setGuestGeneral(prev => ({
                                            ...prev,
                                            heating: !prev.heating
                                        }))} />
                                        <label htmlFor="heating" className={`select-none w-[24px] h-[24px] ${!guestGeneral["heating"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestGeneral["heating"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Heating</h3>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="free_wifi" id="free_wifi" className="hidden" onChange={() => setGuestGeneral(prev => ({
                                            ...prev,
                                            free_wifi: !prev.free_wifi
                                        }))} />
                                        <label htmlFor="free_wifi" className={`select-none w-[24px] h-[24px] ${!guestGeneral["free_wifi"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestGeneral["free_wifi"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Free WiFi</h3>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="ev_charging" id="ev_charging" className="hidden" onChange={() => setGuestGeneral(prev => ({
                                            ...prev,
                                            ev_charging: !prev.ev_charging
                                        }))} />
                                        <label htmlFor="ev_charging" className={`select-none w-[24px] h-[24px] ${!guestGeneral["ev_charging"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestGeneral["ev_charging"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Electric vehicle charging station</h3>
                                    </div>
                                </div>

                                {/* Cooking and cleaning */}

                                <div className="space-y-2">
                                    <h2 className="text-[#070707] font-medium">Cooking and cleaning</h2>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="kitchen" id="kitchen" className="hidden" onChange={() => setGuestCooking(prev => ({
                                            ...prev,
                                            kitchen: !prev.kitchen
                                        }))} />
                                        <label htmlFor="kitchen" className={`select-none w-[24px] h-[24px] ${!guestCooking["kitchen"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestCooking["kitchen"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Kitchen</h3>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="kitchenette" id="kitchenette" className="hidden" onChange={() => setGuestCooking(prev => ({
                                            ...prev,
                                            kitchenette: !prev.kitchenette
                                        }))} />
                                        <label htmlFor="kitchenette" className={`select-none w-[24px] h-[24px] ${!guestCooking["kitchenette"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestCooking["kitchenette"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Kitchenette</h3>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="washing_machine" id="washing_machine" className="hidden" onChange={() => setGuestCooking(prev => ({
                                            ...prev,
                                            washing_machine: !prev.washing_machine
                                        }))} />
                                        <label htmlFor="washing_machine" className={`select-none w-[24px] h-[24px] ${!guestCooking["washing_machine"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestCooking["washing_machine"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Washing machine</h3>
                                    </div>
                                </div>


                                {/* Entertainment */}

                                <div className="space-y-2">
                                    <h2 className="text-[#070707] font-medium">Entertainment</h2>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="flat_tv" id="flat_tv" className="hidden" onChange={() => setGuestEntertainment(prev => ({
                                            ...prev,
                                            flat_tv: !prev.flat_tv
                                        }))} />
                                        <label htmlFor="flat_tv" className={`select-none w-[24px] h-[24px] ${!guestEntertainment["flat_tv"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestEntertainment["flat_tv"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Flat-screen TV</h3>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="pool" id="pool" className="hidden" onChange={() => setGuestEntertainment(prev => ({
                                            ...prev,
                                            pool: !prev.pool
                                        }))} />
                                        <label htmlFor="pool" className={`select-none w-[24px] h-[24px] ${!guestEntertainment["pool"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestEntertainment["pool"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Swimming pool</h3>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="minibar" id="minibar" className="hidden" onChange={() => setGuestEntertainment(prev => ({
                                            ...prev,
                                            minibar: !prev.minibar
                                        }))} />
                                        <label htmlFor="minibar" className={`select-none w-[24px] h-[24px] ${!guestEntertainment["minibar"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestEntertainment["minibar"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Minibar</h3>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="sauna" id="sauna" className="hidden" onChange={() => setGuestEntertainment(prev => ({
                                            ...prev,
                                            sauna: !prev.sauna
                                        }))} />
                                        <label htmlFor="sauna" className={`select-none w-[24px] h-[24px] ${!guestEntertainment["sauna"] ? "border-[#777980]" : "border-[#D6AE29] bg-[#D6AE29]"} border-[2px] rounded-[6px] flex items-center justify-center`}>
                                            {guestEntertainment["sauna"] && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" fill="#D6AE29" />
                                                <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="3.75" stroke="#D6AE29" strokeWidth="1.5" />
                                                <path d="M16.25 7.0625L9.03125 14.2812L5.75 11" stroke="#070707" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>}
                                        </label>
                                        <h3 className="text-[#070707] text-sm">Sauna</h3>
                                    </div>
                                </div>

                            </div>
                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block"></div>
                        </div>


                        <div className="flex gap-6 w-full">
                            <div className="space-y-5 bg-white p-6 rounded-lg flex-1">
                                <h3 className="text-[#23262F] text-2xl font-medium">Add Extra Services</h3>
                                <AddExtraServices
                                    services={services}
                                    handleExtraServices={handleExtraServices}
                                />
                            </div>
                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block"></div>
                        </div>


                        {/* Other amenities */}


                        <div className="flex gap-6 w-full">
                            <div className="bg-white p-6 rounded-lg space-y-5 flex-1">
                                <h3 className="text-[#23262F] text-2xl font-medium">Other amenities</h3>
                                <div className="space-y-3">
                                    <h3 className="text-[#070707] font-medium">Do you serve guests breakfast?</h3>
                                    <div>
                                        <RadioGroup defaultValue={guestFood["breakfast"]} onValueChange={(e) => setGuestFood(prev => ({ ...prev, ["breakfast"]: e }))}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="yes" id="yes" />
                                                <Label htmlFor="yes" className="text-sm font-normal">Yes</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no" id="no" />
                                                <Label htmlFor="no" className="text-sm font-normal">No</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block"></div>
                        </div>




                        {/* Guest Parking Details */}

                        <div className="flex gap-6 w-full">
                            <div className="bg-white p-6 rounded-lg space-y-5 flex-1">
                                <div className="space-y-2">
                                    <h3 className="text-[#23262F] text-2xl font-medium">Other amenities</h3>
                                    <div className="space-y-2">
                                        <h2>How much does parking cost?</h2>
                                        <div className="space-y-2">
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <input type="number" placeholder="US$" value={guestParking["price"]} onChange={(e) => setGuestParking(prev => ({ ...prev, ["price"]: parseInt(e.target.value) }))} className="flex-1 outline-none border border-[#E9E9EA] rounded-[8px] p-4 text-[#777980] text-sm flex items-center" />
                                                <div className="w-[165px]">
                                                    <Dropdownmenu data={[{ code: "square_meter", name: "Square meters" }]} handleSelect={handleApartmentSizeType} selectedData={selectedApartmentSizeType} title="type" showTitle={false} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-[#070707] font-medium">Is parking available to guests?</h3>
                                    <div>
                                        <RadioGroup defaultValue={guestParking["isavailable"]} onValueChange={(e) => setGuestParking(prev => ({ ...prev, ["isavailable"]: e }))}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="yes_free" id="yes" />
                                                <Label htmlFor="yes" className="text-sm font-normal">Yes, Free</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="yes_paid" id="yes" />
                                                <Label htmlFor="yes" className="text-sm font-normal">Yes, Paid</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no" id="no" />
                                                <Label htmlFor="no" className="text-sm font-normal">No</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-[#070707] font-medium">Do guests need to reserve a parking spot?</h3>
                                    <div>
                                        <RadioGroup defaultValue={guestParking["reservation"]} onValueChange={(e) => setGuestParking(prev => ({ ...prev, ["reservation"]: e }))}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="reservation" id="reservation" />
                                                <Label htmlFor="reservation" className="text-sm font-normal">Reservation needed</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no_reservation" id="no_reservation" />
                                                <Label htmlFor="no_reservation" className="text-sm font-normal">No reservation needed</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-[#070707] font-medium">What type of parking is it?</h3>
                                    <div>
                                        <RadioGroup defaultValue={guestParking["parkingtype"]} onValueChange={(e) => setGuestParking(prev => ({ ...prev, ["parkingtype"]: e }))}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="private" id="private" />
                                                <Label htmlFor="private" className="text-sm font-normal">Private</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="public" id="public" />
                                                <Label htmlFor="public" className="text-sm font-normal">Public</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block"></div>
                        </div>


                        {/* House Rules */}

                        <div className="flex gap-6 w-full">
                            <div className="flex-1 space-y-5">
                                <div className="bg-white p-6 rounded-lg space-y-5">
                                    <h3 className="text-[#23262F] text-2xl font-medium">House Rules</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2 w-full justify-between">
                                            <Label htmlFor="smoking">Smoking allowed</Label>
                                            <Switch
                                                id="smoking"
                                                checked={houseRules["smoking"]}
                                                onCheckedChange={(e) => setHouseRules(prev => ({ ...prev, ["smoking"]: e }))}
                                                className="h-[20px] w-[36px] data-[state=checked]:bg-[#F7EFD4] data-[state=checked]:border-[#D6AE29] data-[state=checked]:border [&>span]:data-[state=checked]:bg-[#D6AE29] [&>span]:h-[15px] [&>span]:w-[15px] [&>span]:data-[state=checked]:translate-x-[16px]"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 w-full justify-between">
                                            <Label htmlFor="pets">Pets allowed</Label>
                                            <Switch
                                                id="pets"
                                                checked={houseRules["pets"]}
                                                onCheckedChange={(e) => setHouseRules(prev => ({ ...prev, ["pets"]: e }))}
                                                className="h-[20px] w-[36px] data-[state=checked]:bg-[#F7EFD4] data-[state=checked]:border-[#D6AE29] data-[state=checked]:border [&>span]:data-[state=checked]:bg-[#D6AE29] [&>span]:h-[15px] [&>span]:w-[15px] [&>span]:data-[state=checked]:translate-x-[16px]"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 w-full justify-between">
                                            <Label htmlFor="children">Children allowed</Label>
                                            <Switch
                                                id="children"
                                                checked={houseRules["children"]}
                                                onCheckedChange={(e) => setHouseRules(prev => ({ ...prev, ["children"]: e }))}
                                                className="h-[20px] w-[36px] data-[state=checked]:bg-[#F7EFD4] data-[state=checked]:border-[#D6AE29] data-[state=checked]:border [&>span]:data-[state=checked]:bg-[#D6AE29] [&>span]:h-[15px] [&>span]:w-[15px] [&>span]:data-[state=checked]:translate-x-[16px]"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 w-full justify-between">
                                            <Label htmlFor="events">Parties/events allowed</Label>
                                            <Switch
                                                id="events"
                                                checked={houseRules["events"]}
                                                onCheckedChange={(e) => setHouseRules(prev => ({ ...prev, ["events"]: e }))}
                                                className="h-[20px] w-[36px] data-[state=checked]:bg-[#F7EFD4] data-[state=checked]:border-[#D6AE29] data-[state=checked]:border [&>span]:data-[state=checked]:bg-[#D6AE29] [&>span]:h-[15px] [&>span]:w-[15px] [&>span]:data-[state=checked]:translate-x-[16px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Check-in Section */}
                                        <div>
                                            <h3 className="text-sm font-medium mb-2">Check in</h3>
                                            <div className="space-y-2">
                                                <div className="flex gap-3 justify-between text-[#070707]">
                                                    <span className="flex-1 pl-1 text-sm">From</span>
                                                    <span className="flex-1 pl-1 text-sm">Until</span>
                                                </div>
                                                <div className="flex gap-3 w-full">
                                                    {/* From Dropdown */}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" className="flex-1 justify-between hover:bg-transparent text-[#777980] text-sm shadow-none">
                                                                {checkIn.from}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path d="M8.0005 11.1672C7.8725 11.1672 7.74448 11.1185 7.64715 11.0205L2.98048 6.35386C2.78515 6.15852 2.78515 5.84183 2.98048 5.6465C3.17582 5.45117 3.49251 5.45117 3.68784 5.6465L8.00115 9.95981L12.3145 5.6465C12.5098 5.45117 12.8265 5.45117 13.0218 5.6465C13.2172 5.84183 13.2172 6.15852 13.0218 6.35386L8.35516 11.0205C8.25649 11.1185 8.1285 11.1672 8.0005 11.1672Z" fill="#777980" />
                                                                </svg>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            {checkInFromOptions.map((time) => (
                                                                <DropdownMenuItem
                                                                    key={time}
                                                                    onClick={() => setCheckIn({ ...checkIn, from: time })}
                                                                    className="flex justify-between"
                                                                >
                                                                    {time}
                                                                    {time === checkIn.from && <Check className="h-4 w-4" />}
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>

                                                    {/* Until Dropdown */}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" className="flex-1 justify-between hover:bg-transparent text-[#777980] text-sm">
                                                                {checkIn.until}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path d="M8.0005 11.1672C7.8725 11.1672 7.74448 11.1185 7.64715 11.0205L2.98048 6.35386C2.78515 6.15852 2.78515 5.84183 2.98048 5.6465C3.17582 5.45117 3.49251 5.45117 3.68784 5.6465L8.00115 9.95981L12.3145 5.6465C12.5098 5.45117 12.8265 5.45117 13.0218 5.6465C13.2172 5.84183 13.2172 6.15852 13.0218 6.35386L8.35516 11.0205C8.25649 11.1185 8.1285 11.1672 8.0005 11.1672Z" fill="#777980" />
                                                                </svg>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            {checkInUntilOptions.map((time) => (
                                                                <DropdownMenuItem
                                                                    key={time}
                                                                    onClick={() => setCheckIn({ ...checkIn, until: time })}
                                                                    className="flex justify-between"
                                                                >
                                                                    {time}
                                                                    {time === checkIn.until && <Check className="h-4 w-4" />}
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Check-out Section */}
                                        <div>
                                            <h3 className="text-sm font-medium mb-2">Check out</h3>
                                            <div className="space-y-2">
                                                <div className="flex gap-3 justify-between text-[#070707]">
                                                    <span className="flex-1 pl-1 text-sm ">From</span>
                                                    <span className="flex-1 pl-1 text-sm ">Until</span>
                                                </div>
                                                <div className="flex gap-3 ">
                                                    {/* From Dropdown */}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" className="flex-1 justify-between hover:bg-transparent text-[#777980] text-sm">
                                                                {checkOut.from}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path d="M8.0005 11.1672C7.8725 11.1672 7.74448 11.1185 7.64715 11.0205L2.98048 6.35386C2.78515 6.15852 2.78515 5.84183 2.98048 5.6465C3.17582 5.45117 3.49251 5.45117 3.68784 5.6465L8.00115 9.95981L12.3145 5.6465C12.5098 5.45117 12.8265 5.45117 13.0218 5.6465C13.2172 5.84183 13.2172 6.15852 13.0218 6.35386L8.35516 11.0205C8.25649 11.1185 8.1285 11.1672 8.0005 11.1672Z" fill="#777980" />
                                                                </svg>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            {checkOutFromOptions.map((time) => (
                                                                <DropdownMenuItem
                                                                    key={time}
                                                                    onClick={() => setCheckOut({ ...checkOut, from: time })}
                                                                    className="flex justify-between"
                                                                >
                                                                    {time}
                                                                    {time === checkOut.from && <Check className="h-4 w-4" />}
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>

                                                    {/* Until Dropdown */}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" className="flex-1 justify-between hover:bg-transparent text-[#777980] text-sm outline-none">
                                                                {checkOut.until}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path d="M8.0005 11.1672C7.8725 11.1672 7.74448 11.1185 7.64715 11.0205L2.98048 6.35386C2.78515 6.15852 2.78515 5.84183 2.98048 5.6465C3.17582 5.45117 3.49251 5.45117 3.68784 5.6465L8.00115 9.95981L12.3145 5.6465C12.5098 5.45117 12.8265 5.45117 13.0218 5.6465C13.2172 5.84183 13.2172 6.15852 13.0218 6.35386L8.35516 11.0205C8.25649 11.1185 8.1285 11.1672 8.0005 11.1672Z" fill="#777980" />
                                                                </svg>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            {checkOutUntilOptions.map((time) => (
                                                                <DropdownMenuItem
                                                                    key={time}
                                                                    onClick={() => setCheckOut({ ...checkOut, until: time })}
                                                                    className="flex justify-between"
                                                                >
                                                                    {time}
                                                                    {time === checkOut.until && <Check className="h-4 w-4" />}
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Navigation buttons */}

                                <div className="flex justify-between w-full space-x-3 px-4">
                                    <div className="text-[#0068EF] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#0068EF] rounded-[8px] cursor-pointer" onClick={() => router.back()}>Back</div>
                                    <button type="submit" className="text-[#fff] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] cursor-pointer">Continue</button>
                                </div>
                            </div>
                            <div className="w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block">
                                <PropertySuggestion
                                    title="What if my house rules change?"
                                    body="You can easily customize these
                                            house rules later, and you can set additional house rules on the
                                            Policies page of the Extranet after completing registration."
                                    isList={false} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}