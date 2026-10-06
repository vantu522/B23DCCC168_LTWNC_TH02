import type { Exercise } from "../../types/excercise";
import { getDeadlineText } from "../../utils/excercise";
import React from 'react';

interface AssignmentCardProps {
  exercise: Exercise;
  isPinned: boolean;
  togglePin: (id: number) => void;
  toggleComplete: (id: number) => void;
  deleteExercise: (id: number) => void;
}

const getBadgeClass = (status: string) => {
  if (status === "COMPLETED") return "badge badge-completed";
  if (status === "OVERDUE") return "badge badge-overdue";
  return "badge badge-pending";
};

const translateStatus = (status: string) => {
  if (status === "COMPLETED") return "Đã hoàn thành";
  if (status === "OVERDUE") return "Quá hạn";
  return "Chưa hoàn thành";
};

const getPriorityClass = (priority: string) => {
  if (priority === "HIGH") return "priority-badge priority-high";
  if (priority === "MEDIUM") return "priority-badge priority-medium";
  return "priority-badge priority-low";
};

const getPriorityLabel = (priority: string) => {
  if (priority === "HIGH") return "Cao";
  if (priority === "MEDIUM") return "Trung bình";
  return "Thấp";
};




const AssignmentCard = React.memo(({
  exercise,
  isPinned,
  togglePin,
  toggleComplete,
  deleteExercise,
}: AssignmentCardProps) => {
  return (
    <div className={`exercise-card ${isPinned ? "pinned" : ""}`}>
      <div className="card-top">
        <span className="card-subject">
          {isPinned && <span style={{ marginRight: 4 }}>📌</span>}
          {exercise.subject}
        </span>
        <span className={getBadgeClass(exercise.excerciseStatus)}>
          {translateStatus(exercise.excerciseStatus)}
        </span>
      </div>

      <label className="card-name-row">
        <input
          type="checkbox"
          className="card-checkbox"
          checked={exercise.excerciseStatus === "COMPLETED"}
          onChange={() => toggleComplete(exercise.id)}
          aria-label={`Đánh dấu hoàn thành bài tập ${exercise.name}`}
        />
        <span className={`card-name ${exercise.excerciseStatus === "COMPLETED" ? "card-name--done" : ""}`}>
          {exercise.name}
        </span>
      </label>

      <div className="card-meta">
        <span>{getDeadlineText(exercise.deadline)}</span>
        <span>
          Ưu tiên:
          <span className={getPriorityClass(exercise.priority)}>
            {getPriorityLabel(exercise.priority)}
          </span>
        </span>
      </div>

      <div className="card-actions">
        <button className="btn" onClick={() => togglePin(exercise.id)} aria-label={`${isPinned ? "Bỏ ghim" : "Ghim"} bài tập ${exercise.name}`}>
          {isPinned ? "Bỏ ghim" : "Ghim"}
        </button>
        <button className="btn btn-delete" onClick={() => deleteExercise(exercise.id)} aria-label={`Xoá bài tập ${exercise.name}`}>
          Xoá
        </button>
      </div>
    </div>
  );
});

export default AssignmentCard;
