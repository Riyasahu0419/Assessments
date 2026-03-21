import { FiSearch } from 'react-icons/fi'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
      <FiSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
      <input
        className="dashboard-search form-control"
        style={{ paddingLeft: 34 }}
        placeholder="Search posts..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
