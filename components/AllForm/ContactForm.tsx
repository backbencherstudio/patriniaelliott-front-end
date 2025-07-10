"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  fullName: string
  phone: string
  email: string
  topic: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      topic: "",
      message: "",
    },
  })
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", data)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleTopicChange = (value: string) => {
    setValue("topic", value)
  }
  return (
     <div className="w-full bg-whiteColor p-4 py-6 rounded-sm lg:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-base font-medium mb-1">
                Full Name <span className="text-redColor">*</span>
              </label>
              <Input
                id="fullName"
                placeholder="Elisabeth Sarah"
                {...register("fullName", { required: "Full name is required" })}
                className={`w-full py-6 ${errors.fullName ? "border-redtext-redColor" : ""}`}
              />
              {errors.fullName && <p className="text-redColor text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-base font-medium mb-1">
                Phone <span className="text-redColor">*</span>
              </label>
              <Input
                id="phone"
                placeholder="+6726 664 074"
                {...register("phone", { required: "Phone number is required" })}
                className={`w-full py-6${errors.phone ? "border-redtext-redColor" : ""}`}
              />
              {errors.phone && <p className="text-redColor text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-medium mb-1">
                Email <span className="text-redColor">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="elisabeth_sarah@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full  py-6${errors.email ? "border-redtext-redColor" : ""}`}
              />
              {errors.email && <p className="text-redColor text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="topic" className="block text-base font-medium mb-1">
                Topic <span className="text-redColor">*</span>
              </label>
              <Select onValueChange={handleTopicChange}>
                <SelectTrigger id="topic" className={`w-full py-6${errors.topic ? "border-redtext-redColor" : ""}`}>
                  <SelectValue placeholder="Select your topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("topic", { required: "Please select a topic" })}
                value={watch("topic")}
              />
              {errors.topic && <p className="text-redColor text-xs mt-1">{errors.topic.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-base font-medium mb-1">
                Message <span className="text-redColor">*</span>
              </label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Your message here..."
                {...register("message", { required: "Message is required" })}
                className={`w-full h-[148px] ${errors.message ? "border-redtext-redColor" : ""}`}
              />
              {errors.message && <p className="text-redColor text-xs mt-1">{errors.message.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer bg-blueColor text-base  hover:bg-blue-600 text-white py-6 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>

            {isSuccess && (
              <p className="text-green-500 text-base text-center">Your message has been sent successfully!</p>
            )}
          </form>
        </div>
  )
}
