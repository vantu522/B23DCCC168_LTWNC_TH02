import { render, screen, fireEvent } from '@testing-library/react';
import AssignmentCard from './AssignmentCard';
import { ExcerciseStatus, Priority } from '../../types/excercise';

describe('AssignmentCard Component', () => {
  const mockExercise = {
    id: 1,
    name: 'Test Exercise',
    subject: 'Math',
    deadline: new Date().toISOString(),
    priority: Priority.HIGH,
    excerciseStatus: ExcerciseStatus.PENDING,
    createdAt: new Date(),
  };

  const mockToggleComplete = jest.fn();
  const mockTogglePin = jest.fn();
  const mockDelete = jest.fn();

  it('renders correctly', () => {
    render(
      <AssignmentCard 
        exercise={mockExercise} 
        isPinned={false}
        togglePin={mockTogglePin}
        toggleComplete={mockToggleComplete}
        deleteExercise={mockDelete}
      />
    );
    expect(screen.getByText('Test Exercise')).toBeInTheDocument();
    expect(screen.getByText('Math')).toBeInTheDocument(); // text is 'Math' but CSS makes it uppercase
  });

  it('calls toggleComplete when checkbox is clicked', () => {
    render(
      <AssignmentCard 
        exercise={mockExercise} 
        isPinned={false}
        togglePin={mockTogglePin}
        toggleComplete={mockToggleComplete}
        deleteExercise={mockDelete}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleComplete).toHaveBeenCalledWith(1);
  });

  it('calls togglePin when Ghim button is clicked', () => {
    render(
      <AssignmentCard 
        exercise={mockExercise} 
        isPinned={false}
        togglePin={mockTogglePin}
        toggleComplete={mockToggleComplete}
        deleteExercise={mockDelete}
      />
    );
    const pinBtn = screen.getByText('Ghim');
    fireEvent.click(pinBtn);
    expect(mockTogglePin).toHaveBeenCalledWith(1);
  });
});
