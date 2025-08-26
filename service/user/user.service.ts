import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../lib/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const UserService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const data = {
      email: email,
      password: password,
    };
    return await Fetch.post("/auth/login", data, config);
  },

  register: async (data) => {
    let headers = {};
    if (!(data instanceof FormData)) {
      headers = { "Content-Type": "application/json" };
    }
    return await Fetch.post("/auth/register", data, { headers });
  },
  emailVerify: async (data) => {
    
    return await Fetch.post("/auth/verify-email", data, config);
  },
resendVerificationEmail: async (data) => {
     const _config = {
      headers: {
        "Content-Type": "application/json",
        
      },
    };
    return await Fetch.post("/auth/resend-verification-email", data, _config);
  },
newPassword: async (data) => {
     const _config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await Fetch.post("/auth/reset-password", data, _config);
  },

  logout: (context = null) => {
    CookieHelper.destroy({ key: "tourAccessToken", context });
  },
  // get user details
  getUserDetails: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/me`, _config);
  },

  getData: async (endpoint,token ) => {

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    return await Fetch.get(`${endpoint}`, _config);
  },

// update data by id
  updateData: async (endpoint,data,token) => {
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    return await Fetch.patch(`${endpoint}`, data, _config);
  },
// update form data 
  updateFormData: async (endpoint,data,token) => {

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    };

    return await Fetch.patch(`${endpoint}`, data, _config);
  },
  // create data
  createData: async (endpoint,data,token) => {    
   
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    return await Fetch.post(`${endpoint}`, data, _config);
  },
  createPropertyData: async (endpoint,data,token) => {    
    const _config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    return await Fetch.post(`${endpoint}`, data, _config);
  },
  deleteData: async (endpoint,token) => {    
   
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    return await Fetch.delete(`${endpoint}`, _config);
  },

  // confirm data
  confirm: async (
    {
      id,
      token,
      email,
      password,
    }: { id: number; token: string; email: string; password: string },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      id: id,
      token: token,
      email: email,
      password: password,
    };

    return await Fetch.patch(`/user/${id}/password`, data, _config);
  },

  submitVendorVerification: async (data: any, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.post("/vendor-verification", data, _config);
  },
};
