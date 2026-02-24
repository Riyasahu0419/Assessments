import { QueryResult } from '../types';
import './ResultsPanel.scss';

interface ResultsPanelProps {
  results: QueryResult | null;
  error: string | null;
  executionTime?: number;
  isExecuting: boolean;
}

function ResultsPanel({ results, error, isExecuting }: ResultsPanelProps) {
  if (isExecuting) {
    return (
      <div className="results-panel">
        <h3>Results</h3>
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Executing query...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-panel">
        <h3>Results</h3>
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results-panel">
        <h3>Results</h3>
        <div className="empty-state">
          <p>Execute a query to see results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-panel">
      <div className="results-header">
        <h3>Results</h3>
        <div className="results-meta">
          <span>{results.rowCount} rows</span>
          <span>{results.executionTime}ms</span>
        </div>
      </div>

      <div className="results-table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              {results.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell?.toString() || 'NULL'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsPanel;
