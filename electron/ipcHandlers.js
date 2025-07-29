const { ipcMain } = require("electron");
const tasksService = require("./tasksService");

function registerIpcHandlers() {
  ipcMain.handle("get-tasks", () => {
    try {
      return tasksService.readTasksFromFile();
    } catch (error) {
      console.error("Error in get-tasks:", error);
      throw new Error("Failed to get tasks.");
    }
  });

  ipcMain.handle("filter-tasks", (event, filterParams) => {
    try {
      return tasksService.filterTasks(filterParams);
    } catch (error) {
      console.error("Error in filter-tasks:", error);
      throw new Error("Failed to filter tasks.");
    }
  });

  ipcMain.handle("get-task-by-id", (event, taskId) => {
    try {
      return tasksService.getTaskById(taskId);
    } catch (error) {
      console.error("Error in get-task-by-id:", error);
      throw new Error("Failed to get task by ID.");
    }
  });

  ipcMain.handle("add-task", (event, task) => {
    try {
      return tasksService.addTask(task);
    } catch (error) {
      console.error("Error in add-task:", error);
      throw new Error("Failed to add task.");
    }
  });

  ipcMain.handle("update-task", (event, updatedTask) => {
    try {
      return tasksService.updateTask(updatedTask);
    } catch (error) {
      console.error("Error in update-task:", error);
      throw new Error("Failed to update task.");
    }
  });

  ipcMain.handle("delete-task", (event, taskId) => {
    try {
      return tasksService.deleteTask(taskId);
    } catch (error) {
      console.error("Error in delete-task:", error);
      throw new Error("Failed to delete task.");
    }
  });
}

module.exports = { registerIpcHandlers };