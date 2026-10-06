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

  it('should handle setFilter', () => {
    const state = exerciseReducer(initialState, setFilter('COMPLETED'));
    expect(state.filter).toBe('COMPLETED');
  });

  it('should handle toggleComplete', () => {
    const stateWithExercise = {
      ...initialState,
      exercises: [{ 
        id: 1, 
        name: 'Test', 
        excerciseStatus: ExcerciseStatus.PENDING, 
        subject: 'Math', 
        deadline: '2025-01-01', 
        priority: Priority.HIGH, 
        createdAt: new Date() 
      }]
    };
    const state = exerciseReducer(stateWithExercise, toggleComplete(1));
    expect(state.exercises[0].excerciseStatus).toBe(ExcerciseStatus.COMPLETED);
  });
});
