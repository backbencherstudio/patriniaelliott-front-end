'use client';

import { UserService } from '@/service/user/user.service';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type OTPFormValues = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
};

export default function OtpVerificationForm() {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<OTPFormValues>();

  const router = useRouter();
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    otpRefs[0].current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    setValue(`otp${index + 1}` as keyof OTPFormValues, value);

    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current?.focus();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !getValues(`otp${index + 1}` as keyof OTPFormValues) && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };



  const onSubmit = async (data: OTPFormValues) => {
    const Email = localStorage.getItem("verifyemail")
    const otpCode = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}${data.otp6}`;
    const formData: any = {};
    formData.email = Email;
    formData.token = otpCode;
    setLoading(true)
    try {
      const res = await UserService?.emailVerify(formData)

      if (res?.data?.success == true) {
        toast.success(res?.data?.message)
        setLoading(false)
        if (pathname == "/otp-verification") {
          router.push("/new-password")
          localStorage.setItem("otp", otpCode)
        } else {
          localStorage.removeItem("verifyemail")
          router.push("/login")
        }
      } else {
        toast.error(res?.data?.message)
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full  space-y-6">
        <div>
          <h2 className="text-3xl lg:text-5xl font-medium leading-[126%] text-blackColor mb-2">OTP Verification</h2>
          <p className="mt-2 text-descriptionColor leading-[150%] text-lg">
            We have sent a verification code to email address
          </p>
          <p>
            <span className="text-descriptionColor leading-[150%] font-normal text-lg">pristia@gmail.com</span>.{' '}
            <Link href="/forgot-password" className="text-redColor font-normal hover:underline">
              Wrong Email?
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Inputs */}
          <div className="grid grid-cols-6 gap-4">
            {['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'].map((field, index) => (
              <Controller
                key={field}
                control={control}
                name={field as keyof OTPFormValues}
                defaultValue=""
                rules={{ required: true, pattern: /^[0-9]$/ }}
                render={() => (
                  <input
                    ref={otpRefs[index]}
                    maxLength={1}
                    inputMode="numeric"
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full text-center border border-gray-300 rounded-md py-3 text-lg focus:outline-none focus:ring-1 focus:ring-[#83BF6E] focus:border-[#83BF6E]"
                  />
                )}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full disabled:bg-grayColor1 disabled:text-white/50 disabled:cursor-not-allowed  bg-secondaryColor cursor-pointer text-blackColor font-semibold py-4 rounded-md transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
