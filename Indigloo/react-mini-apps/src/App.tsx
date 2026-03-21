import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import LandingPage from './features/landing-page/LandingPage'
import Dashboard from './features/api-dashboard/Dashboard'
import AccordionDemo from './features/accordion/AccordionDemo'
import HooksDemo from './features/custom-hooks/HooksDemo'
import MultiStepForm from './features/multi-step-form/MultiStepForm'
import KanbanBoard from './features/kanban-board/KanbanBoard'
import PerformanceDemo from './features/performance-demo/PerformanceDemo'
import NotFound from './features/not-found/NotFound'

const navLinks = [
  { to: '/', label: 'Landing', end: true },
  { to: '/dashboard', label: 'API Dashboard' },
  { to: '/accordion', label: 'Accordion' },
  { to: '/hooks', label: 'Custom Hooks' },
  { to: '/form', label: 'Multi-Step Form' },
  { to: '/kanban', label: 'Kanban Board' },
  { to: '/performance', label: 'Performance' },
]

function AppNav() {
  const [open, setOpen] = useState(false)
  return (
    <nav style={{ background: 'var(--color-nav-bg)', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container-fluid d-flex align-items-center justify-content-between px-4" style={{ height: 56 }}>
        <span style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '1rem', letterSpacing: '-0.5px' }}>
          ⚡ React Mini Apps
        </span>
        {/* Desktop nav */}
        <div className="d-none d-md-flex gap-1">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              style={({ isActive }) => ({
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: '0.85rem',
                fontWeight: 500,
                color: isActive ? '#fff' : 'var(--color-muted)',
                background: isActive ? 'var(--color-primary)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.15s',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button className="d-md-none btn btn-sm" style={{ color: '#e2e8f0', background: 'none', border: 'none' }} onClick={() => setOpen(o => !o)}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="d-md-none d-flex flex-column px-4 pb-3 gap-1">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isActive ? '#fff' : 'var(--color-muted)',
                background: isActive ? 'var(--color-primary)' : 'transparent',
                textDecoration: 'none',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accordion" element={<AccordionDemo />} />
        <Route path="/hooks" element={<HooksDemo />} />
        <Route path="/form" element={<MultiStepForm />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/performance" element={<PerformanceDemo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
