import React, { useState } from 'react';

const LifecycleForm = ({ employeeId, onEventAdded }) => {
  const [formData, setFormData] = useState({ event_type: '', notes: '', effective_date: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.event_type || !formData.effective_date) {
      setError('Event type and date are required.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/employees/${employeeId}/lifecycle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ event_type: '', notes: '', effective_date: '' });
        onEventAdded();
      }
    } catch (err) {
      setError('Failed to save event.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '4px' }}>
      <h4>Add New Event</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '10px' }}>
        <label>Type: </label>
        <input type="text" placeholder="e.g. Promotion, Transfer" value={formData.event_type} onChange={e => setFormData({...formData, event_type: e.target.value})} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Date: </label>
        <input type="date" value={formData.effective_date} onChange={e => setFormData({...formData, effective_date: e.target.value})} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Notes: </label><br/>
        <textarea style={{ width: '100%' }} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
      </div>
      <button type="submit">Submit Event</button>
    </form>
  );
};

export default LifecycleForm;