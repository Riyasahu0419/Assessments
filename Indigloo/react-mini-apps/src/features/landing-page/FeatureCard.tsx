import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  iconBg: string
}

export default function FeatureCard({ icon, title, description, iconBg }: FeatureCardProps) {
  return (
    <div className="feature-card h-100">
      <div className="feature-icon" style={{ background: iconBg }}>{icon}</div>
      <h5 style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</h5>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', margin: 0 }}>{description}</p>
    </div>
  )
}
