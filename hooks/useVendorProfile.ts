import { useCallback, useEffect, useState } from 'react';
import { VendorService } from '@/service/vendor/vendor.service';

type VendorResponse = {
  success?: boolean;
  data?: any;
};

export const useVendorProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vendorProfile, setVendorProfile] = useState<any | null>(null);

  const fetchVendorProfile = useCallback(async (vendorId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res: VendorResponse = await VendorService.getVendorProfileWithCookie(vendorId);
      const data = (res as any)?.data ?? res;
      setVendorProfile(data?.data ?? data ?? null);
      return res;
    } catch (e: any) {
      setError(e?.message || 'Failed to load vendor profile');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateVendorProfile = useCallback(async (vendorId: string, payload: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await VendorService.updateVendorProfileWithCookie(vendorId, payload);
      // Optimistically merge
      const updated = (res as any)?.data ?? res;
      const merged = updated?.data ?? updated;
      if (merged) setVendorProfile((prev) => ({ ...(prev || {}), ...merged }));
      return res;
    } catch (e: any) {
      setError(e?.message || 'Failed to update vendor profile');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    vendorProfile, 
    loading, 
    error, 
    fetchVendorProfile, 
    updateVendorProfile,
    setError 
  };
};