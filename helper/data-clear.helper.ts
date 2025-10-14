/**
 * Comprehensive data clearing utility
 * Clears all user data from localStorage, sessionStorage, cookies, and cache
 */

import { CookieHelper } from "./cookie.helper";

export class DataClearHelper {
  /**
   * Clear all localStorage data
   */
  static clearLocalStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Clear all known localStorage keys
      const knownKeys = [
        'bookingDetails',
        'toure_booking_single_toure',
        'toure_booking_travel_price', 
        'toure_booking_start_date',
        'toure_booking_end_date',
        'toure_booking_travel_count',
        'tourBookingDetails',
        'bookingId',
        'verifyemail',
        'otp',
        'propertyData'
      ];

      // Remove known keys
      knownKeys.forEach(key => {
        localStorage.removeItem(key);
      });

      // Clear any remaining localStorage items (comprehensive cleanup)
      localStorage.clear();
      
      console.log('✅ localStorage cleared successfully');
    } catch (error) {
      console.error('❌ Error clearing localStorage:', error);
    }
  }

  /**
   * Clear all sessionStorage data
   */
  static clearSessionStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      sessionStorage.clear();
      console.log('✅ sessionStorage cleared successfully');
    } catch (error) {
      console.error('❌ Error clearing sessionStorage:', error);
    }
  }

  /**
   * Clear all cookies
   */
  static clearCookies(context = null): void {
    try {
      // Clear known cookie keys
      const knownCookieKeys = [
        'tourAccessToken',
        'token'
      ];

      knownCookieKeys.forEach(key => {
        CookieHelper.destroy({ key, context });
      });

      // Additional cookie clearing for client-side
      if (typeof document !== 'undefined') {
        // Clear all cookies by setting them to expire in the past
        document.cookie.split(";").forEach(function(c) { 
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
      }
      
      console.log('✅ Cookies cleared successfully');
    } catch (error) {
      console.error('❌ Error clearing cookies:', error);
    }
  }

  /**
   * Clear browser cache (if possible)
   */
  static clearCache(): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Clear service worker cache if available
      if ('caches' in window) {
        caches.keys().then(function(names) {
          names.forEach(function(name) {
            caches.delete(name);
          });
        });
      }

      // Clear IndexedDB if available
      if ('indexedDB' in window) {
        // Note: This is a simplified approach. In production, you might want to be more specific
        try {
          indexedDB.deleteDatabase('localforage');
        } catch (e) {
          // Database might not exist, ignore error
        }
      }
      
      console.log('✅ Cache cleared successfully');
    } catch (error) {
      console.error('❌ Error clearing cache:', error);
    }
  }

  /**
   * Clear all user data comprehensively
   * This is the main method to call for logout/delete account
   */
  static clearAllUserData(context = null): void {
    console.log('🧹 Starting comprehensive data clearing...');
    
    try {
      // Clear all storage types
      this.clearLocalStorage();
      this.clearSessionStorage();
      this.clearCookies(context);
      this.clearCache();
      
      // Additional cleanup for React state management
      // Clear any potential memory leaks
      if (typeof window !== 'undefined') {
        // Clear any global variables that might hold user data
        (window as any).userData = undefined;
        (window as any).authToken = undefined;
        (window as any).bookingData = undefined;
      }
      
      console.log('✅ All user data cleared successfully');
    } catch (error) {
      console.error('❌ Error during comprehensive data clearing:', error);
    }
  }

  /**
   * Clear only authentication-related data
   * Use this for logout without clearing booking data
   */
  static clearAuthData(context = null): void {
    console.log('🔐 Clearing authentication data...');
    
    try {
      // Clear auth cookies
      this.clearCookies(context);
      
      // Clear auth-related localStorage
      if (typeof window !== 'undefined') {
        const authKeys = ['verifyemail', 'otp'];
        authKeys.forEach(key => {
          localStorage.removeItem(key);
        });
      }
      
      console.log('✅ Authentication data cleared successfully');
    } catch (error) {
      console.error('❌ Error clearing authentication data:', error);
    }
  }

  /**
   * Clear only booking-related data
   * Use this when booking is completed or cancelled
   */
  static clearBookingData(): void {
    console.log('📅 Clearing booking data...');
    
    try {
      if (typeof window !== 'undefined') {
        const bookingKeys = [
          'bookingDetails',
          'toure_booking_single_toure',
          'toure_booking_travel_price', 
          'toure_booking_start_date',
          'toure_booking_end_date',
          'toure_booking_travel_count',
          'tourBookingDetails',
          'bookingId'
        ];
        
        bookingKeys.forEach(key => {
          localStorage.removeItem(key);
        });
      }
      
      console.log('✅ Booking data cleared successfully');
    } catch (error) {
      console.error('❌ Error clearing booking data:', error);
    }
  }
}
