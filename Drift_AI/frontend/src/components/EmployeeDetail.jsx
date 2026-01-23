import React, { useState, useEffect } from 'react';
import LifecycleForm from './LifecycleForm';

const EmployeeDetail = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [empRes, histRes] = await Promise.all([
        fetch(`http://localhost:5000/api/employees/${employeeId}`),
        fetch(`http://localhost:5000/api/employees/${employeeId}/lifecycle`)
      ]);
      const empData = await empRes.json();
      const histData = await histRes.json();
      setEmployee(empData);
      setHistory(histData);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, [employeeId]);

  if (loading) return <p>Loading details...</p>;
  if (!employee) return <p>Employee not found.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
      <div>
        <h3>Profile</h3>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Dept:</strong> {employee.department}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Status:</strong> {employee.status}</p>
        
        <hr />
        <LifecycleForm employeeId={employeeId} onEventAdded={fetchData} />
      </div>

      <div>
        <h3>Lifecycle Audit Trail</h3>
        {history.length === 0 ? <p>No events recorded.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {history.map(event => (
              <li key={event.id} style={{ borderLeft: '3px solid #007bff', padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
                <strong>{event.event_type}</strong> - {event.effective_date}
                <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#555' }}>{event.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;