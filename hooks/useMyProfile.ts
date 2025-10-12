import { useCallback, useEffect, useState } from 'react';
import { MyProfileService } from '@/service/user/myprofile.service';

type MeResponse = {
  success?: boolean;
  data?: any;
};

export const useMyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<any | null>(null);

  const fetchMe = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res: MeResponse = await MyProfileService.getMe();
      const data = (res as any)?.data ?? res;
      setMe(data?.data ?? data ?? null);
      return res;
    } catch (e: any) {
      setError(e?.message || 'Failed to load profile');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMe = useCallback(async (payload: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await MyProfileService.updateMe(payload);
      // Optimistically merge
      const updated = (res as any)?.data ?? res;
      const merged = updated?.data ?? updated;
      if (merged) setMe((prev) => ({ ...(prev || {}), ...merged }));
      return res;
    } catch (e: any) {
      setError(e?.message || 'Failed to update profile');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMeWithAvatar = useCallback(async (payload: any, avatarFile: File | null) => {
    try {
      setLoading(true);
      setError(null);
      const res = await MyProfileService.updateMeWithAvatar(payload, avatarFile);
      // Optimistically merge
      const updated = (res as any)?.data ?? res;
      const merged = updated?.data ?? updated;
      if (merged) setMe((prev) => ({ ...(prev || {}), ...merged }));
      return res;
    } catch (e: any) {
      setError(e?.message || 'Failed to update profile with avatar');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return { me, loading, error, fetchMe, updateMe, updateMeWithAvatar };
};

