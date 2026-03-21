import { EnrichedPost } from './types'
import { FiMail, FiUser } from 'react-icons/fi'

const BORDER_COLORS = ['#6366f1','#8b5cf6','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899','#14b8a6','#f97316','#a855f7']

interface PostCardProps {
  post: EnrichedPost
}

export default function PostCard({ post }: PostCardProps) {
  const color = BORDER_COLORS[(post.userId - 1) % BORDER_COLORS.length]
  return (
    <div className="post-card p-3 h-100" style={{ borderTopColor: color }}>
      <h6 className="post-card-title mb-2">{post.title}</h6>
      <p className="post-card-body mb-3">{post.body}</p>
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem', marginTop: 'auto' }}>
        <div className="d-flex align-items-center gap-1 mb-1">
          <FiUser size={12} color="var(--color-muted)" />
          <span style={{ color: '#e2e8f0', fontSize: '0.78rem', fontWeight: 500 }}>{post.author.name}</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <FiMail size={12} color="var(--color-muted)" />
          <span style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>{post.author.email}</span>
        </div>
        <span style={{ color: 'var(--color-muted)', fontSize: '0.7rem', marginTop: '0.25rem', display: 'block' }}>Post #{post.id}</span>
      </div>
    </div>
  )
}
