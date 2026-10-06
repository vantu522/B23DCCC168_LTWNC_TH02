import "./App.css";
import AddExerciseForm from "./components/Exercise/AddExerciseForm";
import ExerciseList from "./components/Exercise/ExcerciseList";

function App() {
  return (
    <ExerciseList>
      <div className="app-wrapper">
        <header className="app-header">
          <h1>Student <span>Deadline</span> Tracker</h1>
          <AddExerciseForm />
        </header>

        <ExerciseList.Filter />
        <ExerciseList.Items />
      </div>
    </ExerciseList>
  );
}

export default App;
