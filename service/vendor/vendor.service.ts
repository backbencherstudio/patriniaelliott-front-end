import { Fetch } from "../../lib/Fetch";

export const VendorService = {
  // Profile Management
  getProfile: async (token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get("/vendor-user-verification", config);
  },

  updateProfile: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.patch("/vendor/profile", data, config);
  },

  updateProfileWithImage: async (data: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.patch("/vendor/profile", data, config);
  },

  // Vendor Verification - Step by Step
  submitVerificationStep0: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.post("/vendor/verification/step-0", data, config);
  },

  submitVerificationStep1: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.post("/vendor/verification/step-1", data, config);
  },

  submitVerificationStep2: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.post("/vendor/verification/step-2", data, config);
  },

  submitVerificationStep3: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.post("/vendor/verification/step-3", data, config);
  },

  submitVerificationStep4: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.post("/vendor/verification/step-4", data, config);
  },

  // Complete verification submission
  submitVerification: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.post("/vendor/verification", data, config);
  },

  // Update vendor verification (PATCH)
  updateVendorVerification: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.patch("/vendor-user-verification", data, config);
  },

  getVerificationStatus: async (token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get("/vendor/verification/status", config);
  },

  // Payment Methods
  getPaymentMethods: async (token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get("/vendor/payment-methods", config);
  },

  addPaymentMethod: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.post("/vendor/payment-methods", data, config);
  },

  updatePaymentMethod: async (id: string, data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.patch(`/vendor/payment-methods/${id}`, data, config);
  },

  deletePaymentMethod: async (id: string, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.delete(`/vendor/payment-methods/${id}`, config);
  },

  // Transaction History
  getTransactions: async (params: any, token: string) => {
    const queryString = new URLSearchParams(params).toString();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get(`/vendor/transactions?${queryString}`, config);
  },

  getTransactionDetails: async (id: string, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get(`/vendor/transactions/${id}`, config);
  },

  // All Bookings
  getAllBookings: async (params: any, token: string) => {
    const queryString = new URLSearchParams(params).toString();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get(`/vendor/bookings?${queryString}`, config);
  },

  // All Refunds
  getAllRefunds: async (params: any, token: string) => {
    const queryString = new URLSearchParams(params).toString();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get(`/vendor/refunds?${queryString}`, config);
  },

  getRefundDetails: async (id: string, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get(`/vendor/refunds/${id}`, config);
  },

  // Balance & Withdrawals
  getBalance: async (token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get("/vendor/balance", config);
  },

  withdrawBalance: async (data: any, token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.post("/vendor/withdraw", data, config);
  },

  getWithdrawalHistory: async (params: any, token: string) => {
    const queryString = new URLSearchParams(params).toString();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Fetch.get(`/vendor/withdrawals?${queryString}`, config);
  },
}; 