'use client'


import { useContext,createContext,useState } from "react";


export default function FrontEndLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
        </div>
    );
}


interface formData{
    property_type?:string;
    isMultiple?:boolean;
    about_property?:string;
    host_name?:string;
    about_host?:string;
    email?:string;
    country?:string;
    street?:string;
    zip_code?:string;
    city?:string;
    region?:string;
    bedroom1?:number;
    bedroom2?:number;
    bedroom3?:number;
    bedroom4?:number;
}
