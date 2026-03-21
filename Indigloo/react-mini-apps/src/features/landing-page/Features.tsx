import { FiZap, FiShield, FiBarChart2, FiCode, FiLayers, FiTrendingUp } from 'react-icons/fi'
import FeatureCard from './FeatureCard'

const features = [
  { icon: <FiZap color="#f59e0b" />, title: 'API Integration', description: 'Fetch, normalize, and display data from REST APIs with search, filter, and sort.', iconBg: 'rgba(245,158,11,0.15)' },
  { icon: <FiShield color="#10b981" />, title: 'Reusable Components', description: 'Accessible accordion, multi-step forms, and Kanban board built from scratch.', iconBg: 'rgba(16,185,129,0.15)' },
  { icon: <FiBarChart2 color="#6366f1" />, title: 'Performance', description: 'Virtualized lists, memoization, and useCallback for buttery-smooth rendering.', iconBg: 'rgba(99,102,241,0.15)' },
  { icon: <FiCode color="#8b5cf6" />, title: 'Custom Hooks', description: 'useLocalStorage, useFetch with AbortController, and useDebounce patterns.', iconBg: 'rgba(139,92,246,0.15)' },
  { icon: <FiLayers color="#3b82f6" />, title: 'Drag & Drop', description: 'Native HTML5 drag-and-drop Kanban board with immutable state updates.', iconBg: 'rgba(59,130,246,0.15)' },
  { icon: <FiTrendingUp color="#ef4444" />, title: 'TypeScript', description: 'Fully typed with strict TypeScript — interfaces, generics, and type guards.', iconBg: 'rgba(239,68,68,0.15)' },
]

export default function Features() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="text-center mb-5">
          <p style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Features</p>
          <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>Everything you need to learn React</h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: 500, margin: '0 auto' }}>Seven mini apps covering the most important React patterns and concepts.</p>
        </div>
        <div className="row g-4">
          {features.map(f => (
            <div key={f.title} className="col-12 col-md-6 col-lg-4">
              <FeatureCard {...f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
