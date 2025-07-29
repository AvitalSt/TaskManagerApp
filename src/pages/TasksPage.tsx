import React from "react";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function TasksPage() {
  const {tasks,filter,setFilter,loading,error,applyFilter,handleDelete,handleToggleComplete,} = useTasks();
  const navigate = useNavigate();

  return (
    <div>
      <button className="add-task-button" onClick={() => navigate("/add")}>
        Add task
      </button>

      {loading && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <ClipLoader color="#7cb8f9" loading={loading} size={50} />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && tasks.length === 0 && <p>No tasks to display</p>}

      <h1>Task management</h1>

      <TaskFilters
        filter={filter}
        onFilterChange={(newFilter) => setFilter((prev) => ({ ...prev, ...newFilter }))}
        onApplyFilter={applyFilter}
      />

      {!loading && !error && tasks.length > 0 && (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={(task) => navigate(`/edit/${task.id}`)}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
}
