import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--color-primary)' }}>404</h1>
      <p style={{ color: 'var(--color-muted)', fontSize: '1.2rem' }}>Page not found</p>
      <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
    </div>
  )
}
