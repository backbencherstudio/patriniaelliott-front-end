'use client'

import { useContext, createContext, useState, useEffect, ReactNode } from "react";

// Create the context
const PropertyContext = createContext<{
    listProperty: formDataType | undefined;
    updateListProperty: (newData: Partial<formDataType>) => void;
}>({
    listProperty: undefined,
    updateListProperty: () => { },
});

// Create a custom hook for easier consumption
export const usePropertyContext = () => useContext(PropertyContext);

export default function FrontEndLayout({ children }: { children: ReactNode }) {
    const [listProperty, setListProperty] = useState<formDataType>();

    // Function to update listProperty
    const updateListProperty = (newData: Partial<formDataType>) => {
        setListProperty(prev => ({
            ...prev,
            ...newData
        } as formDataType));
    };

    // useEffect(() => {
    //     // Initialize with default values
    //     updateListProperty({
    //         property_type: "",
    //         isMultiple: false,
    //         about_property: "",
    //         host_name: "",
    //         about_host: "",
    //         email: "",
    //         country: "",
    //         street: "",
    //         zip_code: "",
    //         city: "",
    //         region: "",
    //         bedrooms: [
    //             {
    //                 title: "",
    //                 beds: {
    //                     single_bed: 0,
    //                     double_bed: 0,
    //                     large_bed: 0,
    //                     extra_large_bed: 0
    //                 }
    //             }
    //         ],
    //         max_guests: 0,
    //         bathrooms: 0,
    //         general: {
    //             wifi: false,
    //             air_conditioning: true,
    //             heating: true,
    //             electric_vehicle_charging_station: false
    //         },
    //         cooking_cleaning: {
    //             kitchen: false,
    //             kitchenette: true,
    //             washing_machine: true
    //         },
    //         entertainment: {
    //             flat_screen_tv: true,
    //             swimming_pool: true,
    //             minibar: false,
    //             sauna: false,
    //         },
    //         breakfast_available: true,
    //         parking: {
    //             cost: 0,
    //             available: true,
    //             type: "free",
    //             reserveParkingSpot: false,
    //             parkingType: true
    //         },
    //         house_rules: {
    //             no_smoking: false,
    //             parties_allowed: false,
    //             no_pets: true,
    //             no_children: false
    //         },
    //         check_in_from: "",
    //         check_in_untill: "",
    //         check_out_from: "",
    //         check_out_untill: "",
    //         photos: [],
    //         booking_method: "",
    //         max_price: 1200,
    //         min_price: 800,
    //         price_per_night: 0,
    //         standard_rate_plan: {
    //             cancellation_policy: [],
    //             price_per_group_size: [
    //                 {
    //                     occupancy: "",
    //                     price: "",
    //                 }
    //             ]
    //         },
    //         non_refundable_rate_plan: [],
    //         guest_check_in: {
    //             asSoon: false,
    //             date: ""
    //         },
    //         maxReservation: false,
    //     });
    // }, []);

    return (
        <PropertyContext.Provider value={{ listProperty, updateListProperty }}>
            <div>
                {children}
            </div>
        </PropertyContext.Provider>
    );
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
    number_of_guest_allowed:number;
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