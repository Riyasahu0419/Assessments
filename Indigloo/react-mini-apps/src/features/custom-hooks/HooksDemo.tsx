import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useFetch } from './hooks/useFetch'
import { useDebounce } from './hooks/useDebounce'

interface Post { id: number; title: string }

function LocalStorageSection() {
  const [name, setName] = useLocalStorage('demo-name', '')
  return (
    <div className="form-card mb-4">
      <h5 style={{ color: '#e2e8f0', marginBottom: '0.25rem' }}>useLocalStorage</h5>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Value persists across page refreshes. Try typing, then refresh.
      </p>
      <input
        className="form-control"
        style={{ background: 'var(--color-darker)', border: '1px solid var(--color-border)', color: '#e2e8f0' }}
        placeholder="Type something..."
        value={name}
        onChange={e => setName(e.target.value)}
      />
      {name && <p style={{ color: 'var(--color-success)', marginTop: '0.5rem', fontSize: '0.85rem' }}>Stored: "{name}"</p>}
    </div>
  )
}

function FetchSection() {
  const { data, loading, error } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5')
  return (
    <div className="form-card mb-4">
      <h5 style={{ color: '#e2e8f0', marginBottom: '0.25rem' }}>useFetch</h5>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Fetches data with AbortController cleanup on unmount.
      </p>
      {loading && <p style={{ color: 'var(--color-muted)' }}>Loading...</p>}
      {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}
      {data && (
        <ul className="list-unstyled m-0">
          {data.map(p => (
            <li key={p.id} style={{ color: '#e2e8f0', fontSize: '0.85rem', padding: '4px 0', borderBottom: '1px solid var(--color-border)' }}>
              #{p.id} — {p.title.slice(0, 50)}...
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function DebounceSection() {
  const [input, setInput] = useState('')
  const debounced = useDebounce(input, 500)
  return (
    <div className="form-card mb-4">
      <h5 style={{ color: '#e2e8f0', marginBottom: '0.25rem' }}>useDebounce</h5>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Debounced value updates 500ms after you stop typing.
      </p>
      <input
        className="form-control mb-3"
        style={{ background: 'var(--color-darker)', border: '1px solid var(--color-border)', color: '#e2e8f0' }}
        placeholder="Type quickly..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Live value</span>
          <p style={{ color: 'var(--color-warning)', margin: 0 }}>{input || '—'}</p>
        </div>
        <div>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Debounced (500ms)</span>
          <p style={{ color: 'var(--color-success)', margin: 0 }}>{debounced || '—'}</p>
        </div>
      </div>
    </div>
  )
}

export default function HooksDemo() {
  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <div className="mb-5">
        <h2 style={{ color: '#f1f5f9', fontWeight: 700 }}>Custom Hooks</h2>
        <p style={{ color: 'var(--color-muted)' }}>Three reusable hooks demonstrating localStorage persistence, fetch with cleanup, and debounced values.</p>
      </div>
      <LocalStorageSection />
      <FetchSection />
      <DebounceSection />
    </div>
  )
}
