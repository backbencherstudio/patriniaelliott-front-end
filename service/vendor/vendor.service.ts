import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../lib/Fetch";
import { parseCookies } from "nookies";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const VendorService = {
  // Get authentication token from cookie
  getAuthToken: (context: any = null) => {
    // Try multiple possible token keys
    const tokenKeys = ['tourAccessToken', 'token', 'accessToken', 'authToken'];
    
    for (const key of tokenKeys) {
      const token = CookieHelper.get({ key, context });
      if (token) {
        console.log(`Found token using key: ${key}`);
        return token;
      }
    }
    
    console.log('No authentication token found in cookies');
    return null;
  },

  // Debug method to check authentication status
  debugAuth: (context: any = null) => {
    const allCookies = parseCookies(context);
    const tokenKeys = ['tourAccessToken', 'token', 'accessToken', 'authToken'];
    const foundTokens: { [key: string]: any } = {};
    
    tokenKeys.forEach(key => {
      const token = CookieHelper.get({ key, context });
      if (token) {
        foundTokens[key] = {
          exists: true,
          length: token.length,
          preview: `${token.substring(0, 10)}...`
        };
      } else {
        foundTokens[key] = { exists: false };
      }
    });
    
    return {
      foundTokens,
      allCookies: Object.keys(allCookies),
      cookieCount: Object.keys(allCookies).length,
      hasAnyToken: Object.values(foundTokens).some(t => t.exists)
    };
  },

  // Test API endpoint connectivity
  testEndpoint: async (vendorId: string) => {
    try {
      const response = await fetch(`http://192.168.4.35:4000/api/vendor-user-verification/vendor/${vendorId}`);
      return {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      };
    } catch (error) {
      return {
        error: error.message,
        status: 'Network Error'
      };
    }
  },

  // Test API with custom token (for debugging)
  testEndpointWithToken: async (vendorId: string, token: string) => {
    try {
      const response = await fetch(`http://192.168.4.35:4000/api/vendor-user-verification/vendor/${vendorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json().catch(() => null);
      
      return {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
        data: data
      };
    } catch (error) {
      return {
        error: error.message,
        status: 'Network Error'
      };
    }
  },

  // Check if user is logged in by looking at current page
  checkLoginStatus: () => {
    // Check if we're on a protected page
    const currentPath = window.location.pathname;
    const isProtectedPage = currentPath.includes('vendor-profile') || currentPath.includes('my-booking');
    
    // Check if we have any authentication tokens
    const hasToken = VendorService.getAuthToken();
    
    return {
      isProtectedPage,
      hasToken,
      currentPath,
      shouldBeLoggedIn: isProtectedPage
    };
  },

  // Get vendor profile data
  getVendorProfile: async (vendorId: string, token: string) => {
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    return await Fetch.get(`/vendor-user-verification/vendor/${vendorId}`, _config);
  },

  // Update vendor profile data
  updateVendorProfile: async (vendorId: string, data: any, token: string) => {
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    return await Fetch.patch(`/vendor-user-verification/vendor/${vendorId}`, data, _config);
  },

  // Update vendor profile with form data (for file uploads)
  updateVendorProfileFormData: async (vendorId: string, data: FormData, token: string) => {
    const _config = {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    };

    return await Fetch.patch(`/vendor-user-verification/vendor/${vendorId}`, data, _config);
  },

  // Get vendor data using token from cookie
  getVendorProfileWithCookie: async (vendorId: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    console.log('🔑 Token check:', userToken ? 'Token found' : 'No token');
    console.log('🆔 Vendor ID:', vendorId);
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const endpoint = `/vendor-user-verification/vendor/${vendorId}`;
    console.log('🌐 API Endpoint:', endpoint);
    console.log('📤 Request config:', _config);
    console.log('🔗 Full URL will be:', `${process.env.NEXT_PUBLIC_API_ENDPOINT || "https://honors-whale-even-inspiration.trycloudflare.com"}/api${endpoint}`);

    const response = await Fetch.get(endpoint, _config);
    console.log('📥 Response received:', response);
    
    return response;
  },

  // Update vendor profile using token from cookie
  updateVendorProfileWithCookie: async (vendorId: string, data: any, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.patch(`/vendor-user-verification/vendor/${vendorId}`, data, _config);
  },

  // Balance & Withdrawals
  getBalance: async (context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get("/vendor/balance", _config);
  },

  getWithdrawalHistory: async (params: any = {}, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const queryString = new URLSearchParams(params).toString();
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/vendor/withdrawals?${queryString}`, _config);
  },

  // Transaction History
  getTransactions: async (params: any = {}, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const queryString = new URLSearchParams(params).toString();
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/vendor/transactions?${queryString}`, _config);
  },

  getTransactionDetails: async (id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/vendor/transactions/${id}`, _config);
  },

  getAllBookings: async (params: any = {}, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const queryString = new URLSearchParams(params).toString();
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/vendor/bookings?${queryString}`, _config);
  },

  getAllRefunds: async (params: any = {}, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const queryString = new URLSearchParams(params).toString();
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/vendor/refunds?${queryString}`, _config);
  },

  getRefundDetails: async (id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/vendor/refunds/${id}`, _config);
  },

  // Vendor Verification
  submitVerification: async (data: any, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.post("/vendor/verification", data, _config);
  },

  submitVerificationStep: async (step: number, data: any, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const stepEndpoints = [
      "/vendor/verification/step-0",
      "/vendor/verification/step-1", 
      "/vendor/verification/step-2",
      "/vendor/verification/step-3",
      "/vendor/verification/step-4"
    ];

    return await Fetch.post(stepEndpoints[step], data, _config);
  },

  getVerificationStatus: async (context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get("/vendor/verification/status", _config);
  },

  // Vendor Packages (Pending/Approved)
  getVendorPackages: async (params: any = {}, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const queryString = Object.keys(params).length
      ? `?${new URLSearchParams(params).toString()}`
      : '';

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    // Mirrors Insomnia path: /api/admin/vendor-package
    return await Fetch.get(`/admin/vendor-package${queryString}`, _config);
  },

  updateVendorPackage: async (id: string, data: any, context: any = null) => {
    const userToken = CookieHelper.get({ key: "tourAccessToken", context });
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    return await Fetch.put(`/admin/vendor-package/${id}`, data, _config);
  },
};
