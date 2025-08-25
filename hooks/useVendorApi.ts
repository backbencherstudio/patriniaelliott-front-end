import { useState, useCallback } from 'react';
import { VendorService } from '@/service/vendor/vendor.service';
import { useToken } from './useToken';

export const useVendorApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useToken();

  const handleApiCall = useCallback(async (apiFunction: Function, ...args: any[]) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const result = await apiFunction(...args, token);
      return result;
    } catch (err: any) {
      let errorMessage = 'An unexpected error occurred';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    handleApiCall,
    clearError,
    token,
  };
}; 