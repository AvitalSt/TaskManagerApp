import { useState, useEffect } from "react";
import { Task } from "../models/Task";
import { getTasks, filterTasks, deleteTask, updateTask } from "../services/tasksService";

export type FilterType = {
  completed?: boolean;
  level?: "low" | "medium" | "high";
  sortByDate?: "asc" | "desc";
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = async () => {
    setLoading(true);
    setError(null);

    const cleanedFilter: FilterType = {
      completed: filter.completed,
      level: filter.level || undefined,
      sortByDate: filter.sortByDate || undefined,
    };

    try {
      const filtered = await filterTasks(cleanedFilter);
      setTasks(filtered);
    } catch (e) {
      setError("Failed to apply filters");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(updatedTask);
      await loadTasks();
    } catch (err) {
      setError("Failed to update task completion");
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    filter,
    setFilter,
    loading,
    error,
    applyFilter,
    handleDelete,
    handleToggleComplete,
  };
}
