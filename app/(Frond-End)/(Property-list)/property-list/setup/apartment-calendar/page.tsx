"use client";

import { useToken } from "@/hooks/useToken";
import { usePropertyContext } from "@/provider/PropertySetupProvider";
import { UserService } from "@/service/user/user.service";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ---- helpers ----
function addMonths(date: Date, n: number) {
  const d = new Date(date);
  const targetMonth = d.getMonth() + n;
  d.setMonth(targetMonth);
  return d;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function getDaysForMonth(year: number, month: number) {
  const days: Date[] = [];
  const cur = new Date(year, month, 1);
  while (cur.getMonth() === month) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isWithinRange(day: Date, start: Date, end: Date) {
  const x = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return x >= s && x <= e;
}

function toISODate(d: Date) {
  // yyyy-mm-dd (no time) – nice for backends
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Page() {
  const router = useRouter();
  const { listProperty, updateListProperty } = usePropertyContext();
  const { token } = useToken();

  // calendar view state
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const nextMonthViewDate = useMemo(() => addMonths(viewDate, 1), [viewDate]);

  // selection / meta
  const [licenses, setLicenses] = useState(false);
  const [termsPolicy, setTermsPolicy] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<number>(0);

  // days grid memo
  const { daysInMonth, startDay } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const days = getDaysForMonth(year, month);
    const sDay = startOfMonth(viewDate).getDay(); // 0..6
    return { daysInMonth: days, startDay: sDay };
  }, [viewDate]);

  // (Optional next month precompute, kept for parity with your code)
  const { daysInNextMonth, nextMonthStartDay } = useMemo(() => {
    const year = nextMonthViewDate.getFullYear();
    const month = nextMonthViewDate.getMonth();
    const days = getDaysForMonth(year, month);
    const sDay = startOfMonth(nextMonthViewDate).getDay();
    return { daysInNextMonth: days, nextMonthStartDay: sDay };
  }, [nextMonthViewDate]);

  // hydrate price from localStorage (safe parse)
  useEffect(() => {
    const nightly = listProperty?.type === "Tour"
      ? listProperty?.tour_plan?.price
      : listProperty?.price_per_night;
    setPrice(Number(nightly) || 0);
  }, []);

  const daysNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handlePrevMonth = () => {
    // prevent going before current real month/year if you want this guard
    const now = new Date();
    const guard =
      viewDate.getMonth() !== now.getMonth() ||
      viewDate.getFullYear() !== now.getFullYear();
    if (guard) {
      setViewDate(addMonths(viewDate, -1));
    }
  };

  const handleNextMonth = () => {
    setViewDate(addMonths(viewDate, 1));
  };

  const handleSubmit = async () => {
    setLoading(true);

    // store to context (use clean ISO dates for interoperability)
    updateListProperty({
      calendar_start_date: toISODate(startDate),
      calendar_end_date: toISODate(endDate),
    });

    console.log("Form data : ", listProperty);

    const propertyData = {
      ...listProperty,
      calendar_start_date: toISODate(startDate),
      calendar_end_date: toISODate(endDate),
    }

    console.log("Property data : ", propertyData)
    const fd = new FormData();

    const amenities = {
      general: propertyData?.general ?? [],
      entertainment: propertyData?.entertainment ?? [],
      cooking_cleaning: propertyData?.cooking_cleaning ?? [],
    };

    const check_in = {
      from: propertyData?.check_in_from ?? "",
      until: propertyData?.check_in_untill ?? "",
    };

    const check_out = {
      from: propertyData?.check_out_from ?? "",
      until: propertyData?.check_out_untill ?? "",
    };

    if (propertyData?.type === 'Tour') {
      fd.append('name', String(propertyData?.tour_plan?.title ?? ''))
      fd.append('description', String(propertyData?.tour_plan?.description ?? ''));
      fd.append('price', String(propertyData?.tour_plan?.price ?? ""));
      fd.append('type', String(propertyData?.type ?? ''));
      fd.append('tour_type', String(propertyData?.tourType ?? ''));
      fd.append('meting_points', String(propertyData?.tour_plan?.meetingPoint ?? ''));
      fd.append('language', JSON.stringify(propertyData?.tour_plan?.language));
      // fd.append('cancellation_policy', JSON.stringify(propertyData?.tour_plan?.cancellation_policy));
      fd.append('discount', String(propertyData?.tour_plan?.discount))
      fd.append('policy_description', String(propertyData?.tour_plan?.policy_description));
      fd.append('package_policies', JSON.stringify(propertyData?.tour_plan?.package_policies));
      fd.append('service_fee', String(propertyData?.tour_plan?.service_fee));
      const trip_plan = [];
      for (let i = 0; i < listProperty?.tour_plan?.tripPlan?.length; i++) {
        const title = `Day ${i + 1}`;
        const details = listProperty?.tour_plan?.tripPlan[i]?.tripPlan?.map((trip) => {
          return {
            title: trip.title,
            description: trip.description,
            time: trip.time,
            notes: trip.ticket,
          };
        });
        trip_plan.push({
          title,
          details,
        });
      }

      fd.append('trip_plans', JSON.stringify(trip_plan))

      fd.append('extra_services', JSON.stringify(propertyData?.tour_plan?.extra_service));
      propertyData?.tour_plan?.tourImages?.forEach(img =>
        fd.append('package_files', img)
      )
      propertyData?.tour_plan?.tripPlan?.[0]?.images?.forEach(img =>
        fd.append('trip_plans_images', img)
      )
      fd.append("calendar_start_date", toISODate(startDate));
      fd.append("calendar_end_date", toISODate(endDate));
      fd.append('duration', String(propertyData?.tour_plan?.duration));
      fd.append('duration_type', String(propertyData?.tour_plan?.durationType));
      fd.append('country', String(propertyData?.tour_plan?.country));
      fd.append('city', String(propertyData?.tour_plan?.city));
    } else {
      // append with safe string conversions
      fd.append("name", String(propertyData?.name ?? ""));
      fd.append("description", String(propertyData?.about_property ?? ""));
      fd.append("price", String(propertyData?.price_per_night ?? "0"));
      fd.append("type", String(propertyData?.type ?? ""));
      // fd.append("room_photos", JSON.stringify(propertyData?.photos ?? []));
      propertyData?.photos?.forEach(photo => {
        fd.append('room_photos', photo);
      })
      fd.append("amenities", JSON.stringify(amenities));
      fd.append("extra_services", JSON.stringify(propertyData?.extra_services ?? []));
      fd.append("country", String(propertyData?.country ?? ""));
      fd.append("city", String(propertyData?.city ?? ""));
      fd.append("address", String(propertyData?.street ?? ""));
      fd.append("postal_code", String(propertyData?.zip_code ?? ""));
      fd.append("bedrooms", JSON.stringify(propertyData?.bedrooms ?? "0")); // fixed
      fd.append("bathrooms", String(propertyData?.bathrooms ?? "0"));
      fd.append(
        "max_capacity",
        propertyData?.max_guests ? String(Number(propertyData.max_guests)) : "1"
      );
      fd.append("check_in", JSON.stringify(check_in));
      fd.append("check_out", JSON.stringify(check_out));
      fd.append(
        "breakfast_available",
        String(Boolean(propertyData?.breakfast_available))
      );
      fd.append(
        "max_guests",
        propertyData?.max_guests ? String(Number(propertyData.max_guests)) : "1"
      );
      fd.append("calendar_start_date", toISODate(startDate));
      fd.append("calendar_end_date", toISODate(endDate));
      fd.append("package_policies",JSON.stringify([
        {
          title: 'check in',
          description: listProperty?.checkinPolicy,
        },
        {
          title: 'check out',
          description: listProperty?.checkoutPolicy,
        },
        {
          title: 'Special check in instructions',
          description: listProperty?.specialCheckinPolicy,
        },
        {
          title: 'children and extra beds',
          description: listProperty?.childrenExtra,
        },
        {
          title: 'Cancellation policy',
          description: listProperty?.refundPolicy,
        },
        {
          title: 'Non-refundable policy',
          description: listProperty?.nonRefundPolicy,
        },
      ]))
    }

    const endpoint = "/admin/vendor-package";
    try {
      const res = await UserService?.createPropertyData(endpoint, fd, token);
      if (res?.data?.success === true) {
        if (propertyData?.type === 'Tour') {
          toast.success("Tour setup completed.");
        } else {
          toast.success("Property setup completed.");
        }
        localStorage.removeItem("propertyData");
        // setTimeout(() => {
        //   router.push("/user-verification");
        // }, 1000);
      } else {
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  // UI helpers for labels
  const formatted = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

  return (
    <div className="flex justify-center items-center bg-[#F6F7F7] w-full overflow-hidden">
      <div className="pb-15 px-4 max-w-[1320px] w-full space-y-[48px]">
        <Toaster />

        <div className="flex flex-col-reverse md:flex-row gap-6 items-center md:items-start">
          {/* Left Side */}
          <div className="flex-1 space-y-[32px]">
            {/* Calendar */}
            <div className="flex bg-[#F6F7F7] rounded-lg">
              <div className="flex-1 lg:flex flex-col justify-between">
                {/* Month Header */}
                <div className="w-full bg-white rounded-tl-lg rounded-tr-lg">
                  <div className="flex items-center justify-between gap-6 text-sm w-[270px] p-4 bg-white">
                    <button
                      onClick={handlePrevMonth}
                      className="text-[#292D32] border border-[#F1F2F4] w-[32px] h-[32px] flex items-center justify-center p-[10px] cursor-pointer rounded-[8px]"
                      aria-label="Previous month"
                    >
                      <FaChevronLeft />
                    </button>

                    <div className="text-[#00201F] text-sm font-medium">
                      {viewDate.toLocaleDateString("default", {
                        month: "long",
                      })}{" "}
                      {viewDate.getFullYear()}
                    </div>

                    <button
                      onClick={handleNextMonth}
                      className="text-[#292D32] border border-[#F1F2F4] w-[32px] h-[32px] flex items-center justify-center p-[10px] cursor-pointer rounded-[8px]"
                      aria-label="Next month"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>

                {/* Days Header */}
                <div className="flex flex-wrap border border-[#F1F2F4]">
                  {daysNames.map((day) => (
                    <div
                      key={day}
                      className="w-[14.28%] h-[40px] sm:h-[52px] bg-[#FAFAFA] border border-[#F1F2F4] text-center text-[8px] lg:text-[12px] text-[#1E1E1E] font-semibold flex items-center justify-center"
                    >
                      <span>{day}</span>
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="flex flex-wrap">
                  {Array.from({ length: startDay }).map((_, i) => (
                    <div
                      key={`blank-${i}`}
                      className="w-[14.28%] aspect-square bg-white text-center"
                    />
                  ))}

                  {daysInMonth.map((day, idx) => {
                    const available = isWithinRange(day, startDate, endDate);
                    const beforeWindow =
                      new Date(
                        day.getFullYear(),
                        day.getMonth(),
                        day.getDate()
                      ) <
                      new Date(
                        startDate.getFullYear(),
                        startDate.getMonth(),
                        startDate.getDate()
                      );

                    return (
                      <div
                        key={day.toISOString()}
                        className={`w-[14.28%] aspect-square px-4 py-2 text-center ${idx === 0 ? "border-l" : ""
                          } ${idx >= Math.max(daysInMonth.length - 7, 0)
                            ? "border-b"
                            : ""
                          } border-r border-t border-[#DCE4E8] bg-white text-[10px] lg:text-sm text-[#1E1E1E] flex flex-col justify-between select-none relative`}
                      >
                        {/* Date number */}
                        <span className="w-full flex items-center justify-end rounded-full text-[#1E1E1E]">
                          {day.getDate()}
                        </span>

                        {/* Status */}
                        {available ? (
                          <div className="text-[12px] w-full text-start flex flex-col">
                            <span className="text-[#A4A4A4] font-medium truncate">
                              Available
                            </span>
                            <div className="text-[#4A4C56] text-[10px] lg:text-sm font-medium flex items-center gap-[2px]">
                              ${price}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                              >
                                <path
                                  d="M11.0703 5.25003C11.0703 5.25003 8.49262 8.75 7.57031 8.75C6.64795 8.75 4.07031 5.25 4.07031 5.25"
                                  stroke="#141B34"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        ) : beforeWindow ? (
                          <div
                            className={`h-[25px] sm:h-[33px] w-full bg-[#FE5050] absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center text-white font-medium text-[10px] lg:text-sm ${idx === 0 ? "rounded-l-full" : ""
                              }`}
                          >
                            {idx === 0 ? "Closed" : ""}
                          </div>
                        ) : (
                          <div className="text-[12px] w-full text-start flex flex-col">
                            <span className="text-[#A4A4A4] font-medium truncate">
                              Unavailable
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FAQs / Info */}
            <div className="space-y-6 max-w-2xl bg-white rounded-lg p-6">
              <h3 className="text-[#23262F] text-2xl font-medium">
                That&apos;s it! You&apos;ve done everything you need to before your
                first guest stays.
              </h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-[24px]">
                    <svg
                      className="mt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.3307 9.9974C18.3307 5.39502 14.5997 1.66406 9.9974 1.66406C5.39502 1.66406 1.66406 5.39502 1.66406 9.9974C1.66406 14.5997 5.39502 18.3307 9.9974 18.3307C14.5997 18.3307 18.3307 14.5997 18.3307 9.9974Z"
                        stroke="#777980"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10.2005 14.1641V9.9974C10.2005 9.60456 10.2005 9.40815 10.0784 9.28606C9.95644 9.16406 9.76002 9.16406 9.36719 9.16406"
                        stroke="#777980"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.99219 6.66406H9.99969"
                        stroke="#777980"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-[#23262F] text-[18px] font-medium">
                      Can I decide when I get bookings?
                    </h2>
                    <p className="text-[#777980] text-sm">
                      Yes. Keep your calendar up to date. Close any dates you don&apos;t
                      want bookings. If you have bookings on other sites, close those
                      dates too.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-[24px]">{/* same icon omitted for brevity */}</div>
                  <div className="space-y-3">
                    <h2 className="text-[#23262F] text-[18px] font-medium">
                      Are bookings confirmed right away?
                    </h2>
                    <p className="text-[#777980] text-sm">
                      No, you have to accept the booking before it&apos;s confirmed.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-[24px]">{/* same icon omitted */}</div>
                  <div className="space-y-3">
                    <h2 className="text-[#23262F] text-[18px] font-medium">
                      Can I choose which requests I accept or decline?
                    </h2>
                    <p className="text-[#777980] text-sm">
                      Yes, you can accept or decline any booking requests you receive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex mt-1">
                    <input
                      type="checkbox"
                      id="licenses"
                      className="hidden"
                      checked={licenses}
                      onChange={() => setLicenses((p) => !p)}
                    />
                    <label
                      htmlFor="licenses"
                      className={`select-none w-[24px] h-[24px] ${!licenses
                        ? "border-[#777980]"
                        : "border-[#D6AE29] bg-[#D6AE29]"
                        } border-[2px] rounded-[6px] flex items-center justify-center`}
                    >
                      {licenses && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <rect
                            x="1.25"
                            y="1.25"
                            width="19.5"
                            height="19.5"
                            rx="3.75"
                            fill="#D6AE29"
                          />
                          <rect
                            x="1.25"
                            y="1.25"
                            width="19.5"
                            height="19.5"
                            rx="3.75"
                            stroke="#D6AE29"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M16.25 7.0625L9.03125 14.2812L5.75 11"
                            stroke="#070707"
                            strokeWidth="1.95"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </label>
                  </div>
                  <p className="text-[#070707]">
                    I certify that this is a legitimate accommodation business with all
                    necessary licenses and permits, which can be shown upon first
                    request. Booking.com B.V. reserves the right to verify and
                    investigate any details provided in this registration.
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="flex mt-1">
                    <input
                      type="checkbox"
                      id="termsPolicy"
                      className="hidden"
                      checked={termsPolicy}
                      onChange={() => setTermsPolicy((p) => !p)}
                    />
                    <label
                      htmlFor="termsPolicy"
                      className={`select-none w-[24px] h-[24px] ${!termsPolicy
                        ? "border-[#777980]"
                        : "border-[#D6AE29] bg-[#D6AE29]"
                        } border-[2px] rounded-[6px] flex items-center justify-center`}
                    >
                      {termsPolicy && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <rect
                            x="1.25"
                            y="1.25"
                            width="19.5"
                            height="19.5"
                            rx="3.75"
                            fill="#D6AE29"
                          />
                          <rect
                            x="1.25"
                            y="1.25"
                            width="19.5"
                            height="19.5"
                            rx="3.75"
                            stroke="#D6AE29"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M16.25 7.0625L9.03125 14.2812L5.75 11"
                            stroke="#070707"
                            strokeWidth="1.95"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </label>
                  </div>
                  <div>
                    <h3 className="text-[#070707]">
                      I have read, accepted, and agreed to the{" "}
                      <a href="#" className="text-[#0068EF]">
                        General Delivery Terms
                      </a>
                      .
                    </h3>
                    <p className="text-[#777980]">
                      Payments by Booking.com uses Stripe as its payment provider. By
                      signing up for this service, you accept the{" "}
                      <a href="#" className="text-[#0068EF]">
                        Stripe Services Agreement
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#0068EF]">
                        Stripe Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between w-full space-x-3 px-4">
              <button
                type="button"
                className="text-[#0068EF] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#0068EF] rounded-[8px] cursor-pointer"
                onClick={() => router.back()}
              >
                Back
              </button>

              <button
                type="button"
                disabled={!licenses || !termsPolicy || loading}
                className="text-[#fff] px-6 sm:px-[32px] py-2 sm:py-3 border border-[#fff] bg-[#0068EF] rounded-[8px] disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                    Creating...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>

          {/* Right Side (Date pickers) */}
          <div className="w-full md:w-[312px] space-y-4">
            <div className="space-y-5 p-5 bg-white rounded-lg">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-col space-y-3">
                    <label htmlFor="startDate" className="text-[#070707] font-normal">
                      Start Date
                    </label>
                    <div className="w-full flex gap-1 border px-[20px] py-[15px] rounded-lg text-[#777980] text-sm">
                      <input
                        type="date"
                        id="startDate"
                        className="w-[20px] cursor-pointer"
                        onChange={(e) => {
                          const d = new Date(e.target.value);
                          if (!Number.isNaN(d.getTime())) setStartDate(d);
                        }}
                      />
                      <div className="flex-1">{formatted(startDate)}</div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <label htmlFor="endDate" className="text-[#070707]">
                      End Date
                    </label>
                    <div className="w-full flex gap-1 border px-[20px] py-[15px] rounded-lg text-[#777980] text-sm">
                      <input
                        type="date"
                        id="endDate"
                        className="w-[20px] cursor-pointer"
                        onChange={(e) => {
                          const d = new Date(e.target.value);
                          if (!Number.isNaN(d.getTime())) setEndDate(d);
                        }}
                      />
                      <div className="flex-1">{formatted(endDate)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
