import { Assignment } from '../types';
import './AssignmentCard.scss';

interface AssignmentCardProps {
  assignment: Assignment;
  onSelect: (id: string) => void;
}

function AssignmentCard({ assignment, onSelect }: AssignmentCardProps) {
  const getDifficultyClass = (difficulty: string) => {
    return `difficulty-badge difficulty-${difficulty}`;
  };

  return (
    <div className="assignment-card" onClick={() => onSelect(assignment.id)}>
      <div className="card-header">
        <h3>{assignment.title}</h3>
        <span className={getDifficultyClass(assignment.difficulty)}>
          {assignment.difficulty}
        </span>
      </div>

      <p className="card-description">{assignment.description}</p>

      <div className="card-footer">
        <span className="category">{assignment.category}</span>
        <span className="time">~{assignment.estimatedTime} min</span>
      </div>
    </div>
  );
}

export default AssignmentCard;
