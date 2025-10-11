import { useCallback, useEffect, useState } from 'react';
import { UserService } from '@/service/user/user.service';
import { useToken } from './useToken';

type BookingDashboardResponse = {
  success?: boolean;
  data?: {
    summary: {
      total_bookings: number;
      completed_stays: number;
      upcoming_stays: number;
      total_spend: number;
      total_nights: number;
    };
    recent_bookings: Array<{
      id: string;
      invoice_number: string;
      status: string;
      type: string;
      total_amount: string;
      booking_date_time: string;
      package_name: string;
      start_date: string;
      end_date: string;
      nights: number;
      package_image: string;
    }>;
    booking_stats_by_type: {
      tour: {
        count: number;
        total_amount: number;
        completed: number;
        pending: number;
      };
      apartment: {
        count: number;
        total_amount: number;
        completed: number;
        pending: number;
      };
    };
    monthly_spending: Record<string, number>;
    filters: {
      start_date: string | null;
      end_date: string | null;
      type: string | null;
    };
    message: string;
  };
};

export const useBookingDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<BookingDashboardResponse['data'] | null>(null);
  const { token } = useToken();

  const fetchDashboardData = useCallback(async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await UserService.getData('/booking/dashboard', token);
      const data = response?.data ?? response;
      setDashboardData(data?.data ?? data ?? null);
      return response;
    } catch (e: any) {
      setError(e?.message || 'Failed to load booking dashboard data');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, fetchDashboardData]);

  return { 
    dashboardData, 
    loading, 
    error, 
    fetchDashboardData 
  };
};
