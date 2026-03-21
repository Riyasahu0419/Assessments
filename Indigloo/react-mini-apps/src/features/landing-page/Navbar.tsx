import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="landing-navbar navbar navbar-expand-md px-4 px-md-5" style={{ position: 'sticky', top: 56, zIndex: 900 }}>
      <div className="container-fluid">
        <span className="navbar-brand fw-bold" style={{ color: '#e2e8f0' }}>⚡ MiniApps</span>
        <div className="d-none d-md-flex gap-4 align-items-center">
          {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
            <a key={item} href="#" style={{ color: 'var(--color-muted)', fontSize: '0.9rem', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}>
              {item}
            </a>
          ))}
        </div>
        <div className="d-none d-md-flex gap-2">
          <Link to="/form" className="btn btn-sm" style={{ color: '#e2e8f0', border: '1px solid var(--color-border)', borderRadius: 6 }}>Log in</Link>
          <Link to="/form" className="btn btn-sm btn-primary" style={{ borderRadius: 6 }}>Sign up</Link>
        </div>
      </div>
    </nav>
  )
}
