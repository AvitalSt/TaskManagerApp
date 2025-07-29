import React from "react";
import { Task } from "../models/Task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

export default function TaskList({tasks,onEdit,onDelete,onToggleComplete}: TaskListProps) {
  return (
    <>
      <div className="task-list-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </>
  );
}
