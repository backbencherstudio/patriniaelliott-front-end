'use client';

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialShare from '../reusable/SocialShare';
type FormValues = {
    name: string;
    email: string;
    password: string;
};

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted:', data);
        // Add your API call or logic here
    };

    return (
        <div className=" flex items-center justify-center  px-4">
            <div className=" w-full space-y-6">
                <div className="">
                    <h2 className="text-3xl lg:text-5xl leading-[126%] capitalize font-bold text-gray-900">Create New Account</h2>
                    <p className="mt-1 text-descriptionColor text-lg leading-[100%]">Get started for free today!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-base font-medium text-blackColor mb-2">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            placeholder="Pristia Candra"
                            className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'}`}
                        />
                        {errors.name && <p className="text-red-500 text-base mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-base font-medium text-blackColor mb-2">
                            Work Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            type="email"
                            placeholder="pristia@company.com"
                            className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'}`}
                        />
                        {errors.email && <p className="text-red-500 text-base mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-base font-medium text-blackColor mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                {...register('password', { required: 'Password is required' })}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                className={`w-full border rounded-md px-4 py-3 pr-10 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'}`}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-grayColor1 cursor-pointer"
                            >
                                {showPassword ? <EyeOff /> : <Eye/>}

                                
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-base mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className=' pt-4'>

                        <button
                            type="submit"
                            className="w-full bg-secondaryColor text-blackColor  font-semibold py-4 cursor-pointer rounded-md transition"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                {/* OR Separator */}
                <div className="flex items-center gap-2 my-2 mb-5">
                    <hr className="flex-grow border-t border-[#E9E9EA]" />
                    <span className="text-sm text-grayColor1">Or register with</span>
                    <hr className="flex-grow border-t border-[#E9E9EA]" />
                </div>

                {/* Social Buttons */}
               <SocialShare/>

                {/* Footer */}
                <p className="text-center text-sm text-grayColor1">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#27A376] hover:underline">
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
}
