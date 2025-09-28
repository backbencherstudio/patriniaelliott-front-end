import { useState, useCallback, useEffect } from 'react';
import { useVendorApi } from './useVendorApi';
import { VendorService } from '@/service/vendor/vendor.service';
import { Transaction, TransactionQueryParams, TransactionResponse } from '@/types/vendor.types';

export const useVendorTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [pagination, setPagination] = useState<any>(null);
  const { loading, error, handleApiCall, clearError } = useVendorApi();

  const fetchTransactions = useCallback(async (params: TransactionQueryParams = {}) => {
    try {
      const result = await handleApiCall(VendorService.getTransactions, params);
      if (result.data) {
        setTransactions(result.data.transactions || []);
        setSummary(result.data.summary || {});
        setPagination(result.data.pagination || {});
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      throw err;
    }
  }, [handleApiCall]);

  const getTransactionDetails = useCallback(async (id: string) => {
    try {
      const result = await handleApiCall(VendorService.getTransactionDetails, id);
      return result;
    } catch (err) {
      console.error('Failed to get transaction details:', err);
      throw err;
    }
  }, [handleApiCall]);

  const getAllBookings = useCallback(async (params: any = {}) => {
    try {
      const result = await handleApiCall(VendorService.getAllBookings, params);
      return result;
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      throw err;
    }
  }, [handleApiCall]);

  const getAllRefunds = useCallback(async (params: any = {}) => {
    try {
      const result = await handleApiCall(VendorService.getAllRefunds, params);
      return result;
    } catch (err) {
      console.error('Failed to fetch refunds:', err);
      throw err;
    }
  }, [handleApiCall]);

  const getRefundDetails = useCallback(async (id: string) => {
    try {
      const result = await handleApiCall(VendorService.getRefundDetails, id);
      return result;
    } catch (err) {
      console.error('Failed to get refund details:', err);
      throw err;
    }
  }, [handleApiCall]);

  return {
    transactions,
    summary,
    pagination,
    loading,
    error,
    fetchTransactions,
    getTransactionDetails,
    getAllBookings,
    getAllRefunds,
    getRefundDetails,
    clearError,
  };
}; 