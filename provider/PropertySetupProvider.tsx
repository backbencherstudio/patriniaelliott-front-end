'use client'

import { createContext, useContext, useState } from "react";

const PropertyContext = createContext<{
    listProperty: formDataType | undefined;
    updateListProperty: (newData: Partial<formDataType>) => void;
}>({
    listProperty: undefined,
    updateListProperty: () => { },
});

// Create a custom hook for easier consumption
export const usePropertyContext = () => useContext(PropertyContext);

export default function PropertySetupProvider({ children }) {

    const [listProperty, setListProperty] = useState<formDataType>();

    // Function to update listProperty
    const updateListProperty = (newData: Partial<formDataType>) => {
        setListProperty(prev => ({
            ...prev,
            ...newData
        } as formDataType));
    };



    return (
        <PropertyContext.Provider value={{ listProperty, updateListProperty }}>
            <div>
                {children}
            </div>
        </PropertyContext.Provider>
    )
}



// Your existing interfaces...
interface bedTypes {
    single_bed?: number;
    double_bed?: number;
    large_bed?: number;
    extra_large_bed?: number;
}

interface bedroomsType {
    title: string;
    beds: bedTypes;
}

interface generalType {
    wifi: boolean;
    air_conditioning: boolean;
    heating: boolean;
    electric_vehicle_charging_station: boolean;
}

interface cookingCleaningType {
    kitchen: boolean;
    kitchenette: boolean;
    washing_machine: boolean;
}

interface entertainmentType {
    flat_screen_tv: boolean;
    swimming_pool: boolean;
    minibar: boolean;
    sauna: boolean;
}


type tripType={
    title: string;
    description: string;
    time: number;
    ticket: string;
}


type tripPlanType={
    tripPlan: tripType[];
    images: File[];
    id: string | null;
    day: number;
}


type tourType={
    title: string;
    description: string;
    tourImages: File[];
    meetingPoint: string;
    tripPlan: tripPlanType[];
    country: string;
    city: string;
    duration: number;
    durationType: string;
    price: number;
    cancellation_policy: string[];
    extra_service: string[];
    language: string[];
}

interface parkingType {
    cost: number;
    available: boolean;
    type?: string;
    reserveParkingSpot: boolean;
    parkingType: boolean;
}

interface houseRuleType {
    no_smoking: boolean;
    parties_allowed: boolean;
    no_pets: boolean;
    no_children: boolean;
}

interface standardRatePlanType {
    cancellation_policy: string[];
    price_per_group_size: {
        occupancy: string;
        price: string;
    }[]
}

interface formDataType {
    type?: string;
    isMultiple?: boolean;
    tourType?: string;
    name?: string;
    about_property?: string;
    host_name?: string;
    about_host?: string;
    email?: string;
    country?: string;
    address?: string;
    street?: string;
    postal_code?: string;
    zip_code?: string;
    city?: string;
    region?: string;
    max_guests: number;
    bedrooms: bedroomsType[],
    number_of_guest_allowed: number;
    bathrooms: number;
    general: generalType;
    cooking_cleaning: cookingCleaningType;
    entertainment: entertainmentType;
    breakfast_available: boolean;
    parking: parkingType;
    house_rules: houseRuleType;
    check_in_from: string;
    check_in_untill: string;
    check_out_from: string;
    check_out_untill: string;
    photos: File[];
    booking_method: string;
    price?: number;
    price_per_night?: number;
    standard_rate_plan: standardRatePlanType;
    non_refundable_rate_plan: string[];
    guest_check_in: {
        asSoon: boolean;
        date?: string;
    };
    start_date:string;
    end_date:string;
    maxReservation: boolean;
    extra_services:{
        name:string;
        price:number;
    }[];
    calendar_start_date: string;
    calendar_end_date: string;
    total_bedroom : number;
    tour_plan: tourType;
}