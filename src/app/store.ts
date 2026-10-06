import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from '../features/exercises/exerciseSlice'
export const store = configureStore({
  reducer: {
    exercises: exerciseReducer
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("deadline_tracker_data", JSON.stringify(state.exercises.exercises));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;