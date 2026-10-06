import { createContext, useContext } from "react";
import type { createExercise, Exercise, ExerciseFilter } from "../../types/excercise";

interface ExerciseListContextType {
  exercises: Exercise[];
  filteredExercises: Exercise[];
  loading: boolean;
  error: string;
  filter: ExerciseFilter;
  setFilter: (filter: ExerciseFilter) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleComplete: (id: number) => void;
  deleteExercise: (id: number) => void;
  addExercise: (data: createExercise) => void;
  addMultipleExercises: (data: createExercise[]) => void;
}

const ExerciseListContext = createContext<ExerciseListContextType | null>(null);

export const useExerciseListContext = () => {
  const context = useContext(ExerciseListContext);

  if (!context) {
    throw new Error(
      "useExerciseListContext phải được sử dụng bên trong ExerciseList",
    );
  }

  return context;
};

export default ExerciseListContext;
