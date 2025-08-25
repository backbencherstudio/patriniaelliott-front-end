import { useState, useEffect, useCallback } from 'react';
import { useVendorApi } from './useVendorApi';
import { VendorService } from '@/service/vendor/vendor.service';
import { VendorProfile } from '@/types/vendor.types';

export const useVendorProfile = () => {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const { loading, error, handleApiCall, clearError, token } = useVendorApi();

  const fetchProfile = useCallback(async () => {
    try {
      if (!token) {
        console.warn('No token available, skipping profile fetch');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      const result = await handleApiCall(VendorService.getVendorProfileWithCookie, null);
      if (result.data) {
        setProfile(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      throw err;
    }
  }, [handleApiCall, token]);

  const updateProfile = useCallback(async (data: Partial<VendorProfile>) => {
    try {
      if (!token) {
        console.warn('No token available, skipping profile update');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      const result = await handleApiCall(VendorService.updateVendorProfileWithCookie, null, data);
      if (result.data) {
        setProfile(prev => prev ? { ...prev, ...result.data } : result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to update profile:', err);
      throw err;
    }
  }, [handleApiCall, token]);

  const updateProfileWithImage = useCallback(async (data: FormData) => {
    try {
      if (!token) {
        console.warn('No token available, skipping profile update with image');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      const result = await handleApiCall(VendorService.updateVendorProfileFormData, null, data);
      if (result.data) {
        setProfile(prev => prev ? { ...prev, ...result.data } : result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to update profile with image:', err);
      throw err;
    }
  }, [handleApiCall, token]);

  useEffect(() => {
    // Only fetch profile if we have a token
    if (token) {
      fetchProfile();
    } else {
      console.log('No token available, profile fetch skipped');
      setProfile(null);
    }
  }, [fetchProfile, token]);

  // Initialize with empty data if no token
  useEffect(() => {
    if (!token) {
      console.log('No token available, profile fetch skipped');
      setProfile(null);
    }
  }, [token]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    updateProfileWithImage,
    clearError,
  };
}; 