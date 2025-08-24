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
    
    if (!userToken) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/vendor-user-verification/vendor/${vendorId}`, _config);
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
};
