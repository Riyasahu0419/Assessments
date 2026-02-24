import { useState } from 'react';
import './HintButton.scss';

interface HintButtonProps {
  assignmentId: string;
  currentQuery: string;
  hints: string[];
  onHintReceived: (hint: string) => void;
  maxHints?: number;
}

function HintButton({ assignmentId, currentQuery, hints, onHintReceived, maxHints = 5 }: HintButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const handleGetHint = async () => {
    if (hints.length >= maxHints) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/hints/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignmentId,
          currentQuery,
          previousHints: hints,
        }),
      });

      const result = await response.json();

      if (result.success) {
        onHintReceived(result.data.hint);
        setShowHints(true);
      }
    } catch (error) {
      console.error('Failed to get hint:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hint-section">
      <div className="hint-controls">
        <button
          className="hint-button"
          onClick={handleGetHint}
          disabled={isLoading || hints.length >= maxHints}
        >
          {isLoading ? 'Getting hint...' : 'Get Hint'}
        </button>
        <span className="hint-count">
          Hints used: {hints.length}/{maxHints}
        </span>
        {hints.length > 0 && (
          <button
            className="toggle-hints-button"
            onClick={() => setShowHints(!showHints)}
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
        )}
      </div>

      {showHints && hints.length > 0 && (
        <div className="hints-list">
          <h4>Hints:</h4>
          {hints.map((hint, index) => (
            <div key={index} className="hint-item">
              <span className="hint-number">Hint {index + 1}:</span>
              <p>{hint}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HintButton;
