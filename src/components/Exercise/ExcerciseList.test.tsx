import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../../features/exercises/exerciseSlice';
import ExcerciseList from './ExcerciseList';
import * as api from '../../services/exerciseApi';

jest.mock('../../services/exerciseApi');

describe('ExcerciseList Async Tests', () => {
  const createTestStore = () => configureStore({
    reducer: { exercises: exerciseReducer }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially and then success state', async () => {
    (api.getExercises as jest.Mock).mockResolvedValue({
      data: [{ id: 1, name: 'Api Exercise', subject: 'Math', excerciseStatus: 'PENDING', priority: 'HIGH', deadline: '2025-01-01' }]
    });

    const store = createTestStore();

    render(
      <Provider store={store}>
        <ExcerciseList>
          <ExcerciseList.Items />
        </ExcerciseList>
      </Provider>
    );

    // Initial loading
    expect(screen.getByText('Đang tải danh sách bài tập...')).toBeInTheDocument();

    // Success state
    await waitFor(() => {
      expect(screen.getByText('Api Exercise')).toBeInTheDocument();
    });
  });

  it('shows error state when API fails', async () => {
    (api.getExercises as jest.Mock).mockRejectedValue(new Error('API failed'));

    const store = createTestStore();

    render(
      <Provider store={store}>
        <ExcerciseList>
          <ExcerciseList.Items />
        </ExcerciseList>
      </Provider>
    );

    // Initial loading
    expect(screen.getByText('Đang tải danh sách bài tập...')).toBeInTheDocument();

    // Error state
    await waitFor(() => {
      expect(screen.getByText('Khong the tai danh sach bai tap')).toBeInTheDocument();
    });
  });
});
