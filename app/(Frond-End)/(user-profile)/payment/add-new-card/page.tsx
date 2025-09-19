'use client'

import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { UserService } from '@/service/user/user.service'
import { useToken } from '@/hooks/useToken'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface FormData {
  email: string
  fullName: string
  country: string
  addressLine1: string
  addressLine2: string
  city: string
  zip: string
  state: string
  billingSameAsShipping: boolean
  saveInformation: boolean
}

function CheckoutForm () {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const { token } = useToken()
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    country: 'US',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zip: '',
    state: '',
    billingSameAsShipping: true,
    saveInformation: false
  })

  useEffect(() => {
    fetch('/api/create-setup-intent', { method: 'POST' })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return
    setLoading(true)
    setMessage('Processing...')

    const cardNumberElement = elements.getElement(CardNumberElement)
    const cardExpiryElement = elements.getElement(CardExpiryElement)
    const cardCvcElement = elements.getElement(CardCvcElement)

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      setMessage('Card elements not found')
      setLoading(false)
      return
    }

    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: formData.fullName,
          email: formData.email,
          address: {
            line1: formData.addressLine1,
            line2: formData.addressLine2,
            city: formData.city,
            postal_code: formData.zip,
            state: formData.state,
            country: formData.country
          }
        }
      }
    })

    if (error) {
      setMessage(error.message ?? 'Error processing payment')
      setLoading(false)
      return
    }

    try {
      const paymentData = {
        paymentMethodId: setupIntent.payment_method,
        shippingInfo: {
          email: formData.email,
          fullName: formData.fullName,
          country: formData.country,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          zip: formData.zip,
          state: formData.state
        },
        billingSameAsShipping: formData.billingSameAsShipping,
        saveInformation: formData.saveInformation
      }

      const resp = await UserService.createData(
        '/user-profile/cards',
        paymentData,
        token
      )

      const responseData = resp.data || resp
      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to save payment method')
      }

      setMessage('Payment method saved successfully ✅')
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-8">


        {/* Payment Method */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment method</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card information
            </label>
            
            {/* Card Number */}
            <div className="mb-4">
              <div className="relative">
                <div className="px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <CardNumberElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#374151',
                          '::placeholder': {
                            color: '#9CA3AF',
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
                  <div className="w-6 h-4 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">M</div>
                  <div className="w-6 h-4 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">AM</div>
                  <div className="w-6 h-4 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">JCB</div>
                </div>
              </div>
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <CardExpiryElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#374151',
                          '::placeholder': {
                            color: '#9CA3AF',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <CardCvcElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#374151',
                          '::placeholder': {
                            color: '#9CA3AF',
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center text-gray-600">123</div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="billingSameAsShipping"
                name="billingSameAsShipping"
                checked={formData.billingSameAsShipping}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="billingSameAsShipping" className="ml-2 block text-sm text-gray-700">
                Billing info is same as shipping
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveInformation"
                name="saveInformation"
                checked={formData.saveInformation}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="saveInformation" className="ml-2 block text-sm text-gray-700">
                Save my information for faster checkout
              </label>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Pay securely at Powdur and everywhere{' '}
            <a href="#" className="underline text-blue-600">Link</a> is accepted.
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Continue'}
        </button>

        {message && (
          <div className={`mt-4 p-3 rounded-md ${
            message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
}

export default function AddCardPage () {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}
