import { useState } from 'react';
import './QuestionPanel.scss';

interface QuestionPanelProps {
  question: string;
  requirements: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

function QuestionPanel({ question, requirements, difficulty }: QuestionPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`question-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="panel-header">
        <div className="header-content">
          <h2>Question</h2>
          <span className={`difficulty-badge difficulty-${difficulty}`}>
            {difficulty}
          </span>
        </div>
        <button
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="panel-content">
          <p className="question-text">{question}</p>

          <div className="requirements">
            <h3>Requirements:</h3>
            <ul>
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionPanel;
