import { useEffect, useState, useCallback, useMemo, type ReactNode } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { List } from 'react-window';

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addExercise as addExerciseAction,
  addMultipleExercises as addMultipleExercisesAction,
  deleteExercise as deleteExerciseAction,
  fetchExercises,
  setFilter as setFilterAction,
  toggleComplete as toggleCompleteAction,
} from "../../features/exercises/exerciseSlice";
import type { ExerciseFilter, createExercise, Exercise } from "../../types/excercise";
import { isOverdue } from "../../utils/excercise";
import ExerciseListContext, {
  useExerciseListContext,
} from "./ExcerciseListText";
import { usePinStore } from "../../hooks/usePinStore";
import AssignmentCard from "./AssignmentCard";

interface ExerciseListProps {
  children: ReactNode;
}

const ExerciseList = ({ children }: ExerciseListProps) => {
  const dispatch = useAppDispatch();
  const { exercises, filter, loading, error } = useAppSelector(
    (state) => state.exercises
  );

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      let matchesFilter: boolean;
      switch (filter) {
        case "COMPLETED":
          matchesFilter = exercise.excerciseStatus === "COMPLETED"; break;
        case "PENDING":
          matchesFilter = exercise.excerciseStatus === "PENDING"; break;
        case "OVERDUE":
          matchesFilter = isOverdue(exercise); break;
        case "ALL":
        default:
          matchesFilter = true; break;
      }

      const matchesSearch = 
        exercise.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        exercise.subject.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [exercises, filter, debouncedSearchTerm]);

  const setFilter = useCallback((nextFilter: ExerciseFilter) => {
    dispatch(setFilterAction(nextFilter));
  }, [dispatch]);

  const addExercise = useCallback((data: createExercise) => {
    dispatch(addExerciseAction(data));
  }, [dispatch]);

  const addMultipleExercises = useCallback((data: createExercise[]) => {
    dispatch(addMultipleExercisesAction(data));
  }, [dispatch]);

  const toggleComplete = useCallback((id: number) => {
    dispatch(toggleCompleteAction(id));
  }, [dispatch]);

  const deleteExercise = useCallback((id: number) => {
    dispatch(deleteExerciseAction(id));
  }, [dispatch]);

  const contextValue = useMemo(() => ({
    exercises,
    filteredExercises,
    loading,
    error,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    addExercise,
    addMultipleExercises,
    toggleComplete,
    deleteExercise,
  }), [
    exercises, filteredExercises, loading, error, filter, searchTerm,
    setFilter, addExercise, addMultipleExercises, toggleComplete, deleteExercise
  ]);

  return (
    <ExerciseListContext.Provider value={contextValue}>
      {children}
    </ExerciseListContext.Provider>
  );
};

/* ── Search Bar ── */
function SearchBar() {
  const { searchTerm, setSearchTerm } = useExerciseListContext();

  return (
    <div className="search-bar" style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="🔍 Tìm kiếm bài tập..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Tìm kiếm bài tập"
        style={{
          width: "100%",
          padding: "0.6rem 1rem",
          borderRadius: "8px",
          border: "1.5px solid var(--border-color, #94a3b8)",
          background: "var(--card-bg, white)",
          color: "var(--text-color, #1e293b)",
          outline: "none"
        }}
      />
    </div>
  );
}
ExerciseList.Search = SearchBar;

/* ── Filter Bar ── */
function FilterBar() {
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
}
ExerciseList.Filter = FilterBar;


/* ── Exercise Items ── */
interface MyRowData {
  exercises: Exercise[];
  isPinned: (id: number) => boolean;
  togglePin: (id: number) => void;
  toggleComplete: (id: number) => void;
  deleteExercise: (id: number) => void;
}

function ItemsList() {
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

  const rowProps: MyRowData = {
    exercises: sortedExercises,
    isPinned,
    togglePin,
    toggleComplete,
    deleteExercise,
  };

  const Row = ({ index, style, exercises, isPinned, togglePin, toggleComplete, deleteExercise }: MyRowData & { index: number, style: React.CSSProperties }) => {
    const exercise = exercises[index];
    return (
      <div style={{ ...style, paddingBottom: '1rem' }}>
        <AssignmentCard 
          exercise={exercise} 
          isPinned={isPinned(exercise.id)} 
          togglePin={togglePin} 
          toggleComplete={toggleComplete} 
          deleteExercise={deleteExercise} 
        />
      </div>
    );
  };

  return (
    <div className="exercise-list" key={filter}>
      <List<MyRowData>
        rowCount={sortedExercises.length}
        rowHeight={140}
        rowProps={rowProps}
        rowComponent={Row as any}
        style={{ height: 600, width: "100%" }}
      />
    </div>
  );
}
ExerciseList.Items = ItemsList;

export default ExerciseList;
