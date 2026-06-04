'use client'

import { useState } from 'react'

const plans = [
  {
    name: 'Starter',
    price: '$29.99',
    priceId: 'price_1TcwCm3FVYLcU4hRmDpfXCAv',
    features: ['Core features', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$99.99',
    priceId: 'price_1TcwDW3FVYLcU4hRG3fsujkc',
    features: ['Everything in Starter', 'Priority support', 'Advanced features'],
  },
]

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleCheckout(priceId: string) {
    setLoading(priceId)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch {
      alert('Something went wrong. Please try again.')
      setLoading(null)
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Choose a Plan</h1>
      <p style={{ color: '#6b7280', marginBottom: '3rem' }}>Simple, transparent pricing.</p>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {plans.map((plan) => (
          <div
            key={plan.priceId}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '1rem',
              padding: '2rem',
              width: '260px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>{plan.name}</h2>
            <p style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{plan.price}<span style={{ fontSize: '1rem', fontWeight: 400, color: '#6b7280' }}>/mo</span></p>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#374151', lineHeight: '1.8' }}>
              {plan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <button
              onClick={() => handleCheckout(plan.priceId)}
              disabled={!!loading}
              style={{
                marginTop: 'auto',
                padding: '0.75rem',
                background: loading === plan.priceId ? '#9ca3af' : '#111827',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 600,
              }}
            >
              {loading === plan.priceId ? 'Redirecting…' : 'Get started'}
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
