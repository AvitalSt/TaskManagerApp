import { Task } from "../models/Task";

const getApi = () => {
  const api = window.api;
  if (!api) throw new Error("window.api is undefined");
  return api;
};

export const filterTasks = async (params: {completed?: boolean; level?: "low" | "medium" | "high"; sortByDate?: "asc" | "desc";}): Promise<Task[]> => {
  try {
    const api = getApi();
    return await api.filterTasks(params);
  } catch (error) {
    console.error("Error filtering tasks:", error);
    throw error;
  }
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const api = getApi();
    return await api.getTasks();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getTaskById = async (id: string): Promise<Task | null> => {
  try {
    const api = getApi();
    return await api.getTaskById(id);
  } catch (error) {
    console.error(`Error fetching task by ID (${id}):`, error);
    throw error;
  }
};

export const addTask = async (task: Task): Promise<void> => {
  try {
    const api = getApi();
    await api.addTask(task);
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (task: Task): Promise<void> => {
  try {
    const api = getApi();
    await api.updateTask(task);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    const api = getApi();
    await api.deleteTask(id);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
