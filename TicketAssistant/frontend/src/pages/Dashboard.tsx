import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTickets } from '../api'

interface Ticket {
  ticketId: string
  description: string
  category: string | null
  status: string
  createdAt: string
  confidence?: number
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getTickets()
      .then(setTickets)
      .catch(() => setError('Failed to load tickets.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      Loading tickets...
    </div>
  )

  return (
    <div>
      <div className="page-header">
        <h2>Support Tickets</h2>
        <Link to="/create" className="btn-primary">+ New Ticket</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {!error && tickets.length === 0 && (
        <div className="empty-state">
          <p>No tickets yet.</p>
          <Link to="/create" className="btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>
            Submit your first ticket
          </Link>
        </div>
      )}

      <div className="ticket-list">
        {tickets.map(t => (
          <Link to={`/ticket/${t.ticketId}`} key={t.ticketId} className="ticket-card">
            <div className="ticket-card-top">
              <span className="ticket-desc">
                {t.description.length > 100 ? t.description.slice(0, 100) + '…' : t.description}
              </span>
              <div className="ticket-meta">
                {t.category && <span className="badge badge-category">{t.category}</span>}
                <span className={`badge ${t.status === 'RESOLVED' ? 'badge-resolved' : 'badge-open'}`}>
                  {t.status}
                </span>
              </div>
            </div>
            <span className="ticket-time">{new Date(t.createdAt).toLocaleString()}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
