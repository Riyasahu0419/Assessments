import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';

function App() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const styles = {
    container: { fontFamily: 'sans-serif', padding: '20px', maxWidth: '1000px', margin: '0 auto' },
    header: { borderBottom: '2px solid #eee', marginBottom: '20px', paddingBottom: '10px' },
    backBtn: { marginBottom: '15px', cursor: 'pointer', padding: '8px 16px' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>HR Employee Lifecycle System</h1>
      </header>

      {selectedEmployeeId ? (
        <div>
          <button style={styles.backBtn} onClick={() => setSelectedEmployeeId(null)}>
            ← Back to List
          </button>
          <EmployeeDetail employeeId={selectedEmployeeId} />
        </div>
      ) : (
        <EmployeeList onSelectEmployee={(id) => setSelectedEmployeeId(id)} />
      )}
    </div>
  );
}

export default App;