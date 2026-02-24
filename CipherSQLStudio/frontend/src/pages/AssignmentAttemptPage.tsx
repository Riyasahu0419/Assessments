import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api';
import { AssignmentDetail, QueryResult } from '../types';
import QuestionPanel from '../components/QuestionPanel';
import SampleDataViewer from '../components/SampleDataViewer';
import SQLEditor from '../components/SQLEditor';
import ResultsPanel from '../components/ResultsPanel';
import HintButton from '../components/HintButton';
import './AssignmentAttemptPage.scss';

function AssignmentAttemptPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<AssignmentDetail | null>(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState<QueryResult | null>(null);
  const [hints, setHints] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAssignment(id);
    }
  }, [id]);

  const fetchAssignment = async (assignmentId: string) => {
    try {
      setLoading(true);
      const data = await apiClient.getAssignmentById(assignmentId);
      setAssignment(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load assignment');
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteQuery = async () => {
    if (!assignment || !sqlQuery.trim()) {
      return;
    }

    setIsExecuting(true);
    setError(null);

    try {
      const result = await apiClient.executeQuery(assignment.id, sqlQuery);
      setQueryResults(result);
    } catch (err: any) {
      setError(err.message || 'Query execution failed');
      setQueryResults(null);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleHintReceived = (hint: string) => {
    setHints([...hints, hint]);
  };

  if (loading) {
    return <div className="loading-spinner" />;
  }

  if (error && !assignment) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/')}>Back to Assignments</button>
      </div>
    );
  }

  if (!assignment) {
    return null;
  }

  return (
    <div className="container">
      <div className="assignment-attempt-page">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Assignments
        </button>

        <QuestionPanel
          question={assignment.question}
          requirements={assignment.requirements}
          difficulty={assignment.difficulty}
        />

        <div className="attempt-layout">
          <div className="left-column">
            <SampleDataViewer tables={assignment.tables} sampleData={assignment.sampleData} />
            <HintButton
              assignmentId={assignment.id}
              currentQuery={sqlQuery}
              hints={hints}
              onHintReceived={handleHintReceived}
            />
          </div>

          <div className="right-column">
            <SQLEditor
              value={sqlQuery}
              onChange={setSqlQuery}
              onExecute={handleExecuteQuery}
              isExecuting={isExecuting}
            />
            <ResultsPanel
              results={queryResults}
              error={error}
              isExecuting={isExecuting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentAttemptPage;
