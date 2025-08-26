"use client";

import { usePropertyContext } from "@/provider/PropertySetupProvider";
import { useRouter } from 'next/navigation';
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const HEADER_ITEMS = [
    "Name and location",
    "Property setup",
    "Photos",
    "Pricing",
    "Calendar",
];

export default function PropertyPhotosPage() {
    const router = useRouter();
    const { listProperty, updateListProperty } = usePropertyContext();
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSuggestionOpen, setIsSuggestionOpen] = useState(true);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        setIsDragging(false);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDragEnter: () => setIsDragging(true),
        onDragLeave: () => setIsDragging(false),
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        multiple: true, // Allow multiple images at a time
    });

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateListProperty({
            photos: files
        });

        const updatedProperty = {
            ...JSON.parse(localStorage.getItem("propertyData") || '{}'),
            photos: files
        };
        localStorage.setItem("propertyData", JSON.stringify(updatedProperty));

        router.push("/property-list/setup/apartment-pricing");
    };

    const handleAddSingleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFiles((prevFiles) => [...prevFiles, file]);
        }
    };

    const handleDeleteImage = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className="flex justify-center items-center w-full bg-[#F6F7F7]">
            <div className="py-15 px-4 max-w-[1320px] w-full space-y-[48px]">
                <div className="flex gap-6 w-full">
                    {/* Main Form */}
                    <form className="space-y-6 flex-1" onSubmit={handleFormSubmit}>
                        <div className="space-y-6 bg-white p-6 rounded-lg">
                            <div className="space-y-4">
                                <h3 className="text-[#23262F] text-2xl font-medium">What does your place look like?</h3>
                                <div>
                                    <span className="text-[#070707] text-sm">Upload at least 5 photos of your property. </span>
                                    <span className="text-[#777980] text-sm">
                                        The more you upload, the more likely you are to get bookings. You can add more later.
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Dropzone */}
                                <div
                                    {...getRootProps()}
                                    className={`border-2 border-dashed rounded-lg p-[48px] text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-[#4A4C56] hover:border-gray-400'
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    <div className="flex flex-col items-center space-y-6">
                                        {files.length === 0 ? (
                                            <PhotoUploadIcon />
                                        ) : (
                                            <div
                                                className={`grid 
                                                ${files.length === 1 ? "grid-cols-1" :
                                                        files.length === 2 ? "grid-cols-2" :
                                                            files.length === 3 ? "grid-cols-3" : "grid-cols-4"
                                                    } 
                                                gap-2 w-full relative
                                            `}>
                                                {files.slice(0, 4).map((file, index) => (
                                                    <div key={index} className="relative group">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Uploaded preview ${index + 1}`}
                                                            className="w-full h-24 object-cover rounded-md"
                                                            onLoad={() => URL.revokeObjectURL(file["path"])} // Clean up memory
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteImage(index);
                                                            }}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                <path d="M10.9742 10.1673C11.1974 10.3905 11.1974 10.7524 10.9742 10.9756C10.863 11.0868 10.7167 11.1431 10.5704 11.1431C10.4242 11.1431 10.2779 11.0875 10.1667 10.9756L5.99952 6.80845L1.83236 10.9756C1.72113 11.0868 1.57487 11.1431 1.4286 11.1431C1.28233 11.1431 1.13606 11.0875 1.02483 10.9756C0.801619 10.7524 0.801619 10.3905 1.02483 10.1673L5.19199 6.0002L1.02483 1.83313C0.801619 1.60992 0.801619 1.24804 1.02483 1.02483C1.24805 0.80162 1.60991 0.80162 1.83313 1.02483L6.00029 5.19194L10.1674 1.02483C10.3906 0.80162 10.7525 0.80162 10.9757 1.02483C11.1989 1.24804 11.1989 1.60992 10.9757 1.83313L6.80857 6.0002L10.9742 10.1673Z" fill="white" />
                                                            </svg>
                                                        </button>
                                                        {index === 3 && files.length > 4 && (
                                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-4xl font-light rounded-md">
                                                                +{files.length - 4}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="space-y-3 flex flex-col items-center">
                                            <p className="text-[#23262F] text-xl font-medium">
                                                Drag and drop your photos here
                                            </p>
                                            <div className="flex items-center space-x-2 text-[#4A4C56] text-sm">
                                                <span>Or</span>
                                            </div>
                                            <UploadButton onClick={() => document.getElementById("file-upload")?.click()} />
                                        </div>
                                    </div>
                                </div>

                                {/* Upload single image */}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAddSingleImage}
                                />
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between w-full space-x-3 px-4">
                            <BackButton onClick={() => router.back()} />
                            <SubmitButton />
                        </div>
                    </form>

                    {/* Suggestion Sidebar */}
                    <PhotoTipsSuggestion
                        isOpen={isSuggestionOpen}
                        onClose={() => setIsSuggestionOpen(prev => !prev)}
                    />
                </div>
            </div>
        </div>
    );
}

// Extracted Components for better readability

const PhotoUploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="73" height="72" viewBox="0 0 73 72" fill="none">
        <g clipPath="url(#clip0_5471_15454)">
            <path d="M64.3605 2.25391H8.64335C4.15218 2.25391 0.5 5.90488 0.5 10.4014V61.6088C0.5 66.0999 4.15218 69.7471 8.64335 69.7471H64.3603C68.8514 69.7471 72.4998 66.0999 72.4998 61.6088V10.4014C72.5 5.90488 68.8517 2.25391 64.3605 2.25391ZM47.0589 14.3707C51.402 14.3707 54.9243 17.8932 54.9243 22.2362C54.9243 26.5791 51.4018 30.1016 47.0589 30.1016C42.7145 30.1016 39.1934 26.5791 39.1934 22.2362C39.1934 17.8932 42.7145 14.3707 47.0589 14.3707ZM61.8066 62.2195H12.3194C10.1471 62.2195 9.17962 60.6478 10.1589 58.7088L23.6575 31.9724C24.6355 30.0337 26.4996 29.8606 27.8197 31.5856L41.393 49.3237C42.713 51.049 45.0203 51.1957 46.5474 49.6501L49.8679 46.2876C51.3938 44.7419 53.6421 44.9333 54.8874 46.7123L63.4858 58.9944C64.7288 60.7761 63.979 62.2195 61.8066 62.2195Z" fill="#0068EF" />
        </g>
        <defs>
            <clipPath id="clip0_5471_15454">
                <rect width="72" height="72" fill="white" transform="translate(0.5)" />
            </clipPath>
        </defs>
    </svg>
);

const UploadButton = ({ onClick }: { onClick: () => void }) => (
    <button
        type="button"
        className="p-3 text-[#0068EF] rounded-md focus:outline-none border-[#0068EF] border flex items-center gap-1 cursor-pointer"
        onClick={onClick}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5.83463 5C4.81743 5.00305 4.25449 5.02738 3.79191 5.22154C3.14397 5.4935 2.61631 5.99586 2.30806 6.63425C2.05645 7.15532 2.01528 7.82292 1.93293 9.15812L1.8039 11.2504C1.59912 14.5707 1.49673 16.2309 2.47104 17.2819C3.44534 18.3329 5.08674 18.3329 8.36957 18.3329H11.6331C14.9159 18.3329 16.5572 18.3329 17.5316 17.2819C18.5059 16.2309 18.4035 14.5707 18.1987 11.2504L18.0696 9.15812C17.9873 7.82292 17.9461 7.15532 17.6946 6.63425C17.3863 5.99586 16.8587 5.4935 16.2107 5.22154C15.7482 5.02738 15.1852 5.00305 14.168 5" stroke="#0068EF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14.1654 5.83463L13.4272 3.98916C13.1087 3.19294 12.8315 2.28972 12.0125 1.88426C11.5757 1.66797 11.05 1.66797 9.9987 1.66797C8.94736 1.66797 8.4217 1.66797 7.98482 1.88426C7.16586 2.28972 6.88871 3.19294 6.57022 3.98916L5.83203 5.83463" stroke="#0068EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.9154 11.6667C12.9154 13.2775 11.6095 14.5833 9.9987 14.5833C8.38786 14.5833 7.08203 13.2775 7.08203 11.6667C7.08203 10.0558 8.38786 8.75 9.9987 8.75C11.6095 8.75 12.9154 10.0558 12.9154 11.6667Z" stroke="#0068EF" strokeWidth="1.5" />
            <path d="M10 5H10.009" stroke="#0068EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Upload Photos</span>
    </button>
);


const BackButton = ({ onClick }: { onClick: () => void }) => (
    <div
        className="text-[#0068EF] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#0068EF] rounded-[8px] cursor-pointer"
        onClick={onClick}
    >
        Back
    </div>
);

const SubmitButton = () => (
    <button
        type="submit"
        className="text-[#fff] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] cursor-pointer"
    >
        Continue
    </button>
);

const PhotoTipsSuggestion = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
    <div className={`w-[300px] lg:w-[400px] xl:w-[583px] hidden md:block ${!isOpen && 'hidden'}`}>
        <div className="bg-[#FFFBEE] p-4 rounded-[12px] flex gap-[6px] w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                <path d="M4.06089 9.66731C3.80862 9.10024 3.66797 8.46938 3.66797 7.80458C3.66797 5.33554 5.60807 3.33398 8.0013 3.33398C10.3946 3.33398 12.3346 5.33554 12.3346 7.80458C12.3346 8.46938 12.194 9.10024 11.9417 9.66731" stroke="#070707" strokeLinecap="round" />
                <path d="M8 1V1.66667" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.6667 7.66602H14" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.00065 7.66602H1.33398" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.7136 2.95312L12.2422 3.42453" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.75852 3.42453L3.28711 2.95312" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.67833 12.5376C10.3519 12.3197 10.6221 11.7032 10.6981 11.0831C10.7207 10.8978 10.5683 10.7441 10.3817 10.7441L5.65156 10.7443C5.4585 10.7443 5.30344 10.9081 5.3265 11.0998C5.40093 11.7187 5.5888 12.1709 6.30263 12.5376M9.67833 12.5376C9.67833 12.5376 6.42014 12.5376 6.30263 12.5376M9.67833 12.5376C9.59733 13.8343 9.22286 14.3478 8.00486 14.3334C6.70206 14.3575 6.40235 13.7227 6.30263 12.5376" stroke="#070707" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="space-y-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-[#070707] font-medium text-sm">What if I don't have professional photos?</h3>
                </div>
                <div className="text-[#4A4C56] text-sm space-y-2">
                    <p>No problem! You can use a smartphone or a digital camera. Here are some tips for taking great photos of your property</p>
                    <div>
                        <a href="#" className="text-[#0068EF]">Here are some tips for taking great photos of your property</a>
                    </div>
                    <p>If you don't know who took a photo, it's best not to use it. Only use photos others have taken if you have permission.</p>
                </div>
            </div>
            <CloseButton onClick={onClose} />
        </div>
    </div>
);

const CloseButton = ({ onClick }: { onClick: () => void }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        onClick={onClick}
        className="cursor-pointer"
    >
        <path d="M10.9742 10.1673C11.1974 10.3905 11.1974 10.7524 10.9742 10.9756C10.863 11.0868 10.7167 11.1431 10.5704 11.1431C10.4242 11.1431 10.2779 11.0875 10.1667 10.9756L5.99952 6.80845L1.83236 10.9756C1.72113 11.0868 1.57487 11.1431 1.4286 11.1431C1.28233 11.1431 1.13606 11.0875 1.02483 10.9756C0.801619 10.7524 0.801619 10.3905 1.02483 10.1673L5.19199 6.0002L1.02483 1.83313C0.801619 1.60992 0.801619 1.24804 1.02483 1.02483C1.24805 0.80162 1.60991 0.80162 1.83313 1.02483L6.00029 5.19194L10.1674 1.02483C10.3906 0.80162 10.7525 0.80162 10.9757 1.02483C11.1989 1.24804 11.1989 1.60992 10.9757 1.83313L6.80857 6.0002L10.9742 10.1673Z" fill="#070707" />
    </svg>
);
