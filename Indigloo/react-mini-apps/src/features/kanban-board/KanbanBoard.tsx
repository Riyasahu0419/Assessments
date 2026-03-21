import { useState, useRef } from 'react'
import Column from './Column'

type ColumnKey = 'todo' | 'inProgress' | 'done'
interface Task { id: string; title: string }
type Columns = Record<ColumnKey, Task[]>

const COLUMN_META: { key: ColumnKey; title: string; color: string }[] = [
  { key: 'todo', title: 'To Do', color: '#6366f1' },
  { key: 'inProgress', title: 'In Progress', color: '#f59e0b' },
  { key: 'done', title: 'Done', color: '#10b981' },
]

const INITIAL: Columns = {
  todo: [
    { id: '1', title: 'Design landing page' },
    { id: '2', title: 'Set up project structure' },
    { id: '3', title: 'Write unit tests' },
  ],
  inProgress: [
    { id: '4', title: 'Build API dashboard' },
    { id: '5', title: 'Implement drag and drop' },
  ],
  done: [
    { id: '6', title: 'Initialize Vite project' },
    { id: '7', title: 'Configure TypeScript' },
  ],
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>(INITIAL)
  const dragState = useRef<{ taskId: string; sourceColumn: ColumnKey } | null>(null)

  const handleDragStart = (taskId: string, sourceColumn: string) => {
    dragState.current = { taskId, sourceColumn: sourceColumn as ColumnKey }
  }

  const handleDrop = (targetColumn: string) => {
    const target = targetColumn as ColumnKey
    if (!dragState.current) return
    const { taskId, sourceColumn } = dragState.current
    if (sourceColumn === target) return

    setColumns(prev => {
      const task = prev[sourceColumn].find(t => t.id === taskId)
      if (!task) return prev
      return {
        ...prev,
        [sourceColumn]: prev[sourceColumn].filter(t => t.id !== taskId),
        [target]: [...prev[target], task],
      }
    })
    dragState.current = null
  }

  const handleAddTask = (columnKey: ColumnKey, title: string) => {
    setColumns(prev => ({
      ...prev,
      [columnKey]: [...prev[columnKey], { id: crypto.randomUUID(), title }],
    }))
  }

  const handleDeleteTask = (taskId: string, columnKey: string) => {
    const col = columnKey as ColumnKey
    setColumns(prev => ({ ...prev, [col]: prev[col].filter(t => t.id !== taskId) }))
  }

  return (
    <div style={{ background: 'var(--color-darker)', minHeight: '100vh' }}>
      <div className="px-4 py-4">
        <h4 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '1.5rem' }}>Kanban Board</h4>
        <div className="kanban-board">
          {COLUMN_META.map(col => (
            <Column
              key={col.key}
              columnKey={col.key}
              title={col.title}
              color={col.color}
              tasks={columns[col.key]}
              onAddTask={title => handleAddTask(col.key, title)}
              onDeleteTask={handleDeleteTask}
              onDragStart={handleDragStart}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
