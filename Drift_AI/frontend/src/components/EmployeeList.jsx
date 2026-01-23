import React, { useState, useEffect } from 'react';

const EmployeeList = ({ onSelectEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ department: '', status: '' });

 useEffect(() => {
  const query = new URLSearchParams(filters).toString();
  // Ensure this port matches your backend (5000)
  fetch(`http://localhost:5000/api/employees?${query}`) 
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      setEmployees(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setLoading(false); // Stop loading even if it fails so you see the error
    });
}, [filters]);

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <select onChange={(e) => setFilters({...filters, department: e.target.value})}>
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select onChange={(e) => setFilters({...filters, status: e.target.value})}>
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Terminated">Terminated</option>
        </select>
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>{emp.status}</td>
              <td>
                <button onClick={() => onSelectEmployee(emp.id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;