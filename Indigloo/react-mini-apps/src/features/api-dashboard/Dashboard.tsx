import { useState, useEffect, useMemo } from 'react'
import { Post, User, EnrichedPost, UserMap, SortOption } from './types'
import { apiFetch } from '../../utils/helpers'
import { ITEMS_PER_PAGE } from '../../config/constants'
import SearchBar from './SearchBar'
import SortDropdown from './SortDropdown'
import UserSidebar from './UserSidebar'
import PostCard from './PostCard'

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [userMap, setUserMap] = useState<UserMap>({})
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('title-asc')
  const [selectedUserIds, setSelectedUserIds] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    Promise.all([
      apiFetch<User[]>('/users', controller.signal),
      apiFetch<Post[]>('/posts', controller.signal),
    ])
      .then(([fetchedUsers, fetchedPosts]) => {
        const map: UserMap = {}
        fetchedUsers.forEach(u => { map[u.id] = u })
        setUsers(fetchedUsers)
        setUserMap(map)
        setPosts(fetchedPosts)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message ?? 'Failed to fetch data')
        setLoading(false)
      })
    return () => controller.abort()
  }, [])

  const mergedPosts: EnrichedPost[] = useMemo(
    () => posts.map(p => ({ ...p, author: userMap[p.userId] ?? { id: p.userId, name: 'Unknown', email: '' } })),
    [posts, userMap]
  )

  const filteredPosts = useMemo(() => {
    let result = mergedPosts
    if (selectedUserIds.size > 0) result = result.filter(p => selectedUserIds.has(p.userId))
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(p => p.title.toLowerCase().includes(term) || p.body.toLowerCase().includes(term))
    }
    return [...result].sort((a, b) => {
      if (sortOption === 'title-asc') return a.title.localeCompare(b.title)
      if (sortOption === 'title-desc') return b.title.localeCompare(a.title)
      return a.author.name.localeCompare(b.author.name)
    })
  }, [mergedPosts, selectedUserIds, searchTerm, sortOption])

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const paginated = filteredPosts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const toggleUser = (id: number) => {
    setSelectedUserIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setPage(1)
  }

  if (loading) return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="spinner-border" style={{ color: 'var(--color-primary)' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )

  if (error) return (
    <div className="container py-5 text-center">
      <p style={{ color: 'var(--color-danger)', fontSize: '1.1rem' }}>⚠ {error}</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-darker)' }}>
      <div className="container-fluid px-4 py-4">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
          <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: 0 }}>User Post Dashboard</h4>
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <SearchBar value={searchTerm} onChange={v => { setSearchTerm(v); setPage(1) }} />
            <SortDropdown value={sortOption} onChange={setSortOption} />
            <span style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--color-primary)', padding: '4px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 600 }}>
              {filteredPosts.length} posts
            </span>
          </div>
        </div>

        <div className="d-flex gap-4 align-items-start">
          <div className="d-none d-lg-block">
            <UserSidebar users={users} posts={mergedPosts} selectedIds={selectedUserIds} onToggle={toggleUser} />
          </div>

          <div style={{ flex: 1 }}>
            <div className="row g-3">
              {paginated.map(post => (
                <div key={post.id} className="col-12 col-md-6 col-xl-4">
                  <PostCard post={post} />
                </div>
              ))}
              {paginated.length === 0 && (
                <div className="col-12 text-center py-5">
                  <p style={{ color: 'var(--color-muted)' }}>No posts match your search.</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center gap-2 mt-4">
                <button className="btn btn-sm" style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)' }} disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
                  <button key={p} className="btn btn-sm" onClick={() => setPage(p)}
                    style={{ background: p === page ? 'var(--color-primary)' : 'transparent', color: p === page ? '#fff' : 'var(--color-muted)', border: '1px solid var(--color-border)', minWidth: 36 }}>
                    {p}
                  </button>
                ))}
                <button className="btn btn-sm" style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)' }} disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
