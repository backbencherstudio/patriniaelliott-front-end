'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();
  const router = useRouter()

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log('OTP request sent to:', data.email);
    // Trigger your OTP send logic here
    router.push("/otp-verification")
  };

  return (
    <div className="flex items-center justify-center px-4 min-h-screen">
      <div className="w-full space-y-4">
        {/* Back Link */}
        <div className="text-lg text-descriptionColor flex items-center gap-1">
          <Link href="/login" className="text-xl flex gap-1 items-center font-medium hover:underline">
            <ChevronLeft size={25} /> Back
          </Link>
        </div>

        {/* Header */}
        <div className=' mb-6'>
          <h2 className="text-3xl lg:text-5xl font-medium leading-[126%] text-blackColor mb-2 ">Forgot Password</h2>
          <p className="mt-2 text-descriptionColor text-base leading-[150%] lg:pr-24">
            Enter your registered email address. We'll send you a code to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-blackColor mb-2">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="Enter your email"
              className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-base mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer mt-3 bg-secondaryColor text-blackColor font-semibold py-4 rounded-md transition"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
