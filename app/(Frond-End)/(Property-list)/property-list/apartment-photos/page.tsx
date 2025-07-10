"use client"

import { useCallback, useState } from "react"
import { useRouter } from 'next/navigation';
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
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSuggestionOpen, setIsSuggestionOpen] = useState(true);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setIsDragging(false);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDragEnter: () => setIsDragging(true),
        onDragLeave: () => setIsDragging(false),
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        }
    });

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push("/property-list/apartment-pricing");
    };

    return (
        <div className="flex justify-center items-center w-full bg-[#F6F7F7]">
            <div className="py-15 px-4 max-w-[1320px] w-full space-y-[48px]">
                {/* Progress Header */}
                <ul className="hidden md:flex w-full justify-between">
                    {HEADER_ITEMS.map(item => (
                        <li className="space-y-4 w-fit" key={item}>
                            <h3 className={`${item === "Photos" ? "text-[#070707]" : "text-[#777980]"} text-sm text-center`}>
                                {item}
                            </h3>
                            <div className="w-[140px] lg:w-[180px] xl:w-[210px] h-[12px] bg-[#D9D9D9] rounded-full relative">
                                <div className={`absolute top-0 left-0 h-full w-3/4 bg-[#D6AE29] rounded-full ${item === "Photos" ? "" : "hidden"}`}></div>
                            </div>
                        </li>
                    ))}
                </ul>

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
                                    <input {...getInputProps()} required />
                                    <div className="flex flex-col items-center space-y-6">
                                        {files.length === 0 ? (
                                            <PhotoUploadIcon />
                                        ) : (
                                            <div
                                                className={`
    grid 
    ${files.length === 1 ? "grid-cols-1" :
                                                        files.length === 2 ? "grid-cols-2" :
                                                            files.length === 3 ? "grid-cols-3" : "grid-cols-4"
                                                    } 
    gap-2 w-full relative
  `}
                                            >
                                                {files.slice(0, 4).map((file, index) => (
                                                    <div key={index} className="relative group">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Uploaded preview ${index + 1}`}
                                                            className="w-full h-24 object-cover rounded-md"
                                                            onLoad={() => URL.revokeObjectURL(file["path"])} // Clean up memory
                                                        />
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
                                            <UploadButton />
                                        </div>
                                    </div>
                                </div>

                                {/* Import Photos */}
                                <div className="flex gap-[10px] items-center justify-center">
                                    <ImportIcon />
                                    <p className="text-[#4A4C56] text-[18px]">Import photos from your Airbnb listing</p>
                                </div>
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

const UploadButton = () => (
    <button
        type="button"
        className="p-3 text-[#0068EF] rounded-md focus:outline-none border-[#0068EF] border flex items-center gap-1 cursor-pointer"
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

const ImportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.9141 3.125C13.0798 3.125 13.2388 3.19085 13.356 3.30806C13.4732 3.42527 13.5391 3.58424 13.5391 3.75V9.16667C13.5391 9.33243 13.4732 9.4914 13.356 9.60861C13.2388 9.72582 13.0798 9.79167 12.9141 9.79167C12.7483 9.79167 12.5893 9.72582 12.4721 9.60861C12.3549 9.4914 12.2891 9.33243 12.2891 9.16667V3.75C12.2891 3.58424 12.3549 3.42527 12.4721 3.30806C12.5893 3.19085 12.7483 3.125 12.9141 3.125Z" fill="#4A4C56" />
        <path fillRule="evenodd" clipRule="evenodd" d="M9.97185 6.64424C10.089 6.52719 10.2479 6.46145 10.4135 6.46145C10.5791 6.46145 10.738 6.52719 10.8552 6.64424L12.9135 8.70257L14.9718 6.64424C15.0291 6.58283 15.0981 6.53358 15.1747 6.49942C15.2514 6.46526 15.3342 6.44689 15.4181 6.44541C15.502 6.44393 15.5854 6.45937 15.6632 6.4908C15.741 6.52223 15.8117 6.56902 15.871 6.62837C15.9304 6.68772 15.9772 6.75841 16.0086 6.83624C16.04 6.91406 16.0555 6.99742 16.054 7.08134C16.0525 7.16526 16.0342 7.24802 16 7.32468C15.9658 7.40135 15.9166 7.47035 15.8552 7.52757L13.3552 10.0276C13.238 10.1446 13.0791 10.2104 12.9135 10.2104C12.7479 10.2104 12.589 10.1446 12.4718 10.0276L9.97185 7.52757C9.8548 7.41038 9.78906 7.25153 9.78906 7.0859C9.78906 6.92028 9.8548 6.76142 9.97185 6.64424Z" fill="#4A4C56" />
        <path fillRule="evenodd" clipRule="evenodd" d="M3.33073 2.29297C2.75573 2.29297 2.28906 2.75964 2.28906 3.33464V16.668C2.28906 17.243 2.75573 17.7096 3.33073 17.7096H16.6641C17.2391 17.7096 17.7057 17.243 17.7057 16.668V12.918C17.7057 12.7522 17.7716 12.5932 17.8888 12.476C18.006 12.3588 18.165 12.293 18.3307 12.293C18.4965 12.293 18.6555 12.3588 18.7727 12.476C18.8899 12.5932 18.9557 12.7522 18.9557 12.918V16.668C18.9557 17.2758 18.7143 17.8586 18.2845 18.2884C17.8547 18.7182 17.2718 18.9596 16.6641 18.9596H3.33073C2.72294 18.9596 2.14005 18.7182 1.71028 18.2884C1.28051 17.8586 1.03906 17.2758 1.03906 16.668V3.33464C1.03906 2.72685 1.28051 2.14395 1.71028 1.71418C2.14005 1.28441 2.72294 1.04297 3.33073 1.04297H7.08073C7.24649 1.04297 7.40546 1.10882 7.52267 1.22603C7.63988 1.34324 7.70573 1.50221 7.70573 1.66797C7.70573 1.83373 7.63988 1.9927 7.52267 2.10991C7.40546 2.22712 7.24649 2.29297 7.08073 2.29297H3.33073Z" fill="#4A4C56" />
        <path fillRule="evenodd" clipRule="evenodd" d="M6.56854 13.5671C6.47396 13.4506 6.35536 13.356 6.22083 13.2896C6.08631 13.2233 5.93904 13.1867 5.78909 13.1825C5.63914 13.1783 5.49006 13.2066 5.35203 13.2653C5.21401 13.3241 5.0903 13.4119 4.98937 13.5229L2.12687 16.6721C2.01526 16.7947 1.85949 16.868 1.69383 16.8758C1.52817 16.8837 1.3662 16.8253 1.24354 16.7137C1.12087 16.6021 1.04757 16.4464 1.03976 16.2807C1.03194 16.115 1.09026 15.9531 1.20187 15.8304L4.06437 12.6821C4.28639 12.4378 4.55857 12.2443 4.86228 12.1149C5.16599 11.9856 5.49407 11.9233 5.82406 11.9325C6.15405 11.9417 6.47817 12.0221 6.77422 12.1681C7.07027 12.3142 7.33128 12.5225 7.53937 12.7787L11.7327 17.9404C11.8354 18.0692 11.8832 18.2334 11.8655 18.3972C11.8478 18.561 11.7661 18.7112 11.6383 18.8152C11.5104 18.9191 11.3467 18.9683 11.1827 18.9521C11.0187 18.9359 10.8678 18.8556 10.7627 18.7287L6.56854 13.5671Z" fill="#4A4C56" />
        <path fillRule="evenodd" clipRule="evenodd" d="M14.4081 15.711C14.2211 15.5243 13.9701 15.4155 13.706 15.4069C13.4419 15.3982 13.1844 15.4902 12.9856 15.6644L10.8256 17.5544C10.7007 17.6635 10.5376 17.7186 10.3721 17.7075C10.2066 17.6964 10.0522 17.6201 9.94306 17.4952C9.83388 17.3703 9.77877 17.2072 9.78987 17.0417C9.80096 16.8762 9.87735 16.7219 10.0022 16.6127L12.1622 14.7235C12.5997 14.3408 13.1664 14.1386 13.7474 14.1579C14.3284 14.1773 14.8803 14.4167 15.2914 14.8277L17.9389 17.4752C18.0493 17.5937 18.1094 17.7504 18.1065 17.9123C18.1037 18.0742 18.0381 18.2287 17.9236 18.3432C17.8091 18.4577 17.6546 18.5233 17.4927 18.5262C17.3307 18.529 17.174 18.4689 17.0556 18.3585L14.4081 15.711ZM12.9139 11.8752C13.9422 11.8748 14.9431 11.5436 15.7687 10.9306C16.5943 10.3176 17.2008 9.4552 17.4986 8.47094C17.7963 7.48667 17.7695 6.43273 17.4221 5.46487C17.0748 4.497 16.4253 3.66656 15.5696 3.09626C14.7139 2.52597 13.6974 2.24608 12.6704 2.29795C11.6434 2.34983 10.6604 2.73071 9.86649 3.38433C9.07263 4.03794 8.51009 4.9296 8.26201 5.92755C8.01394 6.92549 8.09348 7.97676 8.48889 8.92602C8.55 9.07844 8.54867 9.24878 8.48519 9.40023C8.4217 9.55167 8.30117 9.67205 8.14964 9.73533C7.99811 9.79861 7.82776 9.79972 7.67542 9.73841C7.52309 9.67709 7.401 9.55829 7.33556 9.40768C6.79772 8.11642 6.72459 6.67855 7.12866 5.33939C7.53273 4.00023 8.38896 2.84277 9.55124 2.06449C10.7135 1.28622 12.1099 0.93536 13.502 1.07178C14.8941 1.2082 16.1958 1.82345 17.1849 2.81254C18.174 3.80164 18.7892 5.10329 18.9256 6.49542C19.062 7.88754 18.7112 9.28387 17.9329 10.4462C17.1546 11.6084 15.9972 12.4647 14.658 12.8687C13.3189 13.2728 11.881 13.1997 10.5897 12.6619C10.4391 12.5964 10.3203 12.4743 10.259 12.322C10.1977 12.1696 10.1988 11.9993 10.2621 11.8478C10.3254 11.6962 10.4457 11.5757 10.5972 11.5122C10.7486 11.4487 10.919 11.4474 11.0714 11.5085C11.6552 11.7515 12.2815 11.8762 12.9139 11.8752Z" fill="#4A4C56" />
    </svg>
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