import { Task } from "../models/Task";

export function validateTask(task: Partial<Task>): string | null {
  if (!task.title || task.title.trim() === "") {
    return "Title is required.";
  }

  if (!task.description || task.description.trim() === "") {
    return "Description is required.";
  }

  if (!(task.taskDate instanceof Date) || isNaN(task.taskDate.getTime())) {
    return "Task date is required and must be valid.";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDate = new Date(task.taskDate);
  taskDate.setHours(0, 0, 0, 0);

  if (taskDate < today) {
    return "Task date is required and must be valid.";
  }
  
  return null;
}