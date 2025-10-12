'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useVendorApi } from '@/hooks/useVendorApi'
import { VendorService } from '@/service/vendor/vendor.service'
import { toast, Toaster } from 'react-hot-toast'
import Image from 'next/image'

type FormData = {
  payoutMethod: string;
  paypalEmail: string;
  accountHolderName: string;
  taxInformation: string;
  billingAddress: string;
}

interface PaymentAccount {
  id: string;
  name: string;
  payment_method: string;
  account_id?: string; // Optional since we're now using id as primary
  user_id: string;
  business_type: string;
  onboarding_url?: string;
  is_verified?: boolean;
  status?: 'verified' | 'pending' | 'unverified';
  routing_number?: string;  // Add this field
  bank_routing_number?: string;
  bank_status?: string;
  bank_last4?: string;
  bank_name?: string;
}

const paymentMethods = [
  { value: 'PayPal', disabled: true },
  { value: 'Bank Transfer', disabled: true },
  { value: 'Stripe', disabled: false },
  { value: 'Wise', disabled: true }
]

export default function PaymentPage() {
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [accounts, setAccounts] = useState<PaymentAccount[]>([])
  const [submitting, setSubmitting] = useState(false)
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      payoutMethod: 'Stripe',
      paypalEmail: '',
      accountHolderName: '',
      taxInformation: '',
      billingAddress: ''
    }
  })

  const { loading, error, handleApiCall } = useVendorApi()
  const selectedMethod = watch('payoutMethod')
  const hasVerifiedAccount = accounts.some(acc =>
    acc?.payment_method?.toLowerCase() === 'stripe' &&
    (acc?.status === 'verified' || acc?.business_type === 'individual')
  )

  // Function to check Stripe account status
  const checkStripeAccountStatus = async (accountId: string) => {
    try {
      console.log('Checking Stripe account status for:', accountId)
      // Use the correct API endpoint with account ID as path parameter
      const statusRes: any = await handleApiCall(VendorService.getPaymentAccountStatus, accountId)
      console.log('Account status API response:', statusRes)
      
      if (statusRes?.data?.success && statusRes?.data?.data) {
        const accountData = statusRes.data.data
        console.log('Account data from status API:', accountData)
        
        // Check if account is verified based on Stripe status
        const isVerified = accountData.details_submitted && accountData.charges_enabled
        console.log('Account verification check:', {
          details_submitted: accountData.details_submitted,
          charges_enabled: accountData.charges_enabled,
          isVerified: isVerified
        })
        
        return isVerified ? 'verified' : 'pending'
      }
      return 'pending'
    } catch (error) {
      console.error('Error checking account status:', error)
      return 'pending'
    }
  }

  // Fetch existing payment accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        console.log('Fetching payment accounts...')
        const res: any = await handleApiCall(VendorService.getPaymentAccounts)
        console.log('Payment accounts API response:', res)
        
        if (res?.data?.success && res?.data?.data) {
          // For existing Stripe accounts, fetch onboarding links and check status
          const accountsWithOnboarding = await Promise.all(
            res.data.data.map(async (account: any) => {
              if (account.payment_method?.toLowerCase() === 'stripe' && account.account_id) {
                try {
                  // Check account status first
                  const statusResult = await checkStripeAccountStatus(account.account_id)
                  console.log('Account status for', account.account_id, ':', statusResult)
                  
                  // Fetch onboarding link if not verified
                  let onboardingUrl = account.onboarding_url
                  if (statusResult !== 'verified' && !onboardingUrl) {
                    console.log('Fetching onboarding link for existing account:', account.account_id)
                    const onboardingRes: any = await handleApiCall(VendorService.getStripeOnboardingLink, account.account_id)
                    
                    if (onboardingRes?.data?.success && onboardingRes?.data?.data?.url) {
                      onboardingUrl = onboardingRes.data.data.url
                    }
                  }
                  
                  // Get additional details (business type, bank info) from status API
                  let businessType = 'individual'
                  let bankRoutingNumber: string | undefined = undefined
                  let bankStatus: string | undefined = undefined
                  let bankLast4: string | undefined = undefined
                  let bankName: string | undefined = undefined
                  try {
                    const statusRes: any = await handleApiCall(VendorService.getPaymentAccountStatus, account.account_id)
                    if (statusRes?.data?.success) {
                      const statusData =
                        statusRes?.data?.data?.account ??
                        statusRes?.data?.data?.data ??
                        statusRes?.data?.data ??
                        statusRes?.data
                      businessType = statusData.business_type || 'individual'
                      const external = statusData?.external_accounts
                      const bank = Array.isArray(external?.data)
                        ? external.data.find((d: any) => d?.object === 'bank_account') || external.data[0]
                        : undefined
                      bankRoutingNumber = bank?.routing_number ?? bank?.bank_account?.routing_number
                      bankStatus = bank?.status ?? bank?.bank_account?.status
                      bankLast4 = bank?.last4 ?? bank?.bank_account?.last4
                      bankName = bank?.bank_name ?? bank?.bank_account?.bank_name
                      console.log('Extracted bank info:', { bankRoutingNumber, bankStatus, bankLast4, bankName })
                    }
                  } catch (statusError) {
                    console.error('Error fetching business/bank info:', statusError)
                  }
                  
                  return {
                    ...account,
                    onboarding_url: onboardingUrl,
                    is_verified: statusResult === 'verified',
                    status: statusResult,
                    business_type: businessType,
                    bank_routing_number: bankRoutingNumber,
                    bank_status: bankStatus,
                    bank_last4: bankLast4,
                    bank_name: bankName
                  }
                } catch (onboardingError) {
                  console.error('Error processing Stripe account:', account.account_id, onboardingError)
                  return {
                    ...account,
                    status: 'pending',
                    is_verified: false
                  }
                }
              }
              return {
                ...account,
                status: 'pending',
                is_verified: false
              }
            })
          )
          
          setAccounts(accountsWithOnboarding)
          console.log('Payment accounts loaded with onboarding links:', accountsWithOnboarding)
        } else {
          console.log('No payment accounts found or API response format unexpected')
        }
      } catch (error) {
        console.error('Error fetching payment accounts:', error)
      }
    }
    fetchAccounts()
  }, [handleApiCall])

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitting(true)
      
      // Prepare account creation data with correct field names
      const accountData = {
        name: data.accountHolderName,
        payment_method: data.payoutMethod.toLowerCase(),
        payment_email: data.paypalEmail, // Fixed: was 'email', now 'payment_email'
        card_holder_name: data.accountHolderName, // Added: required field
        tax_information: data.taxInformation,
        billing_address: data.billingAddress
      }

      console.log('Creating payment account with data:', accountData)
      
      const res: any = await handleApiCall(VendorService.createPaymentAccount, accountData)
      
      if (res?.data?.success) {
        toast.success('Payment account created successfully!')
        
        // Get the account_id from the response (for Stripe API call)
        const accountId = res?.data?.data?.account_id
        console.log('Created account ID:', accountId)
        
        // If it's a Stripe account, fetch the onboarding link
        if (accountId && data.payoutMethod.toLowerCase() === 'stripe') {
          try {
            console.log('Fetching Stripe onboarding link for account:', accountId)
            const onboardingRes: any = await handleApiCall(VendorService.getStripeOnboardingLink, accountId)
            
            if (onboardingRes?.data?.success && onboardingRes?.data?.data?.url) {
              const onboardingUrl = onboardingRes.data.data.url
              console.log('Onboarding URL received:', onboardingUrl)
              
              // Update the account with onboarding URL
              const updatedAccount = {
                ...res.data.data,
                onboarding_url: onboardingUrl,
                is_verified: false
              }
              
              // Add to accounts list
              setAccounts(prev => [updatedAccount, ...prev])
              toast.success('Stripe onboarding link generated! Click the card to complete verification.')
            } else {
              console.error('Failed to get onboarding link:', onboardingRes)
              toast.error('Account created but failed to get verification link')
            }
          } catch (onboardingError) {
            console.error('Error fetching onboarding link:', onboardingError)
            toast.error('Account created but failed to get verification link')
          }
        } else {
          // For non-Stripe accounts, just refresh the list
          const accountsRes: any = await handleApiCall(VendorService.getPaymentAccounts)
          if (accountsRes?.data?.success && accountsRes?.data?.data) {
            setAccounts(accountsRes.data.data)
          }
        }
        
    setShowSaveButton(false)
      } else {
        toast.error('Failed to create payment account')
      }
    } catch (error: any) {
      console.error('Error creating payment account:', error)
      toast.error(error?.message || 'Failed to create payment account')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFieldFocus = () => setShowSaveButton(true)

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {!hasVerifiedAccount && (
    <form onSubmit={handleSubmit(onSubmit)} className="md:px-6 px-4 py-6 bg-white rounded-2xl flex flex-col gap-6">
      <div>
        <h2 className="text-[#070707] text-2xl font-medium">Payment details</h2>
        <p className="text-[#777980] text-sm mt-1">Enter your payment and payout details for ensuring smooth payout processing and tax compliance.</p>

      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">Preferred Payout Method</label>
        <Select
          value={selectedMethod}
          onValueChange={val => {
            setValue('payoutMethod', val)
            handleFieldFocus()
          }}
        >
          <SelectTrigger className="w-full !h-13 px-4 rounded-lg border text-[#777980] text-sm">
            <SelectValue placeholder="Select payout method" />
          </SelectTrigger>
          <SelectContent className=''>
            {paymentMethods.map(method => (
              <SelectItem 
                key={method.value} 
                value={method.value} 
                disabled={method.disabled}
                className={`!h-10 !pl-2 ${
                  method.disabled 
                    ? 'opacity-50 cursor-not-allowed text-gray-400' 
                    : 'hover:!bg-secondaryColor/20 cursor-pointer'
                }`}
              >
                {method.value}
                {method.disabled && <span className="ml-2 text-xs">(Coming Soon)</span>}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">
          {selectedMethod === 'PayPal' ? 'PayPal Email' : 'Email Address'}
        </label>
        <input
          {...register('paypalEmail', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          type="email"
          placeholder={`Enter your ${selectedMethod === 'PayPal' ? 'PayPal' : ''} email`}
          className="p-4 rounded-lg border text-[#777980] text-sm w-full"
          onFocus={handleFieldFocus}
        />
        {errors.paypalEmail && <span className="text-red-500 text-sm">{errors.paypalEmail.message}</span>}
      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">Account Holder Name</label>
        <input
          {...register('accountHolderName', { required: 'Account holder name is required' })}
          type="text"
          placeholder="Enter account holder name"
          className="p-4 rounded-lg border text-[#777980] text-sm w-full"
          onFocus={handleFieldFocus}
        />
        {errors.accountHolderName && <span className="text-red-500 text-sm">{errors.accountHolderName.message}</span>}
      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">Tax Information</label>
        <input
          {...register('taxInformation', { required: 'Tax information is required' })}
          type="text"
          placeholder="Enter your VAT ID or tax information"
          className="p-4 rounded-lg border text-[#777980] text-sm w-full"
          onFocus={handleFieldFocus}
        />
        {errors.taxInformation && <span className="text-red-500 text-sm">{errors.taxInformation.message}</span>}
      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">Billing Address</label>
        <input
          {...register('billingAddress', { required: 'Billing address is required' })}
          type="text"
          placeholder="Enter your billing address"
          className="p-4 rounded-lg border text-[#777980] text-sm w-full"
          onFocus={handleFieldFocus}
        />
        {errors.billingAddress && <span className="text-red-500 text-sm">{errors.billingAddress.message}</span>}
      </div>

      <div className='flex justify-end'>
        <button
          aria-label="Create Account"
          type="submit"
          disabled={submitting}
          className="md:mt-4 bg-blueColor text-white py-2 md:py-3 px-5 md:px-6 rounded-lg hover:bg-[#0051bc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </form>
      )}

    {/* Payment Accounts List */}
    <div className="md:px-6 px-4 py-6 bg-white rounded-2xl flex flex-col gap-6">
      <div>
        <h2 className="text-[#070707] text-2xl font-medium">Your Payment Accounts</h2>
        <p className="text-[#777980] text-sm mt-1">Manage your existing payment accounts and methods.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-[#777980]">Loading payment accounts...</div>
        </div>
      ) : accounts.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="text-[#777980] mb-2">No payment accounts found</div>
            <div className="text-sm text-[#777980]">Create your first payment account using the form above.</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <div key={account.id} className="border border-[#e9e9ea] rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${account.status === 'verified' ? 'bg-[#38c976]/10' : 'bg-[#0068ef]/10'}`}>
                    <Image
                      src={`/icon/${account.payment_method.toLowerCase()}.svg`}
                      alt={account.payment_method}
                      width={20}
                      height={20}
                      onError={(e) => {
                        // Fallback to a generic payment icon if specific icon not found
                        (e.currentTarget as HTMLImageElement).src = '/icon/payment.svg'
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#22262e]">{account.name}</h3>
                    <p className="text-sm text-[#777980] capitalize">{account.payment_method}</p>
                  </div>
                </div>
                {/* <div className={`px-2 py-1 text-xs rounded-full ${
                  account.status === 'verified'
                    ? 'bg-[#38c976]/10 text-[#38c976]' 
                    : account.status === 'pending'
                    ? 'bg-[#ffa23a]/10 text-[#ffa23a]'
                    : 'bg-[#fe5050]/10 text-[#fe5050]'
                }`}>
                  {account.status === 'verified' ? 'Verified' : 
                   account.status === 'pending' ? 'Pending' : 'Unverified'}
                </div> */}
              </div>
              
              {/* <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#777980]">ID:</span>
                  <span className="text-[#22262e] font-mono text-xs">{account.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777980]">User ID:</span>
                  <span className="text-[#22262e] font-mono text-xs">{account.user_id}</span>
                </div>
              </div> */}

              {/* Debug info for Stripe accounts */}
              {/* {account.payment_method.toLowerCase() === 'stripe' && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                  <div>Debug: business_type = {account.business_type}</div>
                  <div>Debug: status = {account.status || 'null'}</div>
                  <div>Debug: is_verified = {account.is_verified ? 'true' : 'false'}</div>
                  <div>Debug: account_id = {account.account_id}</div>
                  <div>Debug: onboarding_url = {account.onboarding_url ? 'present' : 'null'}</div>
                  <div>Debug: bank_routing_number = {account.bank_routing_number || 'null'}</div>
                  <div>Debug: bank_status = {account.bank_status || 'null'}</div>
                  <div>Debug: bank_last4 = {account.bank_last4 || 'null'}</div>
                  <div>Debug: bank_name = {account.bank_name || 'null'}</div>
                  


                  <div className="mt-1 text-[10px] opacity-70">If null, the status API may not include external_accounts.</div>
                </div>
              )} */}

              {/* Stripe Onboarding Link Card - conditional styling and action */}
              {account.payment_method.toLowerCase() === 'stripe' && account.onboarding_url && account.status !== 'verified' && (
                <div className={`mt-4 p-3 rounded-lg border ${account.business_type === 'individual'
					? 'bg-gradient-to-r from-[#38c976]/5 to-[#38c976]/10 border-[#38c976]/20'
					: 'bg-gradient-to-r from-[#0068ef]/5 to-[#0068ef]/10 border-[#0068ef]/20'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${account.business_type === 'individual' ? 'bg-[#38c976]' : 'bg-[#0068ef]'}`}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className={`text-sm font-medium ${account.business_type === 'individual' ? 'text-[#38c976]' : 'text-[#0068ef]'}`}>
                      Complete Verification
                    </span>
                  </div>
                  <p className="text-xs text-[#777980] mb-3">
                    Click below to complete your Stripe account verification and start receiving payments.
                  </p>

                  {account.business_type === 'individual' ? (
                    <div className="w-full px-4 py-2 bg-[#38c976] text-white text-sm font-medium rounded-full opacity-60 cursor-not-allowed flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Complete
                    </div>
                  ) : (
                    <button
                      aria-label="Complete Verification"
                      onClick={() => {
                        window.open(account.onboarding_url, '_blank', 'noopener,noreferrer')
                      }}
                      className="w-full px-4 py-2 bg-[#0068ef] text-white text-sm font-medium rounded-lg hover:bg-[#0051bc] transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Complete
                    </button>
                  )}
                </div>
              )}

              {/* Verified Stripe Account */}
              {account.payment_method.toLowerCase() === 'stripe' && account.status === 'verified' && (
                <div className="mt-4 p-3 bg-[#38c976]/5 border border-[#38c976]/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#38c976] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[#38c976]">Account Verified</span>
                  </div>
                  <p className="text-xs text-[#777980] mt-1">
                    Your Stripe account is fully verified and ready to receive payments.
                  </p>
                </div>
              )}
              
              {/* Action buttons removed as requested */}
              {/* <div className="mt-4 pt-3 border-t border-[#e9e9ea] flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm border border-[#0068ef] text-[#0068ef] rounded-lg hover:bg-[#0068ef]/5 transition-colors">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-[#fe5050] text-[#fe5050] rounded-lg hover:bg-[#fe5050]/5 transition-colors">
                  Delete
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}
