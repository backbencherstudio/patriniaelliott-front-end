import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../lib/Fetch";

const buildAuthHeader = (context: any = null) => {
  const tokenKeys = ["tourAccessToken", "token", "accessToken", "authToken", "vendorToken", "userToken"];
  let token: string | null = null;
  for (const key of tokenKeys) {
    const value = CookieHelper.get({ key, context });
    if (value) {
      token = value;
      break;
    }
  }
  if (!token) return null;
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const MyProfileService = {
  // GET /auth/me → current authenticated user profile
  getMe: async (context: any = null) => {
    const config = buildAuthHeader(context);
    if (!config) {
      throw new Error("Authentication token not found. Please login again.");
    }
    return await Fetch.get("/auth/me", config);
  },

  // PATCH /user-profile/update → update authenticated user profile
  updateMe: async (data: any, context: any = null) => {
    const config = buildAuthHeader(context);
    if (!config) {
      throw new Error("Authentication token not found. Please login again.");
    }
    return await Fetch.patch("/user-profile/update", data, config);
  },

  // POST /auth/change-password → change authenticated user's password
  changePassword: async (
    data: { old_password: string; new_password: string },
    context: any = null
  ) => {
    const config = buildAuthHeader(context);
    if (!config) {
      throw new Error("Authentication token not found. Please login again.");
    }
    return await Fetch.post("/auth/change-password", data, config);
  },

  // POST /user-profile/card → add a new payment card for the authenticated user
  addCard: async (
    data: {
      card_number: string;
      expiry_month: number;
      expiry_year: number;
      cvv: string;
      billing_country: string;
      billing_street_address: string;
      billing_apt_suite_unit?: string | null;
      billing_city: string;
      billing_state: string;
      billing_zip_code: string;
    },
    context: any = null
  ) => {
    const config = buildAuthHeader(context);
    if (!config) {
      throw new Error("Authentication token not found. Please login again.");
    }
    return await Fetch.post("/user-profile/card", data, config);
  },

  // GET /user-profile/cards/{customer_id} → get all payment cards for the authenticated user
  getCards: async (customerId: string, context: any = null) => {
    const config = buildAuthHeader(context);
    if (!config) {
      throw new Error("Authentication token not found. Please login again.");
    }
    return await Fetch.get(`/user-profile/cards/${customerId}`, config);
  },

  // DELETE /user-profile/cards/{card_id} → delete a payment card
  deleteCard: async (cardId: string, context: any = null) => {
    const config = buildAuthHeader(context);
    if (!config) {
      throw new Error("Authentication token not found. Please login again.");
    }
    return await Fetch.delete(`/user-profile/cards/${cardId}`, config);
  },

  // DELETE /user-profile/delete → permanently delete authenticated user account
  deleteAccount: async (
    data: { email: string; password: string; feedback?: string },
    context: any = null
  ) => {
    const config = buildAuthHeader(context);
    if (!config) {
      throw new Error("Authentication token not found. Please login again.");
    }
    return await Fetch.delete("/user-profile/delete", { ...config, data });
  },
};

