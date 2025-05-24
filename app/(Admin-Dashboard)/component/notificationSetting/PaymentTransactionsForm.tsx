"use client";

import { useForm, Controller } from "react-hook-form";

type PaymentForm = {
  minGuestPayment: string;
  bookingExpiry: string;
  minWithdrawal: string;
  withdrawalFee: string;
  withdrawalTime: string;
  adminCommission: string;
  paymentMethods: string[];
};

const paymentOptions = ["Credit Cards", "PayPal", "Bank Transfers", "Cryptocurrency"];

export default function PaymentTransactionsForm() {
  const { control, handleSubmit, watch, setValue } = useForm<PaymentForm>({
    defaultValues: {
      minGuestPayment: "10 %",
      bookingExpiry: "10 min",
      minWithdrawal: "$5,000",
      withdrawalFee: "1%",
      withdrawalTime: "3-5 Business Days",
      adminCommission: "10 %",
      paymentMethods: ["Credit Cards", "Bank Transfers"], // Pre-selected
    },
  });

  const onSubmit = (data: PaymentForm) => {
    console.log(data);
  };

  const selectedMethods = watch("paymentMethods");

  const togglePaymentMethod = (method: string) => {
    const updated = selectedMethods.includes(method)
      ? selectedMethods.filter((m) => m !== method)
      : [...selectedMethods, method];

    setValue("paymentMethods", updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-1">
      <div className="space-y-4 bg-white rounded-2xl p-6">
        <h3 className="text-xl lg:text-2xl text-headerColor font-medium">Payment & Transactions</h3>

        {/* Guest Minimum Payment */}
        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700">Guest Minimum Payment Required (Per Booking)</label>
          <Controller
            name="minGuestPayment"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                placeholder="10 %"
              />
            )}
          />
        </div>

        {/* Booking Expiry */}
        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700">Booking Expiry Time (Unpaid)</label>
          <Controller
            name="bookingExpiry"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                placeholder="10 min"
              />
            )}
          />
        </div>

        {/* 2 Columns: Withdrawal and Commission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700">Minimum Withdrawal Amount</label>
            <Controller
              name="minWithdrawal"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                  placeholder="$5,000"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700">Withdrawal Processing Fee (%)</label>
            <Controller
              name="withdrawalFee"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                  placeholder="1%"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700">Withdrawal Processing Time</label>
            <Controller
              name="withdrawalTime"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                  placeholder="3-5 Business Days"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700">Admin Commission Rate (%)</label>
            <Controller
              name="adminCommission"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                  placeholder="10 %"
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-lg font-medium text-headerColor mb-4">Payment Methods</h3>
        <Controller
          name="paymentMethods"
          control={control}
          render={() => (
            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMethods.includes(option)}
                    onChange={() => togglePaymentMethod(option)}
                    className="form-checkbox accent-blue-600 w-5 h-5"
                  />
                  <span className="text-[#777980] text-base">{option}</span>
                </label>
              ))}
            </div>
          )}
        />
      </div>
    </form>
  );
}
