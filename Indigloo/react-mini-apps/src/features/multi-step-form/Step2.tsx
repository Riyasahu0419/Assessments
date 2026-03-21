import { FormData, FormErrors } from './MultiStepForm'

interface Props {
  formData: FormData
  errors: FormErrors
  onChange: (field: keyof FormData, value: string) => void
  onNext: () => void
  onBack: () => void
}

export default function Step2({ formData, errors, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <h5 style={{ color: '#e2e8f0', marginBottom: '1.5rem' }}>Account Details</h5>
      <div className="mb-3">
        <label style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: 4, display: 'block' }}>Email Address</label>
        <input
          type="email"
          className="form-control"
          style={{ background: 'var(--color-darker)', border: `1px solid ${errors.email ? 'var(--color-danger)' : 'var(--color-border)'}`, color: '#e2e8f0' }}
          placeholder="john@example.com"
          value={formData.email}
          onChange={e => onChange('email', e.target.value)}
        />
        {errors.email && <p className="form-field-error">{errors.email}</p>}
      </div>
      <div className="mb-3">
        <label style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: 4, display: 'block' }}>Password</label>
        <input
          type="password"
          className="form-control"
          style={{ background: 'var(--color-darker)', border: `1px solid ${errors.password ? 'var(--color-danger)' : 'var(--color-border)'}`, color: '#e2e8f0' }}
          placeholder="Min. 8 characters"
          value={formData.password}
          onChange={e => onChange('password', e.target.value)}
        />
        {errors.password && <p className="form-field-error">{errors.password}</p>}
      </div>
      <div className="d-flex gap-2 mt-2">
        <button className="btn w-50" style={{ border: '1px solid var(--color-border)', color: '#e2e8f0' }} onClick={onBack}>← Back</button>
        <button className="btn btn-primary w-50" onClick={onNext}>Next →</button>
      </div>
    </div>
  )
}
