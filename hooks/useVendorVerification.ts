import { useState, useCallback, useEffect } from 'react';
import { useVendorApi } from './useVendorApi';
import { VendorService } from '@/service/vendor/vendor.service';
import { VerificationData, VerificationStatus } from '@/types/vendor.types';

export const useVendorVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);
  const { loading, error, handleApiCall, clearError } = useVendorApi();

  const submitVerification = useCallback(async (data: VerificationData) => {
    try {
      const result = await handleApiCall(VendorService.submitVerification, data);
      return result;
    } catch (err) {
      console.error('Failed to submit verification:', err);
      throw err;
    }
  }, [handleApiCall]);

  const submitVerificationStep = useCallback(async (step: number, data: Partial<VerificationData>) => {
    try {
      const result = await handleApiCall(VendorService.submitVerificationStep, step, data);
      return result;
    } catch (err) {
      console.error(`Failed to submit verification step ${step}:`, err);
      throw err;
    }
  }, [handleApiCall]);

  const getVerificationStatus = useCallback(async () => {
    try {
      const result = await handleApiCall(VendorService.getVerificationStatus);
      if (result.data) {
        setVerificationStatus(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to get verification status:', err);
      throw err;
    }
  }, [handleApiCall]);

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