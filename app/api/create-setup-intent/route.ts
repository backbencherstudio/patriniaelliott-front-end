import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST() {
    try {
        const secretKey = process.env.STRIPE_SECRET_KEY
        if (!secretKey) {
            return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 })
        }

        const stripe = new Stripe(secretKey, {
            apiVersion: '2025-08-27.basil',
        })

        const setupIntent = await stripe.setupIntents.create({
            payment_method_types: ['card'],
        })

        return NextResponse.json({ clientSecret: setupIntent.client_secret })
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || 'Failed to create setup intent' }, { status: 500 })
    }
}
