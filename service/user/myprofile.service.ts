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
};

