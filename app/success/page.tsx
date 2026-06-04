export default function Success() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Payment successful!</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Thank you for subscribing. You&apos;ll receive a confirmation email shortly.</p>
      <a href="/" style={{ color: '#111827', fontWeight: 600, textDecoration: 'underline' }}>Back to home</a>
    </main>
  )
}
