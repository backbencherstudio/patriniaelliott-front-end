import { useCallback, useEffect, useState } from 'react';
import { VendorService } from '@/service/vendor/vendor.service';

type VendorResponse = {
  success?: boolean;
  data?: any;
};

export const useVendorProfile = (vendorId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vendorData, setVendorData] = useState<any | null>(null);

  const fetchVendorData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Fetching vendor data for ID:', vendorId);
      const res: VendorResponse = await VendorService.getVendorProfileWithCookie(vendorId);
      console.log('📡 API Response:', res);
      const data = (res as any)?.data ?? res;
      console.log('📊 Processed data:', data);
      console.log('🏢 VendorVerification data:', data?.VendorVerification);
      setVendorData(data?.data ?? data ?? null);
      console.log('✅ Vendor data set:', data?.data ?? data ?? null);
      return res;
    } catch (e: any) {
      console.error('❌ Error fetching vendor data:', e);
      setError(e?.message || 'Failed to load vendor profile');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  const updateVendorData = useCallback(async (payload: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await VendorService.updateVendorProfileWithCookie(vendorId, payload);
      // Optimistically merge
      const updated = (res as any)?.data ?? res;
      const merged = updated?.data ?? updated;
      if (merged) setVendorData((prev) => ({ ...(prev || {}), ...merged }));
      return res;
    } catch (e: any) {
      setError(e?.message || 'Failed to update vendor profile');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  useEffect(() => {
    if (vendorId) {
      fetchVendorData();
    }
  }, [fetchVendorData, vendorId]);

  return { vendorData, loading, error, fetchVendorData, updateVendorData };
};