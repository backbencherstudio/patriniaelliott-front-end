'use client'
import { useCallback, useState } from 'react';


export const useVendorApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = useCallback(async (fn: Function, ...args: any[]) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fn(...args);
      return res as any;
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = () => setError(null);

  return { loading, error, handleApiCall, clearError };
};