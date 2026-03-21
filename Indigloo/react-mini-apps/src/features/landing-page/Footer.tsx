export default function Footer() {
  const cols = [
    { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
    { title: 'Teams', links: ['Engineering', 'Design', 'Marketing', 'Sales'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'] },
  ]
  return (
    <footer className="landing-footer py-5">
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <span style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '1.1rem' }}>⚡ MiniApps</span>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginTop: '0.75rem', maxWidth: 260 }}>
              A showcase of React patterns and best practices built with Vite + TypeScript.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title} className="col-6 col-md-2">
              <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>{col.title}</p>
              <ul className="list-unstyled m-0">
                {col.links.map(link => (
                  <li key={link} className="mb-2">
                    <a href="#" style={{ color: 'var(--color-muted)', fontSize: '0.85rem', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>© 2026 React Mini Apps. All rights reserved.</span>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Built with React + Vite + TypeScript</span>
        </div>
      </div>
    </footer>
  )
}
