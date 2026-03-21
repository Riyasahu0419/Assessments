import { FormData, FormErrors } from './MultiStepForm'

interface Props {
  formData: FormData
  errors: FormErrors
  onChange: (field: keyof FormData, value: string) => void
  onNext: () => void
}

export default function Step1({ formData, errors, onChange, onNext }: Props) {
  return (
    <div>
      <h5 style={{ color: '#e2e8f0', marginBottom: '1.5rem' }}>Personal Information</h5>
      <div className="mb-3">
        <label style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: 4, display: 'block' }}>Full Name</label>
        <input
          className="form-control"
          style={{ background: 'var(--color-darker)', border: `1px solid ${errors.name ? 'var(--color-danger)' : 'var(--color-border)'}`, color: '#e2e8f0' }}
          placeholder="John Doe"
          value={formData.name}
          onChange={e => onChange('name', e.target.value)}
        />
        {errors.name && <p className="form-field-error">{errors.name}</p>}
      </div>
      <button className="btn btn-primary w-100 mt-2" onClick={onNext}>Next →</button>
    </div>
  )
}
