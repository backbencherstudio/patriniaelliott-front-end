'use client'


import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import uploadIcon from '@/public/toure/upload-icon.svg'
import Select from "react-select";
import TourPlan from "./TourPlan";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { usePropertyContext } from "@/provider/PropertySetupProvider";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import languages from '@/public/toure/languages.json'
import Dropdownmenu from "@/components/reusable/Dropdownmenu";
import country from '@/public/toure/countries.json'

const ImageUploader = ({ images, onImageDrop, onImageDelete }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onImageDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: true,
  });

  return (
    <div>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`border border-dashed bg-white flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${isDragActive
          ? "bg-purple-900/50 border-purple-600"
          : "border-gray-200"
          }`}
      >
        <Image
          width={500}
          height={500}
          src={uploadIcon}
          className="bg-[#EB5B2A] p-[10px] rounded-full mb-[6px] w-[50px] h-auto object-cover"
          alt="Image"
        />
        <input {...getInputProps()} />
        <p className="text-xs md:text-base text-black rounded-full">
          Drag & Drop or <span className="text-[#EB5B2A]">Choose File</span> to
          upload
        </p>
        {/* <p className="mt-1 text-xs md:text-base text-gray-400 text-center">
                    Supported formats: jpeg, png
                </p> */}
      </div>

      {/* Image Thumbnails */}
      <div className="mt-4 flex flex-wrap gap-4 justify-start items-start">
        {images.map((file, idx) => {
          const imageUrl =
            file instanceof File || file instanceof Blob
              ? URL.createObjectURL(file)
              : file.image_url;
          return (
            <div key={idx} className="relative w-16 h-16">
              {/* Image Thumbnail */}
              <img
                src={imageUrl}
                alt={imageUrl}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Delete Button */}
              <button
                onClick={() => onImageDelete(idx)}
                className="absolute cursor-pointer top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                title="Delete"
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Helpers */
const getSelectedOptions = (languages, selectedLanguages) => {
  return languages.filter((lang) =>
    selectedLanguages.some((selected) => selected === lang.value)
  );
};

const regions = [
  { code: 'AF', name: 'Africa' },
  { code: 'AS', name: 'Asia' },
  { code: 'EU', name: 'Europe' },
  { code: 'NA', name: 'North America' },
  { code: 'SA', name: 'South America' },
  { code: 'OC', name: 'Oceania' },
  { code: 'AN', name: 'Antarctica' }
];

type countryType = {
  name: string;
  code: string;
  region: string;
}


const AddTour = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      destination: '',
      languages: [],
      destination_type: "day",
      type: "", // user chooses later
      duration_type: "",
      price: undefined,
      name: "",
      description: "",
      cancellation_policy_id: "",
      package_category: "",
      duration: "",
      city: ''
    },
  });
  const [countries, setCountries] = useState<countryType[]>(country.country);
  const { listProperty, updateListProperty } = usePropertyContext();
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [images, setImages] = useState([]);
  const [travellerTypes, setTravellerTypes] = useState([]);
  const [showCancellation, setShowCancellation] = useState(false);
  const [showExtraService, setShowExtraService] = useState(false);
  const [tourPlan, setTourPlan] = useState([
    {
      id: null,
      day: 1,
      tripPlan: [
        {
          title: "",
          description: "",
          time: 0,
          ticket: "free",
        },
      ],
      images: [],
    },
  ]);
  const [loading, setLoading] = useState(false);

  const [selectedDestinations, setSelectedDestinations] = useState(""); // [{id}]
  const [selectedLanguages, setSelectedLanguages] = useState([]); // [{id}]
  const [cancelPolicy, setCancelPolicy] = useState("");
  const [cancellationPolicies, setCancellationPolicies] = useState([]);
  const [extraService, setExtraService] = useState({
    name: "",
    price: ""
  });

  const [extraServices, setExtraServices] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const previewsRef = useRef(new Set());

  // Handle Image Update (Prevent Duplicates)
  const handleImageUpdate = (dayIndex, acceptedFiles) => {
    setImages((prev) => {
      const uniqueFiles = acceptedFiles.filter(
        (file) => !prev.some((existingFile) => existingFile.name === file.name)
      );
      return [...prev, ...uniqueFiles];
    });
    console.log("Files ", acceptedFiles);
  };

  // Handle Image Delete
  const handleImageDelete = (dayIndex, imageIndex) => {
    setImages((prev) => prev.filter((img, idx) => idx !== imageIndex));
  };

  const [selectedMeetingPoint, setSelectedMeetingPoint] = useState("");

  // Language Change Handler
  const handleLanguageChange = (selected) => {
    const codes = selected ? selected.map((s) => s.value) : [];
    console.log("Language : ", codes);
    setSelectedLanguages(codes);
    setValue("languages", codes);
  };

  // Handle Extra Services
  const handleExtraServices = () => {
    if (extraService.name === "") return;
    setExtraServices((prev) => [...prev, extraService]);
    setExtraService({ name: '', price: '0' });
    setShowExtraService(false);
  };

  // Handle Cancellation Policies
  const handleCancellationPolicies = () => {
    if (cancelPolicy === "") return;
    setCancellationPolicies((prev) => [...prev, cancelPolicy]);
    setCancelPolicy("");
    setShowCancellation(false);
  };

  // Handle Form Submission
  const onSubmit = async (data) => {
    // Validate media minimums
    const imageCount = images.filter(
      (f) => f.type !== "video" && !f?.video_url
    ).length;
    if (imageCount < 3) {
      toast.error("Please upload at least 3 images");
      return;
    }

    if (!selectedCountry) {
      toast.error('Please select a country.');
      return;
    }

    if (!selectedRegion) {
      toast.error('Please select a region');
      return;
    }

    const tourData = {
      title: data?.name,
      description: data?.description,
      tourImages: images,
      meetingPoint: selectedMeetingPoint,
      tripPlan: tourPlan,
      country: countries?.filter(ct => ct.code === selectedCountry)?.[0]?.name,
      city: data?.city,
      duration: data?.duration,
      durationType: data?.duration_type,
      price: data?.price,
      cancellation_policy: cancellationPolicies,
      extra_service: extraServices,
      language: selectedLanguages,
    };

    console.log(tourData);

    updateListProperty({
      tour_plan: tourData,
    });

    router.push("/property-list/setup/apartment-calendar");
  };

  const handleRegionChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedRegion(e.currentTarget.value);
  }

  const handleCountryChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedCountry(e.currentTarget.value);
  }

  useEffect(() => {
    if (!listProperty?.type) {
      router?.push('/property-list')
    }
  }, [])

  useEffect(() => {
    if (selectedRegion) {
      setCountries(country.country.filter((c: countryType) => c.region === selectedRegion));
    }
  }, [selectedRegion]);

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white min-h-screen pt-8 px-0 sm:px-6 pb-6 rounded-lg flex flex-col gap-4">
          <div className="md:grid md:grid-cols-3 gap-8 px-2">
            {/* LEFT */}
            <div className="flex flex-col gap-8 col-span-2">
              <h3 className="text-2xl font-semibold text-[#080613]">
                Tour Details
              </h3>

              {/* Tour Title */}
              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">
                  Tour Title
                </label>
                <input
                  type="text"
                  placeholder="Enter your tour title"
                  {...register("name", { required: "Package name is required" })}
                  className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">
                  Tour Description
                </label>
                <textarea
                  placeholder="Enter tour description"
                  {...register("description", { required: "Description is required" })}
                  className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  aria-invalid={!!errors.description}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Upload Images */}
              <div className="w-full">
                <div className="p-4 bg-[#F0F4F9] rounded-lg flex flex-col gap-3">
                  <div className="w-full">
                    <h2 className="text-base font-medium text-[#4A4C56] mb-2">
                      Upload Images
                    </h2>
                    <ImageUploader
                      images={images}
                      onImageDrop={(acceptedFiles) => handleImageUpdate(0, acceptedFiles)}
                      onImageDelete={(imageIndex) => handleImageDelete(0, imageIndex)}
                    />
                  </div>
                </div>
              </div>

              {/* Meeting Point */}
              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">
                  Meeting Point
                </label>
                <input
                  aria-placeholder="Select a meeting point"
                  className="w-full border p-2 rounded-sm"
                  value={selectedMeetingPoint}
                  onChange={(value) => {
                    setSelectedMeetingPoint(value.target.value);
                  }}
                  placeholder="Enter meeting point"
                />
              </div>

              {/* Trip Plan */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold text-[#080613]">Trip Plan</h3>
                <TourPlan
                  tourPlan={tourPlan}
                  setTourPlan={setTourPlan}
                  packageType="tour"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-4 bg-[#FDEFEA] rounded-2xl h-fit mt-4 md:mt-0">
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <label className="block text-[#444] text-base font-medium mb-4">
                    Destination
                  </label>
                  <div className="space-y-3">
                    <Dropdownmenu data={regions} handleSelect={handleRegionChange} selectedData={selectedRegion} title="Country/Region" showTitle={true} />
                  </div>
                  <Dropdownmenu data={countries} selectedData={selectedCountry} handleSelect={handleCountryChange} title="Country" showTitle={true} />
                  <div>
                    <label className="block text-[#444] text-base font-medium mb-4">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Enter cancellation policy"
                      onChange={(e) => setCancelPolicy(e.target.value)}
                      {...register("city", { required: "Enter name of the city." })}
                      className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>
                {/* Duration + Type */}
                <div className="flex flex-col 2xl:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-[#444] text-base font-medium mb-4">
                      Tour Duration
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Write duration"
                      {...register("duration", { required: "Package duration is required" })}
                      className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                      aria-invalid={!!errors.duration}
                    />
                    {errors.duration && (
                      <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-500 text-base font-medium mb-4">
                      Duration Type
                    </label>
                    <select
                      {...register("duration_type", { required: "Duration Type is required" })}
                      className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                      aria-invalid={!!errors.duration_type}
                    >
                      <option value="">Select Duration Type</option>
                      <option value="days">Days</option>
                      <option value="hours">Hours</option>
                    </select>
                    {errors.duration_type && (
                      <p className="text-red-500 text-xs mt-1">{errors.duration_type.message}</p>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-[#444] text-base font-medium">Tour Price ($)</label>
                  <input
                    type="number"
                    placeholder="Price"
                    {...register("price", { required: true })}
                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    aria-invalid={!!errors.price}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1">{`${errors.price.message}`}</p>
                  )}
                </div>

                {/* Cancellation Policy */}
                <div className="space-y-3">
                  <div className="flex md:flex-col lg:flex-row items-center gap-4 justify-between">
                    <label className="block text-[#444] text-base font-medium">Cancellation Policy</label>
                    {!showCancellation && (
                      <button
                        type="button"
                        className="border border-[#061D35] bg-[#061D35] text-white hover:text-[#061D35] hover:bg-transparent duration-300 transition-colors px-3 py-1 cursor-pointer rounded-md"
                        onClick={() => setShowCancellation((prev) => !prev)}
                      >
                        Add policy
                      </button>
                    )}
                  </div>
                  {showCancellation && (
                    <input
                      type="text"
                      value={cancelPolicy}
                      placeholder="Enter cancellation policy"
                      onChange={(e) => setCancelPolicy(e.target.value)}
                      className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    />
                  )}
                  {showCancellation && (
                    <div className="space-x-3">
                      <button
                        type="button"
                        className="border border-[#061D35] bg-[#061D35] text-white hover:text-[#061D35] hover:bg-transparent duration-300 transition-colors px-3 py-1 cursor-pointer rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancellationPolicies();
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="border border-[#061D35] px-3 py-1 cursor-pointer rounded-md"
                        onClick={() => setShowCancellation(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  <ul className="list-disc pl-4">
                    {cancellationPolicies.map((policy, index) => (
                      <li key={index}>{policy}</li>
                    ))}
                  </ul>
                </div>

                {/* Extra Services */}
                <div className="space-y-3">
                  <div className="flex md:flex-col items-center gap-4 justify-between">
                    <label className="block text-[#444] text-base font-medium">Extra Services</label>
                    {!showExtraService && (
                      <button
                        type="button"
                        className="border border-[#061D35] bg-[#061D35] text-white hover:text-[#061D35] hover:bg-transparent duration-300 transition-colors px-3 py-1 cursor-pointer rounded-md"
                        onClick={() => setShowExtraService((prev) => !prev)}
                      >
                        Add extra services
                      </button>
                    )}
                  </div>
                  {showExtraService && (
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={extraService.name}
                        placeholder="Enter extra service"
                        onChange={(e) =>
                          setExtraService((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                      />

                      <input
                        type="text"
                        value={extraService.price}
                        placeholder="Enter price"
                        onChange={(e) =>
                          setExtraService((prev) => ({ ...prev, price: e.target.value }))
                        }
                        className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600 max-w-[150px]"
                      />

                    </div>
                  )}
                  {showExtraService && (
                    <div className="space-x-3">
                      <button
                        type="button"
                        className="border border-[#061D35] bg-[#061D35] text-white hover:text-[#061D35] hover:bg-transparent duration-300 transition-colors px-3 py-1 cursor-pointer rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExtraServices();
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="border border-[#061D35] px-3 py-1 cursor-pointer rounded-md"
                        onClick={() => setShowExtraService(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  <ul className="list-disc pl-4">
                    {extraServices.map((service, index) => (
                      <li key={index}>{service.name} {service?.price}</li>
                    ))}
                  </ul>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-[#444] text-base font-medium mb-4">
                    Language
                  </label>
                  <Select
                    isMulti
                    options={languages.map((lang) => ({
                      value: lang.code,
                      label: lang.name,
                    }))}
                    value={getSelectedOptions(
                      languages.map((lang) => ({
                        value: lang.code,
                        label: lang.name,
                      })),
                      selectedLanguages
                    )}
                    onChange={handleLanguageChange}
                    placeholder="Select language"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-4">
            <button
              type="submit"
              className="border cursor-pointer border-[#061D35] px-16 py-3 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]"
              disabled={loading}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTour;