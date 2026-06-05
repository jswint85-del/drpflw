import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const PRICES: Record<string, string> = {
  'price_1TcwCm3FVYLcU4hRmDpfXCAv': '29.99',
  'price_1TcwDW3FVYLcU4hRG3fsujkc': '99.99',
}

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    console.error('STRIPE_SECRET_KEY is not set')
    return NextResponse.json({ error: 'Payment not configured' }, { status: 500 })
  }

  const stripe = new Stripe(key, { apiVersion: '2024-06-20' })

  const { priceId } = await req.json()

  if (!PRICES[priceId]) {
    return NextResponse.json({ error: 'Invalid price' }, { status: 400 })
  }

  const origin = req.headers.get('origin') ?? 'http://localhost:3000'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      automatic_tax: { enabled: true },
      subscription_data: {
        metadata: { [priceId]: PRICES[priceId] },
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Stripe error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
