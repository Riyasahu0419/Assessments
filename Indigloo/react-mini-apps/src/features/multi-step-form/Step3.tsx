import { FormData } from './MultiStepForm'

interface Props {
  formData: FormData
  onBack: () => void
  onSubmit: () => void
}

export default function Step3({ formData, onBack, onSubmit }: Props) {
  const rows = [
    { label: 'Full Name', value: formData.name },
    { label: 'Email', value: formData.email },
    { label: 'Password', value: '•'.repeat(formData.password.length) },
  ]
  return (
    <div>
      <h5 style={{ color: '#e2e8f0', marginBottom: '1.5rem' }}>Review Your Details</h5>
      <div className="d-flex flex-column gap-3 mb-4">
        {rows.map(r => (
          <div key={r.label} style={{ background: 'var(--color-darker)', borderRadius: 8, padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>{r.label}</span>
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{r.value}</span>
          </div>
        ))}
      </div>
      <div className="d-flex gap-2">
        <button className="btn w-50" style={{ border: '1px solid var(--color-border)', color: '#e2e8f0' }} onClick={onBack}>← Back</button>
        <button className="btn btn-primary w-50" onClick={onSubmit}>Submit ✓</button>
      </div>
    </div>
  )
}
