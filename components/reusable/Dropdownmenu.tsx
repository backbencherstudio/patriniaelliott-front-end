import { useState } from "react";

const regions = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    // Add more countries as needed
];

export default function Dropdownmenu({data,selectedData,handleSelect,title,showTitle}) {
    return (
        <div className="flex flex-col gap-2">
            {showTitle && <label htmlFor="region" className="text-[#070707]">{title}</label>}
            <select
                name="region"
                id="region"
                value={selectedData}
                onChange={(e) => handleSelect(e)}
                className="border border-[#E9E9EA] rounded-[8px] text-[#777980] p-4 outline-none appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiA5bDYgNiA2LTYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] cursor-pointer"
            >
                <option value="">Select a {title}</option>
                {data.map((item:typeof data) => (
                    <option key={item.code} value={item.code}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    )
}