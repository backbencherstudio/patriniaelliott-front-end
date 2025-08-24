'use client'

import { useState,createContext,useContext } from "react";

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
    single_bed: number;
    double_bed: number;
    large_bed: number;
    extra_large_bed: number;
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
    property_type?: string;
    isMultiple?: boolean;
    about_property?: string;
    host_name?: string;
    about_host?: string;
    email?: string;
    country?: string;
    street?: string;
    zip_code?: string;
    city?: string;
    region?: string;
    max_guests: number;
    bedrooms: [
        {
            title: string;
            beds: {
                [key: string]: number
            }
        }
    ],
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
    max_price: number;
    min_price: number;
    price_per_night: number;
    standard_rate_plan: standardRatePlanType;
    non_refundable_rate_plan: string[];
    guest_check_in: {
        asSoon: boolean;
        date?: string;
    };
    maxReservation: boolean;
}