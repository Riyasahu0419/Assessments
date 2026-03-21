import { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { FiCheck } from 'react-icons/fi'

export interface FormData {
  name: string
  email: string
  password: string
}

export interface FormErrors {
  name?: string
  email?: string
  password?: string
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="step-indicator">
      {[1, 2, 3].map((s, i) => (
        <div key={s} style={{ display: 'contents' }}>
          <div className={`step-dot ${current === s ? 'active' : current > s ? 'completed' : ''}`}>
            {current > s ? <FiCheck size={14} /> : s}
          </div>
          {i < 2 && <div className={`step-line ${current > s ? 'completed' : ''}`} />}
        </div>
      ))}
    </div>
  )
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setErrors({ name: 'Name is required' })
      return false
    }
    return true
  }

  const validateStep2 = () => {
    const errs: FormErrors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address'
    if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters'
    if (Object.keys(errs).length) { setErrors(errs); return false }
    return true
  }

  const next = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2)
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3)
  }

  const back = () => {
    if (currentStep === 2) setCurrentStep(1)
    else if (currentStep === 3) setCurrentStep(2)
  }

  if (submitted) return (
    <div className="container py-5 text-center" style={{ maxWidth: 480 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <FiCheck size={28} color="var(--color-success)" />
      </div>
      <h3 style={{ color: '#f1f5f9', fontWeight: 700 }}>Account Created!</h3>
      <p style={{ color: 'var(--color-muted)' }}>Welcome, {formData.name}. Your account has been successfully created.</p>
      <button className="btn btn-primary mt-2" onClick={() => { setSubmitted(false); setCurrentStep(1); setFormData({ name: '', email: '', password: '' }) }}>Start Over</button>
    </div>
  )

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <div className="mb-4 text-center">
        <h2 style={{ color: '#f1f5f9', fontWeight: 700 }}>Create Account</h2>
        <p style={{ color: 'var(--color-muted)' }}>Step {currentStep} of 3</p>
      </div>
      <StepIndicator current={currentStep} />
      <div className="form-card">
        {currentStep === 1 && <Step1 formData={formData} errors={errors} onChange={update} onNext={next} />}
        {currentStep === 2 && <Step2 formData={formData} errors={errors} onChange={update} onNext={next} onBack={back} />}
        {currentStep === 3 && <Step3 formData={formData} onBack={back} onSubmit={() => setSubmitted(true)} />}
      </div>
    </div>
  )
}
