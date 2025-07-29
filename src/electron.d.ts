import { Task } from "../models/Task";

declare global {
  interface Window {
    api: {
      filterTasks: (params: { completed?: boolean; level?: 'low' | 'medium' | 'high'; sortByDate?: 'asc' | 'desc' }) => Promise<Task[]>;
      getTasks: () => Promise<Task[]>;
      getTaskById: (id: string) => Promise<Task | null>;
      addTask: (task: Task) => Promise<Task>;
      updateTask: (task: Task) => Promise<boolean>;
      deleteTask: (id: string) => Promise<boolean>;
    };
  }
}