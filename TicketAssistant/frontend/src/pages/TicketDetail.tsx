import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getTicket, updateStatus, updateReply } from '../api'

interface Ticket {
  ticketId: string
  name: string
  email: string
  description: string
  category: string | null
  aiReply: string | null
  status: string
  createdAt: string
  confidence?: number
}

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingReply, setSavingReply] = useState(false)
  const [resolvingStatus, setResolvingStatus] = useState(false)
  const [replySuccess, setReplySuccess] = useState(false)

  useEffect(() => {
    if (!id) return
    getTicket(id)
      .then((data: Ticket) => {
        setTicket(data)
        setReply(data.aiReply ?? '')
      })
      .catch(() => setError('Failed to load ticket.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleResolve = async () => {
    if (!id || !ticket) return
    setResolvingStatus(true)
    try {
      await updateStatus(id, 'RESOLVED')
      setTicket(t => t ? { ...t, status: 'RESOLVED' } : t)
    } catch {
      setError('Failed to update status.')
    } finally {
      setResolvingStatus(false)
    }
  }

  const handleSaveReply = async () => {
    if (!id) return
    setSavingReply(true)
    setReplySuccess(false)
    try {
      await updateReply(id, reply)
      setTicket(t => t ? { ...t, aiReply: reply } : t)
      setReplySuccess(true)
      setTimeout(() => setReplySuccess(false), 3000)
    } catch {
      setError('Failed to save reply.')
    } finally {
      setSavingReply(false)
    }
  }

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      Loading ticket...
    </div>
  )

  if (error && !ticket) return (
    <div>
      <Link to="/" className="back-link">← Back</Link>
      <div className="alert alert-error">{error}</div>
    </div>
  )

  if (!ticket) return null

  return (
    <div>
      <Link to="/" className="back-link">← Back to Dashboard</Link>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="detail-card">
        <div className="detail-header">
          <h2 style={{ margin: 0 }}>Ticket #{ticket.ticketId.slice(-8)}</h2>
          <div className="detail-badges">
            {ticket.category && <span className="badge badge-category">{ticket.category}</span>}
            <span className={`badge ${ticket.status === 'RESOLVED' ? 'badge-resolved' : 'badge-open'}`}>
              {ticket.status}
            </span>
            {ticket.confidence !== undefined && (
              <span className="confidence">AI confidence: {Math.round(ticket.confidence * 100)}%</span>
            )}
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-label">Submitted by</div>
          <div className="detail-value">{ticket.name} &mdash; {ticket.email}</div>
        </div>

        <div className="detail-section">
          <div className="detail-label">Issue Description</div>
          <div className="detail-value">{ticket.description}</div>
        </div>

        <div className="detail-section">
          <div className="detail-label">Created</div>
          <div className="detail-value">{new Date(ticket.createdAt).toLocaleString()}</div>
        </div>

        <div className="detail-section">
          <div className="detail-label">AI Suggested Reply</div>
          {replySuccess && <div className="alert alert-success" style={{ marginBottom: 10 }}>Reply saved.</div>}
          <textarea
            className="reply-textarea"
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="AI reply will appear here..."
          />
          <div className="reply-actions">
            <button className="btn-primary" onClick={handleSaveReply} disabled={savingReply}>
              {savingReply ? 'Saving...' : 'Save Reply'}
            </button>
            {ticket.status !== 'RESOLVED' && (
              <button className="btn-success" onClick={handleResolve} disabled={resolvingStatus}>
                {resolvingStatus ? 'Updating...' : 'Mark as Resolved'}
              </button>
            )}
            {ticket.status === 'RESOLVED' && (
              <button className="btn-secondary" onClick={() => navigate('/')}>
                Back to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
