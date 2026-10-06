import React, { useState, Suspense } from "react";
import "./App.css";
import AddExerciseForm from "./components/Exercise/AddExerciseForm";
import ExerciseList from "./components/Exercise/ExcerciseList";
import { useTheme } from "./contexts/ThemeContext";

import { useExerciseListContext } from "./components/Exercise/ExcerciseListText";
import { Priority } from "./types/excercise";

// Tải lười Component Thống kê
const Statistics = React.lazy(() => import("./components/Statistics/Statistics"));

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <select 
      className="theme-select"
      value={theme} 
      onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
      aria-label="Chọn giao diện"
    >
      <option value="light">☀️ Giao diện Sáng</option>
      <option value="dark">🌙 Giao diện Tối</option>
    </select>
  );
}

function StressTestButton() {
  const { addMultipleExercises } = useExerciseListContext();
  
  const handleStressTest = () => {
    const dummyData = Array.from({ length: 10000 }).map((_, index) => ({
      subject: `Môn học ${index}`,
      name: `Bài tập Stress Test ${index}`,
      deadline: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
      priority: Priority.LOW,
    }));
    addMultipleExercises(dummyData);
  };

  return (
    <button 
      className="btn-add" 
      style={{ backgroundColor: "#dc2626" }} 
      onClick={handleStressTest}
    >
      🚀 Stress Test (10k)
    </button>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');

  return (
    <ExerciseList>
      <div className="app-wrapper">
        <header className="app-header">
          <h1>Student <span>Deadline</span> Tracker</h1>
          <div className="header-actions">
            <StressTestButton />
            <ThemeToggle />
            <AddExerciseForm />
          </div>
        </header>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color, #e2e8f0)' }}>
          <button 
            onClick={() => setActiveTab('list')}
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: 'transparent', 
              border: 'none', 
              borderBottom: activeTab === 'list' ? '3px solid #3b82f6' : '3px solid transparent',
              color: activeTab === 'list' ? '#3b82f6' : 'var(--text-color, #64748b)',
              fontWeight: activeTab === 'list' ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            📋 Danh sách bài tập
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: 'transparent', 
              border: 'none', 
              borderBottom: activeTab === 'stats' ? '3px solid #3b82f6' : '3px solid transparent',
              color: activeTab === 'stats' ? '#3b82f6' : 'var(--text-color, #64748b)',
              fontWeight: activeTab === 'stats' ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            📊 Thống kê tổng quan
          </button>
        </div>

        {activeTab === 'stats' ? (
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Đang tải dữ liệu thống kê...</div>}>
            <Statistics />
          </Suspense>
        ) : (
          <>
            <ExerciseList.Search />
            <ExerciseList.Filter />
            <ExerciseList.Items />
          </>
        )}
      </div>
    </ExerciseList>
  );
}

export default App;
