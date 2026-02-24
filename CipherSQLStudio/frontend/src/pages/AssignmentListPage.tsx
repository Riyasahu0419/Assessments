import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api';
import { Assignment } from '../types';
import AssignmentCard from '../components/AssignmentCard';
import './AssignmentListPage.scss';

function AssignmentListPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, [difficulty, category]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.getAssignments(difficulty, category);
      setAssignments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentSelect = (id: string) => {
    navigate(`/assignments/${id}`);
  };

  if (loading) {
    return <div className="loading-spinner" />;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="assignment-list-page">
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="basics">Basics</option>
              <option value="joins">Joins</option>
              <option value="aggregation">Aggregation</option>
              <option value="subqueries">Subqueries</option>
            </select>
          </div>
        </div>

        <div className="assignments-grid">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onSelect={handleAssignmentSelect}
            />
          ))}
        </div>

        {assignments.length === 0 && (
          <div className="no-assignments">
            <p>No assignments found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentListPage;
