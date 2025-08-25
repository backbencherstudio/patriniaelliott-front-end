import { useState, useCallback, useEffect } from 'react';
import { useVendorApi } from './useVendorApi';
import { VendorService } from '@/service/vendor/vendor.service';
import { VerificationData, VerificationStatus } from '@/types/vendor.types';

export const useVendorVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);
  const { loading, error, handleApiCall, clearError, token } = useVendorApi();

  const submitVerification = useCallback(async (data: VerificationData) => {
    try {
      if (!token) {
        console.warn('No token available, skipping verification submission');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      const result = await handleApiCall(VendorService.submitVerification, data);
      return result;
    } catch (err) {
      console.error('Failed to submit verification:', err);
      throw err;
    }
  }, [handleApiCall, token]);

  const submitVerificationStep = useCallback(async (step: number, data: Partial<VerificationData>) => {
    try {
      if (!token) {
        console.warn('No token available, skipping verification step submission');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      let result;
      switch (step) {
        case 0:
          result = await handleApiCall(VendorService.submitVerificationStep0, data);
          break;
        case 1:
          result = await handleApiCall(VendorService.submitVerificationStep1, data);
          break;
        case 2:
          result = await handleApiCall(VendorService.submitVerificationStep2, data);
          break;
        case 3:
          result = await handleApiCall(VendorService.submitVerificationStep3, data);
          break;
        case 4:
          result = await handleApiCall(VendorService.submitVerificationStep4, data);
          break;
        default:
          throw new Error(`Invalid step number: ${step}`);
      }
      return result;
    } catch (err) {
      console.error(`Failed to submit verification step ${step}:`, err);
      throw err;
    }
  }, [handleApiCall, token]);

  const getVerificationStatus = useCallback(async () => {
    try {
      if (!token) {
        console.warn('No token available, skipping verification status fetch');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      const result = await handleApiCall(VendorService.getVerificationStatus);
      if (result.data) {
        setVerificationStatus(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to get verification status:', err);
      throw err;
    }
  }, [handleApiCall, token]);

  // Initialize with empty data if no token
  useEffect(() => {
    if (!token) {
      console.log('No token available, verification status fetch skipped');
      setVerificationStatus(null);
    }
  }, [token]);

  return {
    verificationStatus,
    loading,
    error,
    submitVerification,
    submitVerificationStep,
    getVerificationStatus,
    clearError,
  };
}; 