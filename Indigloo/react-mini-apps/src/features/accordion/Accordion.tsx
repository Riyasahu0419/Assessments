import { useState } from 'react'
import AccordionItem from './AccordionItem'

interface AccordionData {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionData[]
}

export default function Accordion({ items }: AccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setActiveId(prev => (prev === id ? null : id))
  }

  return (
    <div className="accordion-custom">
      {items.map(item => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isOpen={activeId === item.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}
