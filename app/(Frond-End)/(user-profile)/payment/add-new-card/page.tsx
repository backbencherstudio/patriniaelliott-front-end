'use client'

import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { UserService } from '@/service/user/user.service'
import { useToken } from '@/hooks/useToken'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

function CardForm () {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const { token } = useToken()
  useEffect(() => {
    fetch('/api/create-setup-intent', { method: 'POST' })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return
    setLoading(true)
    setMessage('Saving card...')

    const cardElement = elements.getElement(CardElement)
    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: { card: cardElement! }
    })

    if (error) {
      setMessage(error.message ?? 'Error saving card')
      setLoading(false)
      return
    }

    try {
      const resp = await UserService.createData(
        '/user-profile/cards',
        { paymentMethodId: setupIntent.payment_method },
        token
      )

      const data = await resp.json()
      if (!resp.ok || !data.success) {
        throw new Error(data.message || 'Failed to save payment method')
      }

      setMessage('Card saved successfully ✅')
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto mt-10 p-6 border rounded-xl'
    >
      <label className='block mb-2'>Card Details</label>
      <div className='p-3 border rounded-md mb-4'>
        <CardElement />
      </div>
      <button
        disabled={!stripe || loading}
        className='px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50'
      >
        {loading ? 'Saving...' : 'Save card'}
      </button>
      {message && <p className='mt-4'>{message}</p>}
    </form>
  )
}

export default function AddCardPage () {
  return (
    <Elements stripe={stripePromise}>
      <CardForm />
    </Elements>
  )
}
