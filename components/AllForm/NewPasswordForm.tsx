"use client";

import { UserService } from "@/service/user/user.service";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function NewPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const password = watch("password");
  const otpCode = localStorage.getItem("otp");
  const Email = localStorage.getItem("verifyemail")
  const onSubmit = async (data: FormValues) => {
    const formData = {
      password: data.password,
      token: otpCode,
      email: Email,
    }
    try {
      const res = await UserService?.newPassword(formData)
      console.log(res);
      if (res?.data?.success == true) {
        toast.success(res?.data?.message)
        localStorage.removeItem("verifyemail")
        setLoading(false)
        router.push("/complete")
      } else {
        toast.error(res?.data?.message)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);

    }
    console.log("Password updated:", data);
    // router.push("/complete")
    console.log(data);

  };

  const passwordValidations = {
    length: password?.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full space-y-6">
        <div>
          <h2 className="text-3xl lg:text-5xl font-semibold text-blackColor">
            Update your password
          </h2>
          <p className="text-descriptionColor text-lg  leading-[150%] mt-4">
            Set your new password with minimum 8 characters with a combination
            of letters and numbers.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-base font-medium text-blackColor mb-3">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={`w-full border rounded-md px-4 py-3 pr-10 focus:outline-none focus:ring-2 ${errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-500"
                  }`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-grayColor1 cursor-pointer"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-base mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Password Rules */}
          <ul className="text-sm grid grid-cols-2 space-y-2 ml-1">
            <li
              className={`${passwordValidations.length
                ? "text-greenColor"
                : "text-orengeColor"
                } flex gap-2 capitalize items-center`}
            >
              {" "}
              <span className=" rounded-full text-sm">
                {passwordValidations.length ? (
                  <Check
                    size={16}
                    className="bg-greenColor p-[2px] text-whiteColor rounded-full"
                  />
                ) : (
                  <X
                    size={16}
                    className="bg-orengeColor rounded-full text-whiteColor p-[2px]"
                  />
                )}
              </span>{" "}
              8 characters
            </li>
            <li
              className={`${passwordValidations.hasNumber
                ? "text-greenColor"
                : "text-orengeColor"
                } flex gap-2 capitalize items-center`}
            >
              {" "}
              <span className=" rounded-full text-sm">
                {passwordValidations.hasNumber ? (
                  <Check
                    size={16}
                    className="bg-greenColor p-[2px] text-whiteColor rounded-full"
                  />
                ) : (
                  <X
                    size={16}
                    className="bg-orengeColor rounded-full text-whiteColor p-[2px]"
                  />
                )}
              </span>
              Number (0-9)
            </li>
            <li
              className={`${passwordValidations.hasUpper
                ? "text-greenColor"
                : "text-orengeColor"
                } flex gap-2 capitalize items-center`}
            >
              {" "}
              <span className=" rounded-full text-sm">
                {passwordValidations.hasUpper ? (
                  <Check
                    size={16}
                    className="bg-greenColor p-[2px] text-whiteColor rounded-full"
                  />
                ) : (
                  <X
                    size={16}
                    className="bg-orengeColor rounded-full text-whiteColor p-[2px]"
                  />
                )}
              </span>
              Uppercase letter (A-Z)
            </li>
            <li
              className={`${passwordValidations.hasLower
                ? "text-greenColor"
                : "text-orengeColor"
                } flex gap-2  items-center`}
            >
              {" "}
              <span className=" rounded-full text-sm">
                {passwordValidations.hasLower ? (
                  <Check
                    size={16}
                    className="bg-greenColor p-[2px] text-whiteColor rounded-full"
                  />
                ) : (
                  <X
                    size={16}
                    className="bg-orengeColor rounded-full text-whiteColor p-[2px]"
                  />
                )}
              </span>
              Lowercase letter (a-z)
            </li>
          </ul>

          {/* Confirm Password */}
          <div>
            <label className="block text-base font-medium text-blackColor mb-3">
              Confirmation New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Confirmation is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-type your new password"
                className={`w-full border rounded-md px-4 py-3 pr-10 focus:outline-none focus:ring-2 ${errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-500"
                  }`}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-grayColor1 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-base mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-secondaryColor text-blackColor font-semibold py-4 rounded-md transition hover:bg-[#d4a900]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
