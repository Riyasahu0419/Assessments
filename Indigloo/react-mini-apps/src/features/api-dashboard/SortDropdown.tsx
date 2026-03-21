import { SortOption } from './types'

interface SortDropdownProps {
  value: SortOption
  onChange: (v: SortOption) => void
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      className="form-select"
      style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: '#e2e8f0', width: 'auto', minWidth: 140 }}
      value={value}
      onChange={e => onChange(e.target.value as SortOption)}
    >
      <option value="title-asc">Sort: A → Z</option>
      <option value="title-desc">Sort: Z → A</option>
      <option value="author-asc">Sort: Author</option>
    </select>
  )
}
