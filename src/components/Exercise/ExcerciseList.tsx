import { useEffect, type ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addExercise as addExerciseAction,
  deleteExercise as deleteExerciseAction,
  fetchExercises,
  setFilter as setFilterAction,
  toggleComplete as toggleCompleteAction,
} from "../../features/exercises/exerciseSlice";
import type { ExerciseFilter } from "../../types/excercise";
import { getDeadlineText, isOverdue } from "../../utils/excercise";
import ExerciseListContext, {
  useExerciseListContext,
} from "./ExcerciseListText";
import { usePinStore } from "../../hooks/usePinStore";

interface ExerciseListProps {
  children: ReactNode;
}

const ExerciseList = ({ children }: ExerciseListProps) => {
  const dispatch = useAppDispatch();
  const { exercises, filter, loading, error } = useAppSelector(
    (state) => state.exercises
  );

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const filteredExercises = exercises.filter((exercise) => {
    switch (filter) {
      case "COMPLETED":
        return exercise.excerciseStatus === "COMPLETED";
      case "PENDING":
        return exercise.excerciseStatus === "PENDING";
      case "OVERDUE":
        return isOverdue(exercise);
      case "ALL":
      default:
        return true;
    }
  });

  return (
    <ExerciseListContext.Provider
      value={{
        exercises,
        filteredExercises,
        loading,
        error,
        filter,
        setFilter: (nextFilter: ExerciseFilter) => {
          dispatch(setFilterAction(nextFilter));
        },
        addExercise: (data) => {
          dispatch(addExerciseAction(data));
        },
        toggleComplete: (id) => {
          dispatch(toggleCompleteAction(id));
        },
        deleteExercise: (id) => {
          dispatch(deleteExerciseAction(id));
        },
      }}
    >
      {children}
    </ExerciseListContext.Provider>
  );
};

/* ── Filter Bar ── */
ExerciseList.Filter = () => {
  const { filter, setFilter } = useExerciseListContext();

  const filters: { label: string; value: ExerciseFilter }[] = [
    { label: "Tất cả",           value: "ALL" },
    { label: "Chưa hoàn thành", value: "PENDING" },
    { label: "Quá hạn",         value: "OVERDUE" },
    { label: "Đã hoàn thành",   value: "COMPLETED" },
  ];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${filter === f.value ? "active" : ""}`}
          disabled={filter === f.value}
          onClick={() => setFilter(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

/* ── Exercise Items ── */
ExerciseList.Items = () => {
  const { filteredExercises, loading, error, toggleComplete, deleteExercise, filter } =
    useExerciseListContext();
  
  const { isPinned, togglePin } = usePinStore();

  if (loading) return <p className="loading-state">Đang tải danh sách bài tập...</p>;
  if (error)   return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  if (filteredExercises.length === 0) {
    return (
      <div className="empty-state">
        <p>Không có bài tập nào phù hợp!</p>
      </div>
    );
  }

  const sortedExercises = [...filteredExercises].sort((a, b) => {
    const pinA = isPinned(a.id) ? 1 : 0;
    const pinB = isPinned(b.id) ? 1 : 0;
    return pinB - pinA;
  });

  const getBadgeClass = (status: string) => {
    if (status === "COMPLETED") return "badge badge-completed";
    if (status === "OVERDUE")   return "badge badge-overdue";
    return "badge badge-pending";
  };

  const translateStatus = (status: string) => {
    if (status === "COMPLETED") return "Đã hoàn thành";
    if (status === "OVERDUE")   return "Quá hạn";
    return "Chưa hoàn thành";
  };

  const getPriorityClass = (priority: string) => {
    if (priority === "HIGH")   return "priority-badge priority-high";
    if (priority === "MEDIUM") return "priority-badge priority-medium";
    return "priority-badge priority-low";
  };

  const getPriorityLabel = (priority: string) => {
    if (priority === "HIGH")   return "Cao";
    if (priority === "MEDIUM") return "Trung bình";
    return "Thấp";
  };

  return (
    <div className="exercise-list" key={filter}>
      {sortedExercises.map((exercise) => (
        <div key={exercise.id} className={`exercise-card ${isPinned(exercise.id) ? "pinned" : ""}`}>
          <div className="card-top">
            <span className="card-subject">
              {isPinned(exercise.id) && <span style={{marginRight: 4}}>📌</span>}
              {exercise.subject}
            </span>
            <span className={getBadgeClass(exercise.excerciseStatus)}>
              {translateStatus(exercise.excerciseStatus)}
            </span>
          </div>

          {/* Checkbox + tên bài tập */}
          <label className="card-name-row">
            <input
              type="checkbox"
              className="card-checkbox"
              checked={exercise.excerciseStatus === "COMPLETED"}
              onChange={() => toggleComplete(exercise.id)}
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
            <button
              className="btn"
              onClick={() => togglePin(exercise.id)}
            >
              {isPinned(exercise.id) ? "Bỏ ghim" : "Ghim"}
            </button>
            <button
              className="btn btn-delete"
              onClick={() => deleteExercise(exercise.id)}
            >
              Xoá
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
