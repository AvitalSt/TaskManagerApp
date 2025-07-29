import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import AddEditTaskPage from "./pages/AddEditTaskPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/add" element={<AddEditTaskPage />} />
        <Route path="/edit/:id" element={<AddEditTaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
