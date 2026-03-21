import { Link } from 'react-router-dom'
import { FiZap, FiArrowRight, FiPlay } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="landing-hero px-4 px-md-5">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="hero-badge">
              <FiZap size={12} /> Now in Public Beta
            </div>
            <h1 className="hero-title mb-4">
              Build React apps<br />
              <span style={{ color: 'var(--color-primary)' }}>faster than ever</span>
            </h1>
            <p className="hero-subtitle mb-5">
              A collection of 7 production-ready React mini apps demonstrating real-world patterns — API integration, drag-and-drop, performance optimization, and more.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Link to="/dashboard" className="btn btn-primary d-flex align-items-center gap-2" style={{ borderRadius: 8, padding: '10px 22px' }}>
                Get started <FiArrowRight />
              </Link>
              <Link to="/accordion" className="btn d-flex align-items-center gap-2" style={{ borderRadius: 8, padding: '10px 22px', border: '1px solid var(--color-border)', color: '#e2e8f0' }}>
                <FiPlay size={14} /> View demo
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-preview p-3">
              <div className="d-flex gap-2 mb-3">
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              </div>
              <div style={{ background: 'var(--color-darker)', borderRadius: 8, padding: '1rem', minHeight: 200 }}>
                <div className="d-flex gap-3 mb-3">
                  <div style={{ flex: 1, height: 80, background: 'var(--color-card-bg)', borderRadius: 6, borderTop: '3px solid var(--color-primary)' }} />
                  <div style={{ flex: 1, height: 80, background: 'var(--color-card-bg)', borderRadius: 6, borderTop: '3px solid var(--color-secondary)' }} />
                </div>
                <div style={{ height: 12, background: 'var(--color-card-bg)', borderRadius: 4, marginBottom: 8, width: '70%' }} />
                <div style={{ height: 12, background: 'var(--color-card-bg)', borderRadius: 4, width: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
