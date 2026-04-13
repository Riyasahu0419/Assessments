import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createTicket } from '../api'

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  description: Yup.string().min(10, 'Please describe the issue in more detail').required('Description is required'),
})

export default function CreateTicket() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { name: '', email: '', description: '' },
    validationSchema: schema,
    onSubmit: async (values, { setStatus }) => {
      try {
        const res = await createTicket(values)
        if (res.ticketId) {
          navigate(`/ticket/${res.ticketId}`)
        } else {
          setStatus('Something went wrong. Please try again.')
        }
      } catch {
        setStatus('Failed to submit ticket. Check your connection.')
      }
    },
  })

  return (
    <div>
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      <div className="form-card">
        <h2>Submit a Support Ticket</h2>

        {formik.status && <div className="alert alert-error">{formik.status}</div>}

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Your name"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="form-error">{formik.errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="form-error">{formik.errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Issue Description</label>
            <textarea
              id="description"
              placeholder="Describe your issue in detail..."
              {...formik.getFieldProps('description')}
            />
            {formik.touched.description && formik.errors.description && (
              <span className="form-error">{formik.errors.description}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Submitting & analyzing...' : 'Submit Ticket'}
            </button>
            <Link to="/" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
