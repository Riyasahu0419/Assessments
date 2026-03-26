import { useState, useMemo, useCallback, useRef } from 'react'
import { VIRTUAL_ITEM_HEIGHT, VIRTUAL_CONTAINER_HEIGHT, VIRTUAL_OVERSCAN } from '../../config/constants'
import ListItem from './ListItem'

interface Item { id: number; label: string }

const TOTAL_ITEMS = 10_000
const WORDS = ['apple', 'banana', 'cherry', 'delta', 'echo', 'foxtrot', 'gamma', 'hotel', 'india', 'juliet']

// Seed items once outside component so reference is stable
const ALL_ITEMS: Item[] = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i + 1,
  label: `Item ${i + 1} — ${WORDS[i % WORDS.length]} ${Math.floor(i / WORDS.length)}`,
}))

export default function PerformanceDemo() {
  const [filterText, setFilterText] = useState('')
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value)
  }, [])

  const filteredItems = useMemo(
    () => filterText.trim() ? ALL_ITEMS.filter(item => item.label.toLowerCase().includes(filterText.toLowerCase())) : ALL_ITEMS,
    [filterText]
  )

  const visibleCount = Math.ceil(VIRTUAL_CONTAINER_HEIGHT / VIRTUAL_ITEM_HEIGHT) + VIRTUAL_OVERSCAN * 2
  const startIndex = Math.max(0, Math.floor(scrollTop / VIRTUAL_ITEM_HEIGHT) - VIRTUAL_OVERSCAN)
  const endIndex = Math.min(filteredItems.length, startIndex + visibleCount)
  const visibleItems = filteredItems.slice(startIndex, endIndex)
  const totalHeight = filteredItems.length * VIRTUAL_ITEM_HEIGHT

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return (
    <div className="container py-5" style={{ maxWidth: 720 }}>
      <div className="mb-4">
        <h2 style={{ color: '#f1f5f9', fontWeight: 700 }}>Performance Optimization</h2>
        {/* <p style={{ color: 'var(--color-muted)' }}>
          Rendering {TOTAL_ITEMS.toLocaleString()} items with virtualization, <code style={{ color: 'var(--color-primary)' }}>useMemo</code>, <code style={{ color: 'var(--color-primary)' }}>useCallback</code>, and <code style={{ color: 'var(--color-primary)' }}>React.memo</code>.
        </p> */}
      </div>

      <div className="d-flex gap-3 align-items-center mb-3 flex-wrap">
        <input
          className="perf-filter-input"
          placeholder="Filter items..."
          value={filterText}
          onChange={handleFilterChange}
        />
        <div className="d-flex gap-3">
          <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
            Showing <strong style={{ color: '#e2e8f0' }}>{filteredItems.length.toLocaleString()}</strong> items
          </span>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
            DOM nodes: <strong style={{ color: 'var(--color-success)' }}>{visibleItems.length}</strong>
          </span>
        </div>
      </div>

      {/* <div className="d-flex gap-2 mb-3 flex-wrap">
        {[
          { label: 'useMemo', desc: 'Cached filter', color: 'var(--color-primary)' },
          { label: 'useCallback', desc: 'Stable handler', color: 'var(--color-secondary)' },
          { label: 'React.memo', desc: 'Skip re-renders', color: 'var(--color-success)' },
          { label: 'Virtualization', desc: `${visibleItems.length} DOM nodes`, color: 'var(--color-warning)' },
        ].map(b => (
          <span key={b.label} style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 6, padding: '4px 10px', fontSize: '0.78rem' }}>
            <span style={{ color: b.color, fontWeight: 600 }}>{b.label}</span>
            <span style={{ color: 'var(--color-muted)', marginLeft: 6 }}>{b.desc}</span>
          </span>
        ))}
      </div> */}

      <div
        ref={containerRef}
        className="virtual-list-container"
        onScroll={handleScroll}
      >
        <div className="virtual-list-inner" style={{ height: totalHeight }}>
          {visibleItems.map((item, i) => (
            <ListItem key={item.id} item={item} index={startIndex + i} />
          ))}
        </div>
      </div>
    </div>
  )
}
