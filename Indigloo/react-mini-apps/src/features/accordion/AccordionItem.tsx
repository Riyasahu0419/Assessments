import { FiChevronDown } from 'react-icons/fi'

interface AccordionItemProps {
  id: string
  title: string
  content: string
  isOpen: boolean
  onToggle: (id: string) => void
}

export default function AccordionItem({ id, title, content, isOpen, onToggle }: AccordionItemProps) {
  const panelId = `panel-${id}`
  const btnId = `btn-${id}`
  return (
    <div className="accordion-item-custom">
      <button
        id={btnId}
        className="accordion-btn-custom"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(id)}
      >
        <span>{title}</span>
        <FiChevronDown className={`accordion-icon ${isOpen ? 'open' : ''}`} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`accordion-panel ${isOpen ? 'open' : ''}`}
      >
        {content}
      </div>
    </div>
  )
}
