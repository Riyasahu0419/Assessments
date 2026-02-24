import { useState } from 'react';
import { TableSchema } from '../types';
import './SampleDataViewer.scss';

interface SampleDataViewerProps {
  tables: TableSchema[];
  sampleData: Record<string, any[]>;
}

function SampleDataViewer({ tables, sampleData }: SampleDataViewerProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (tables.length === 0) {
    return null;
  }

  const activeTable = tables[activeTab];
  const data = sampleData[activeTable.name] || [];

  return (
    <div className="sample-data-viewer">
      <h3>Sample Data</h3>

      {tables.length > 1 && (
        <div className="tabs">
          {tables.map((table, index) => (
            <button
              key={table.name}
              className={`tab ${index === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {table.name}
            </button>
          ))}
        </div>
      )}

      <div className="schema-info">
        <h4>{activeTable.name}</h4>
        <div className="columns">
          {activeTable.columns.map((col) => (
            <div key={col.name} className="column-info">
              <span className="column-name">
                {col.name}
                {col.primaryKey && <span className="badge pk">PK</span>}
              </span>
              <span className="column-type">{col.type}</span>
              {col.foreignKey && (
                <span className="fk-ref">
                  → {col.foreignKey.table}.{col.foreignKey.column}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {activeTable.columns.map((col) => (
                <th key={col.name}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {activeTable.columns.map((col) => (
                  <td key={col.name}>{row[col.name]?.toString() || 'NULL'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SampleDataViewer;
