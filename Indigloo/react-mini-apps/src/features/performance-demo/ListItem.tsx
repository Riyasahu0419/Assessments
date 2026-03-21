import { memo } from 'react'
import { VIRTUAL_ITEM_HEIGHT } from '../../config/constants'

interface Item { id: number; label: string }

interface ListItemProps {
  item: Item
  index: number
}

const ListItem = memo(function ListItem({ item, index }: ListItemProps) {
  return (
    <div
      className="virtual-list-item"
      style={{ top: index * VIRTUAL_ITEM_HEIGHT }}
    >
      <span style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginRight: 12, minWidth: 50 }}>#{item.id}</span>
      <span>{item.label}</span>
    </div>
  )
})

export default ListItem
