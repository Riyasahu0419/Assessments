import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import TaskCard from './TaskCard'

interface Task { id: string; title: string }

interface ColumnProps {
  columnKey: string
  title: string
  color: string
  tasks: Task[]
  onAddTask: (title: string) => void
  onDeleteTask: (id: string, column: string) => void
  onDragStart: (taskId: string, sourceColumn: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (targetColumn: string) => void
}

export default function Column({ columnKey, title, color, tasks, onAddTask, onDeleteTask, onDragStart, onDragOver, onDrop }: ColumnProps) {
  const [input, setInput] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)

  const handleAdd = () => {
    if (input.trim()) { onAddTask(input.trim()); setInput('') }
  }

  return (
    <div
      className={`kanban-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={e => { e.preventDefault(); setIsDragOver(true); onDragOver(e) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={() => { setIsDragOver(false); onDrop(columnKey) }}
    >
      <div className="kanban-column-header">
        <div className="d-flex align-items-center gap-2">
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, display: 'inline-block' }} />
          <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>{title}</span>
        </div>
        <span style={{ background: 'var(--color-darker)', color: 'var(--color-muted)', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 999 }}>{tasks.length}</span>
      </div>

      <div className="d-flex flex-column gap-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} columnKey={columnKey} onDelete={onDeleteTask} onDragStart={onDragStart} />
        ))}
      </div>

      <div className="d-flex gap-2 mt-2">
        <input
          className="kanban-add-input"
          placeholder="Add a task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          style={{ background: 'var(--color-primary)', border: 'none', borderRadius: 6, padding: '0 10px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}
          aria-label="Add task"
        >
          <FiPlus size={16} />
        </button>
      </div>
    </div>
  )
}
