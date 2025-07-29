import React from "react";
import { Task } from "../models/Task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
}

export default function TaskCard({task,onEdit,onDelete,onToggleComplete,}: TaskCardProps) {
  const priorityColor =task.level === "high" ? "red" : task.level === "medium" ? "orange" : "green";

  return (
    <div className="task-card border p-4 rounded shadow-md">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline:{task.taskDate.toLocaleDateString("en-GB")}</p>
      <p style={{ color: priorityColor }}>Priority: {task.level}</p>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
          style={{ marginRight: "5px" }}
        />
        Completed
      </label>

      <div className="flex gap-2 mt-2">
        <button className="btn-update" onClick={() => onEdit(task)}>Update</button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
