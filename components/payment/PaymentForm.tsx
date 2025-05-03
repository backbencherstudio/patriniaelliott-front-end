"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Mastercar from "@/public/icon/Mastercar.svg";
import amex from "@/public/icon/amex.svg";
import diners from "@/public/icon/diners-svgrep.svg";
import jcb from "@/public/icon/jcb-svgrepo.svg";
import unionpay from "@/public/icon/unionpay.svg";
import visa from "@/public/icon/visa.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import BookingConfirm from "./BookingConfirm";
// Zod schema
const paymentFormSchema = z.object({
  paymentMethod: z.enum(["card", "other"]),
  cardNumber: z
    .string()
    .regex(
      /^\d{4} \d{4} \d{4} \d{4}$/,
      "Please enter a valid 16-digit card number"
    )
    .optional()
    .refine((val) => !val || val.length > 0, "Card number is required"),
  cardName: z
    .string()
    .min(2, "Please enter the name on your card")
    .optional()
    .refine((val) => !val || val.length > 0, "Card name is required"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Please use MM/YY format")
    .optional()
    .refine((val) => !val || val.length > 0, "Expiry date is required"),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .optional()
    .refine((val) => !val || val.length > 0, "CVV is required"),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export default function PaymentForm() {
  const [selectedMethod, setSelectedMethod] = useState<"card" | "other">(
    "card"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
 const [isOpen , setIsOpen]=useState(false)

 
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: PaymentFormValues) => {
    setIsSubmitting(true);
    console.log("Form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsOpen(true)
  };

  const handlePaymentMethodChange = (value: "card" | "other") => {
    setSelectedMethod(value);
    form.setValue("paymentMethod", value);
  };

  const formatCardNumber = (value: string) =>
    value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .match(/\d{4,16}/g)?.[0]
      .match(/.{1,4}/g)
      ?.join(" ") ?? value;

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v.length > 2 ? `${v.substring(0, 2)}/${v.substring(2, 4)}` : v;
  };

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s+/g, "");
    if (/^4/.test(number)) return "visa";
    if (/^5[1-5]/.test(number)) return "mastercard";
    if (/^3[47]/.test(number)) return "amex";
    if (/^(6011|65|64[4-9])/.test(number)) return "discover";
    return "generic";
  };

  const cardType = getCardType(form.watch("cardNumber") || "");

  return (
    <div className="w-full   space-y-8">
      {/* Header */}
      <div className="space-y-8">
        <h2 className="text-2xl lg:text-5xl font-medium text-headerColor">Payment Method</h2>
        <p className="text-2xl text-headerColor font-medium leading-[150%]">Select a payment method</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className=" p-6 rounded-2xl bg-bgColor">
        <RadioGroup
          value={selectedMethod}
          onValueChange={(val) =>
            handlePaymentMethodChange(val as "card" | "other")
          }
          className="space-y-4"
        >
          {/* Card Method */}
          <div className="">
            <div className=" flex justify-between items-center">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="card" id="card" className="" />
                <Label
                  htmlFor="card"
                  className="flex text-xl items-center gap-2 font-medium text-headerColor"
                >
                  Debit/Credit Card
                </Label>
              </div>
              <div className=" flex gap-2">
               <Image src={visa} alt="visa" width={37} height={24} className=""/>
               <Image src={Mastercar} alt="visa" width={37} height={24} className=""/>
               <Image src={amex} alt="amex" width={37} height={24} className=""/>
               <Image src={jcb} alt="jcb" width={37} height={24} className=""/>
               <Image src={diners} alt="diners" width={37} height={24} className=""/>
               <Image src={unionpay} alt="diners" width={37} height={24} className=""/>
               
              </div>
            </div>

            <div className="">
              {selectedMethod === "card" && (
                <div className="mt-4 space-y-5">
                  {/* Card Number */}
                  <div>
                    <Label htmlFor="cardNumber" className=" text-base mb-0.5">Card Number</Label>
                    <input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      {...form.register("cardNumber")}
                      onChange={(e) =>
                        form.setValue(
                          "cardNumber",
                          formatCardNumber(e.target.value),
                          { shouldValidate: true }
                        )
                      }
                      className="mt-1 py-3 border border-grayColor1/20 w-full px-4 rounded-sm"
                    />
                    {form.formState.errors.cardNumber && (
                      <p className="text-xs text-red-500 mt-1">
                        {form.formState.errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                  {/* Card Name */}
                  <div>
                    <Label htmlFor="cardName" className=" text-base mb-0.5">Card Name</Label>
                    <input
                      id="cardName"
                      placeholder="Name on card"
                      {...form.register("cardName")}
                     className="mt-1 py-3 border border-grayColor1/20 w-full px-4 rounded-sm"
                    />
                    {form.formState.errors.cardName && (
                      <p className="text-xs text-red-500 mt-1">
                        {form.formState.errors.cardName.message}
                      </p>
                    )}
                  </div>
                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className=" text-base mb-0.5">Expiry Date</Label>
                      <input
                        id="expiryDate"
                        placeholder="MM/YY"
                        maxLength={5}
                        {...form.register("expiryDate")}
                        onChange={(e) =>
                          form.setValue(
                            "expiryDate",
                            formatExpiryDate(e.target.value),
                            { shouldValidate: true }
                          )
                        }
                        className="mt-1 py-3 border border-grayColor1/20 w-full px-4 rounded-sm"
                      />
                      {form.formState.errors.expiryDate && (
                        <p className="text-xs text-red-500 mt-1">
                          {form.formState.errors.expiryDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="cvv" className=" text-base mb-0.5">CVV</Label>
                      <input
                        id="cvv"
                        placeholder="•••"
                        type="password"
                        maxLength={4}
                        {...form.register("cvv")}
                        className="mt-1 py-3 border border-grayColor1/20 w-full px-4 rounded-sm"
                      />
                      {form.formState.errors.cvv && (
                        <p className="text-xs text-red-500 mt-1">
                          {form.formState.errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Other Method */}
  <div className=" flex justify-between">
 <div className=" flex items-start gap-2">
            <RadioGroupItem value="other" id="other" className="  mt-1.5" />
            <div className="flex-1">
              <Label htmlFor="other" className="font-medium text-headerColor text-xl">
                Other Payment Methods
              </Label>
             
                <p className="text-sm text-grayColor1 mt-1">
                  Select another payment method
                </p>
             
            </div>
          </div>
          <div>
             <Image src="/icon/paypal.svg" alt="paypal" width={83} height={24} className=""/>
          </div>
  </div>

         
        </RadioGroup>
</div>
        {/* Terms & Button */}
        <div className="text-base text-slate-500 p-3 rounded-md">
         By submitting this booking, I acknowledge that I have read and agree to “RandomTrip’s ”{" "}
          <Link
            href="#"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Terms of Us
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Privacy Statement
          </Link>
          .
        </div>

        <button
          type="submit"
     
          className="w-full h-12 text-base bg-secondaryColor cursor-pointer text-headerColor font-semibold rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Pay Now"}
        </button>

      </form>

      {/* Note */}
      <div className=" text-[#FE5050]  text-base rounded-md flex items-start gap-2">
        <div className=" w-5 mt-1.5">
 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M10 0C4.62391 0 0.25 4.37391 0.25 9.75C0.25 15.1261 4.62391 19.5 10 19.5C15.3761 19.5 19.75 15.1261 19.75 9.75C19.75 4.37391 15.3761 0 10 0ZM10 14.9958C9.81458 14.9958 9.63332 14.9408 9.47915 14.8378C9.32498 14.7348 9.20482 14.5884 9.13386 14.417C9.06291 14.2457 9.04434 14.0572 9.08051 13.8754C9.11669 13.6935 9.20598 13.5265 9.33709 13.3954C9.4682 13.2643 9.63525 13.175 9.8171 13.1388C9.99896 13.1026 10.1875 13.1212 10.3588 13.1921C10.5301 13.2631 10.6765 13.3833 10.7795 13.5374C10.8825 13.6916 10.9375 13.8729 10.9375 14.0583C10.9375 14.3069 10.8387 14.5454 10.6629 14.7212C10.4871 14.897 10.2486 14.9958 10 14.9958ZM11.0181 5.56687L10.7491 11.2856C10.7491 11.4845 10.67 11.6753 10.5294 11.816C10.3887 11.9566 10.198 12.0356 9.99906 12.0356C9.80015 12.0356 9.60938 11.9566 9.46873 11.816C9.32808 11.6753 9.24906 11.4845 9.24906 11.2856L8.98 5.56969V5.56734C8.9741 5.42997 8.99607 5.29282 9.04458 5.16415C9.09308 5.03549 9.16713 4.91797 9.26225 4.81868C9.35737 4.71938 9.47161 4.64037 9.59807 4.58639C9.72454 4.53241 9.86062 4.50458 9.99813 4.50458C10.1356 4.50458 10.2717 4.53241 10.3982 4.58639C10.5246 4.64037 10.6389 4.71938 10.734 4.81868C10.8291 4.91797 10.9032 5.03549 10.9517 5.16415C11.0002 5.29282 11.0221 5.42997 11.0162 5.56734L11.0181 5.56687Z" fill="#FE5050"/>
</svg>
        </div>
      Cancellations must be made at least 24 hours before check-in to be eligible for a refund; cancellations after this deadline may result in a partial refund or no refund, depending on the provider’s policy.
      </div>

      {isOpen && <BookingConfirm isOpen={isOpen} setIsOpen={setIsOpen}/>}
    </div>
  );
}
