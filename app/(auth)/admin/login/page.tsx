'use client';

import { CookieHelper } from '@/helper/cookie.helper';
import { UserService } from '@/service/user/user.service';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};
function LoginPage() {
 const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const onSubmit = async (data: LoginFormValues) => {
    const formData: any = {};
    formData.email = data.email;
    formData.password = data.password;
    setLoading(true)
    try {
      const res = await UserService?.login(formData)
      console.log(res);

      const token = res?.data?.authorization?.token
      if (res?.data?.success == true) {
        toast.success(res?.data?.message)
        CookieHelper.set({ key: "tourAccessToken", value: token })
        setLoading(false)
        router.push("/dashboard")
      } else {
        toast.error(res?.response?.data?.message?.message)
        setLoading(false)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message?.message)
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className='h-screen flex  mx-auto items-center max-w-md '>
      <div className=" border p-6 rounded-xl shadow-2xl   w-full flex items-center justify-center px-4">
        <div className="w-full space-y-6">
          <div className=' text-center'>
            <h2 className="text-2xl  font-medium leading-[126%] text-blackColor">Welcome To Admin</h2>
            <p className="mt-1 text-descriptionColor text-base leading-[100%]">Welcome back! Please enter your details.</p>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-base font-medium text-blackColor mb-2">
              Email <span className="text-red-500">*</span>
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
                <button
                  aria-label="Show password"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-grayColor1 cursor-pointer"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-base mt-1">{errors.password.message}</p>}
            </div>
           
            <div className="pt-4">
              <button
                aria-label="Get started"
                type="submit"
                disabled={loading}
                className="w-full disabled:bg-grayColor1 disabled:text-white/50 disabled:cursor-not-allowed bg-secondaryColor text-blackColor font-semibold py-4 cursor-pointer rounded-md transition"
              >
                {loading ? "Submitting..." : "Get started"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default LoginPage
