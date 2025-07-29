import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../models/Task";
import { addTask, updateTask, getTaskById } from "../services/tasksService";

export function useAddEditTask() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getTaskById(id)
        .then((task) => {
          if (!task) {
            setError("Task not found");
          } else {
            setTask(task);
          }
        })
        .catch(() => setError("Error loading task"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = async (taskToSave: Task) => {
    try {
      if (id) {
        await updateTask(taskToSave);
      } else {
        await addTask(taskToSave);
      }
      navigate("/");
    } catch {
      setError("Error saving task");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return {
    task,
    loading,
    error,
    handleSave,
    handleCancel,
  };
}