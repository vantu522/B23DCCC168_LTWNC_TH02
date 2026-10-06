import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from '../features/exercises/exerciseSlice'
import { logger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    exercises: exerciseReducer
  },
  middleware: (getDefaultMiddleware) => 
    import.meta.env.DEV 
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("deadline_tracker_data", JSON.stringify(state.exercises.exercises));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;