import {ReactNode } from "react";
import PropertySetupProvider from "@/provider/PropertySetupProvider";


export default function FrontEndLayout({ children }: { children: ReactNode }) {

    return (
        <PropertySetupProvider>
            {children}
        </PropertySetupProvider>
    );
}
