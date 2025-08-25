// Vendor Profile Types
export interface VendorProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  businessWebsite?: string;
  vendorType: string;
  taxId?: string;
  avatar?: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Vendor Verification Types
export interface VerificationData {
  propertyName: string;
  address: string;
  unitNumber: string;
  zipCode: string;
  city: string;
  country: string;
  ownershipType: string;
  firstName: string;
  lastName: string;
  alternativeName?: string;
  owners: Array<{ firstName: string; lastName: string }>;
  propertyManager: string;
  governmentInvolvement: string;
}

export interface VerificationStep {
  step: number;
  data: Partial<VerificationData>;
  isCompleted: boolean;
  submittedAt?: string;
}

export interface VerificationStatus {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  currentStep: number;
  totalSteps: number;
  submittedAt: string;
  reviewedAt?: string;
  feedback?: string;
}

// Payment Method Types
export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_account' | 'paypal';
  name: string;
  last4?: string;
  brand?: string;
  expiryMonth?: string;
  expiryYear?: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface PaymentMethodForm {
  type: 'credit_card' | 'debit_card' | 'bank_account' | 'paypal';
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  cardholderName?: string;
  accountNumber?: string;
  routingNumber?: string;
  accountHolderName?: string;
  email?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  type: 'booking' | 'refund' | 'withdrawal' | 'commission';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  bookingId?: string;
  customerName?: string;
  propertyName?: string;
  createdAt: string;
  completedAt?: string;
}

export interface TransactionSummary {
  total_transactions: number;
  total_earnings: string;
  total_withdrawn: string;
  total_refunds: string;
}

export interface TransactionResponse {
  success: boolean;
  data: {
    summary: TransactionSummary;
    transactions: Transaction[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  };
}

// Booking Types
export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  propertyName: string;
  propertyType: 'apartment' | 'hotel' | 'tour';
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending';
  createdAt: string;
}

// Refund Types
export interface Refund {
  id: string;
  bookingId: string;
  customerName: string;
  propertyName: string;
  refundAmount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  requestedAt: string;
  processedAt?: string;
  feedback?: string;
}

// Balance & Withdrawal Types
export interface Balance {
  available: number;
  pending: number;
  total: number;
  currency: string;
}

export interface WithdrawalRequest {
  amount: number;
  paymentMethodId: string;
  notes?: string;
}

export interface Withdrawal {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentMethod: string;
  requestedAt: string;
  processedAt?: string;
  failureReason?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

// Query Parameters
export interface TransactionQueryParams {
  page?: number;
  limit?: number;
  period?: 'last_7_days' | 'last_30_days' | 'last_90_days' | 'all';
  status?: string;
  type?: string;
}

export interface BookingQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  propertyType?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface RefundQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
} 