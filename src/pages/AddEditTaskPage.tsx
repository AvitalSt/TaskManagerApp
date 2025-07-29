import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import TaskForm from "../components/TaskForm";
import { useAddEditTask } from "../hooks/useAddEditTask";

export default function AddEditTaskPage() {
  const { task, loading, error, handleSave, handleCancel } = useAddEditTask();

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <ClipLoader color="#7cb8f9" loading={loading} size={50} />
      </div>
    );

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1 className="task-form-title">{task ? "Edit task" : "Add new task"}</h1>
      <TaskForm
        initialTask={task ?? undefined}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}