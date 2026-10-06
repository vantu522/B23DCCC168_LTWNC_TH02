import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getExercises } from "../../services/exerciseApi";
import {
  ExcerciseStatus,
  type createExercise,
  type Exercise,
  type ExerciseFilter,
} from "../../types/excercise";

interface ExerciseState {
  exercises: Exercise[];
  loading: boolean;
  error: string;
  filter: ExerciseFilter;
}

const initialState: ExerciseState = {
  exercises: [],
  loading: false,
  error: "",
  filter: "ALL",
};

export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async () => {
    const localData = localStorage.getItem("deadline_tracker_data");
    if (localData && localData !== "[]") {
      return JSON.parse(localData) as Exercise[];
    }
    
    const response = await getExercises();
    return response.data;
  },
);

const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<ExerciseFilter>) => {
      state.filter = action.payload;
    },

    addExercise: (state, action: PayloadAction<createExercise>) => {
      const maxId = state.exercises.length
        ? Math.max(...state.exercises.map((exercise) => exercise.id))
        : 0;

      const newExercise: Exercise = {
        ...action.payload,
        id: maxId + 1,
        excerciseStatus: ExcerciseStatus.PENDING,
        createdAt: new Date(),
      };

      state.exercises.unshift(newExercise); // thêm vào đầu danh sách
    },

    toggleComplete: (state, action: PayloadAction<number>) => {
      const exercise = state.exercises.find(
        (item) => item.id === action.payload,
      );

      if (exercise) {
        exercise.excerciseStatus =
          exercise.excerciseStatus === ExcerciseStatus.PENDING
            ? ExcerciseStatus.COMPLETED
            : ExcerciseStatus.PENDING;
      }
    },

    deleteExercise: (state, action: PayloadAction<number>) => {
      state.exercises = state.exercises.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state) => {
        state.loading = false;
        state.error = "Khong the tai danh sach bai tap";
      });
  },
});

export const {
  addExercise,
  deleteExercise,
  setFilter,
  toggleComplete,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
