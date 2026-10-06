import exerciseReducer, { addExercise, setFilter, toggleComplete } from './exerciseSlice';
import { ExcerciseStatus, Priority, type createExercise } from '../../types/excercise';

describe('exerciseSlice', () => {
  const initialState = {
    exercises: [],
    loading: false,
    error: '',
    filter: 'ALL' as const,
  };

  it('should handle addExercise', () => {
    const newExercise: createExercise = {
      subject: 'Toán',
      name: 'Bài tập 1',
      deadline: '2025-10-10',
      priority: Priority.HIGH,
    };
    
    const state = exerciseReducer(initialState, addExercise(newExercise));
    expect(state.exercises.length).toBe(1);
    expect(state.exercises[0].name).toBe('Bài tập 1');
    expect(state.exercises[0].excerciseStatus).toBe(ExcerciseStatus.PENDING);
  });
});
