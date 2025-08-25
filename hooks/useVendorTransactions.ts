import { useState, useCallback, useEffect } from 'react';
import { useVendorApi } from './useVendorApi';
import { VendorService } from '@/service/vendor/vendor.service';
import { Transaction, TransactionQueryParams, TransactionResponse } from '@/types/vendor.types';

export const useVendorTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [pagination, setPagination] = useState<any>(null);
  const { loading, error, handleApiCall, clearError, token } = useVendorApi();

  const fetchTransactions = useCallback(async (params: TransactionQueryParams = {}) => {
    try {
      if (!token) {
        console.warn('No token available, skipping transaction fetch');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
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
  }, [handleApiCall, token]);

  // Initialize with empty data if no token
  useEffect(() => {
    if (!token) {
      console.log('No token available, transactions fetch skipped');
      setTransactions([]);
      setSummary(null);
      setPagination(null);
    }
  }, [token]);

  const getTransactionDetails = useCallback(async (id: string) => {
    try {
      if (!token) {
        console.warn('No token available, skipping transaction details fetch');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      const result = await handleApiCall(VendorService.getTransactionDetails, id);
      return result;
    } catch (err) {
      console.error('Failed to get transaction details:', err);
      throw err;
    }
  }, [handleApiCall, token]);

  const getAllBookings = useCallback(async (params: any = {}) => {
    try {
      if (!token) {
        console.warn('No token available, skipping bookings fetch');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      const result = await handleApiCall(VendorService.getAllBookings, params);
      return result;
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      throw err;
    }
  }, [handleApiCall, token]);

  const getAllRefunds = useCallback(async (params: any = {}) => {
    try {
      if (!token) {
        console.warn('No token available, skipping refunds fetch');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      const result = await handleApiCall(VendorService.getAllRefunds, params);
      return result;
    } catch (err) {
      console.error('Failed to fetch refunds:', err);
      throw err;
    }
  }, [handleApiCall, token]);

  const getRefundDetails = useCallback(async (id: string) => {
    try {
      if (!token) {
        console.warn('No token available, skipping refund details fetch');
        return { success: false, data: null, message: 'Authentication required' };
      }
      
      const result = await handleApiCall(VendorService.getRefundDetails, id);
      return result;
    } catch (err) {
      console.error('Failed to get refund details:', err);
      throw err;
    }
  }, [handleApiCall, token]);

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