import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddExerciseForm from './AddExerciseForm';
import ExerciseListContext from './ExcerciseListText';

describe('AddExerciseForm Component', () => {
  it('allows user to submit a new exercise', async () => {
    const mockAddExercise = jest.fn();
    const user = userEvent.setup();

    render(
      <ExerciseListContext.Provider value={{ addExercise: mockAddExercise } as any}>
        <AddExerciseForm />
      </ExerciseListContext.Provider>
    );

    // Open modal
    const openBtn = screen.getByText('+ Thêm bài tập');
    await user.click(openBtn);

    // Fill form
    await user.type(screen.getByLabelText(/môn học/i), 'Vật Lý');
    await user.type(screen.getByLabelText(/tên bài tập/i), 'Bài tập 2');
    await user.type(screen.getByLabelText(/deadline/i), '2025-01-01T12:00');

    // Submit
    const submitBtn = screen.getByRole('button', { name: 'Thêm bài tập' });
    await user.click(submitBtn);

    expect(mockAddExercise).toHaveBeenCalledWith(expect.objectContaining({
      subject: 'Vật Lý',
      name: 'Bài tập 2',
      deadline: '2025-01-01T12:00'
    }));
  });
});
