import { FiTrash2 } from 'react-icons/fi'

interface Task {
  id: string
  title: string
}

interface TaskCardProps {
  task: Task
  columnKey: string
  onDelete: (id: string, column: string) => void
  onDragStart: (taskId: string, sourceColumn: string) => void
}

export default function TaskCard({ task, columnKey, onDelete, onDragStart }: TaskCardProps) {
  return (
    <div
      className="kanban-task-card"
      draggable
      onDragStart={() => onDragStart(task.id, columnKey)}
    >
      <span style={{ color: '#e2e8f0', fontSize: '0.875rem', flex: 1 }}>{task.title}</span>
      <button
        onClick={() => onDelete(task.id, columnKey)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', padding: 4, display: 'flex', alignItems: 'center' }}
        aria-label="Delete task"
      >
        <FiTrash2 size={14} />
      </button>
    </div>
  )
}
