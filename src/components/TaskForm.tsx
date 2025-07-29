import React, { useState, useEffect } from "react";
import { Task } from "../models/Task";
import { validateTask } from "../utils/validation";

interface TaskFormProps {
  initialTask?: Task;
  onSave: (task: Task) => void;
  onCancel?: () => void;
}

export default function TaskForm({
  initialTask,
  onSave,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || ""
  );
  const [taskDate, setTaskDate] = useState(
    initialTask ? initialTask.taskDate.toISOString().slice(0, 10) : ""
  );
  const [level, setLevel] = useState<"low" | "medium" | "high">(
    initialTask?.level || "low"
  );
  const [completed, setCompleted] = useState(initialTask?.completed || false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setTitle(initialTask?.title || "");
    setDescription(initialTask?.description || "");
    setTaskDate(
    initialTask
      ? initialTask.taskDate.toISOString().slice(0, 10)
      : ""
    );
    setLevel(initialTask?.level || "low");
    setCompleted(initialTask?.completed || false);
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskToValidate: Partial<Task> = {
      title,
      description,
      taskDate: new Date(taskDate),
      level,
      completed,
    };

    const error = validateTask(taskToValidate);

    if (error) {
      setErrors({ general: error });
      return;
    }

    const task: Task = {
      id: initialTask?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      taskDate: new Date(taskDate),
      level,
      completed,
    };

    setErrors({});
    onSave(task);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
      </div>

      <div>
        <label>Date:</label>
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        {errors.taskDate && (
          <p style={{ color: "red" }}>{errors.taskDate}</p>
        )}
      </div>

      <div>
        <label>Priority:</label>
        <select
          value={level}
          onChange={(e) =>
            setLevel(e.target.value as "low" | "medium" | "high")
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

      <div>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
      </div>

      <div className="flex gap-2">
        <button type="submit">Save</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
