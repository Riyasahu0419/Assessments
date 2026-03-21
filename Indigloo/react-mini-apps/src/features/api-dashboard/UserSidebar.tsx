import { User, EnrichedPost } from './types'

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899','#14b8a6','#f97316','#a855f7']

interface UserSidebarProps {
  users: User[]
  posts: EnrichedPost[]
  selectedIds: Set<number>
  onToggle: (id: number) => void
}

export default function UserSidebar({ users, posts, selectedIds, onToggle }: UserSidebarProps) {
  const postCount = (userId: number) => posts.filter(p => p.userId === userId).length

  return (
    <div className="user-sidebar p-3" style={{ minWidth: 200 }}>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.75rem' }}>Users</p>
      <div className="d-flex flex-column gap-2">
        {users.map((u, i) => {
          const active = selectedIds.has(u.id)
          return (
            <button
              key={u.id}
              onClick={() => onToggle(u.id)}
              style={{
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                border: active ? '1px solid var(--color-primary)' : '1px solid transparent',
                borderRadius: 8,
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <div className="user-avatar" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                {u.name.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name.split(' ')[0]}</div>
              </div>
              <span style={{ background: 'var(--color-darker)', color: 'var(--color-muted)', fontSize: '0.7rem', padding: '1px 6px', borderRadius: 999 }}>{postCount(u.id)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
