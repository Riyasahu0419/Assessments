import Accordion from './Accordion'

const items = [
  { id: '1', title: 'What is React?', content: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.' },
  { id: '2', title: 'What is a custom hook?', content: 'A custom hook is a JavaScript function whose name starts with "use" and that may call other hooks. Custom hooks let you extract component logic into reusable functions.' },
  { id: '3', title: 'What is the virtual DOM?', content: 'The virtual DOM is a programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM.' },
  { id: '4', title: 'What is Vite?', content: 'Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of a dev server and a build command.' },
  { id: '5', title: 'What is TypeScript?', content: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds optional static typing and class-based object-oriented programming.' },
]

export default function AccordionDemo() {
  return (
    <div className="container py-5" style={{ maxWidth: 720 }}>
      <div className="mb-5">
        <h2 style={{ color: '#f1f5f9', fontWeight: 700 }}>Accordion Component</h2>
        <p style={{ color: 'var(--color-muted)' }}>
          Single open panel at a time. Uses a single <code style={{ color: 'var(--color-primary)' }}>activeId</code> state.
          Smooth CSS <code style={{ color: 'var(--color-primary)' }}>max-height</code> transition. Fully accessible with ARIA attributes.
        </p>
      </div>
      <Accordion items={items} />
    </div>
  )
}
