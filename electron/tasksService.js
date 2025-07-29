const fs = require("fs");
const path = require("path");

const dataDir = path.join(process.cwd(), "data");
const DATA_FILE_PATH = path.join(dataDir, "tasks.json");

function ensureDataDirExists() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
  } catch (e) {
    console.error("Error ensuring data directory exists:", e);
    throw e;
  }
}

function readTasksFromFile() {
  try {
    ensureDataDirExists();
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(DATA_FILE_PATH, { encoding: "utf8" });
    const tasks = JSON.parse(data);
    return tasks.map((task) => ({
      ...task,
      taskDate: new Date(task.taskDate),
    }));
  } catch (e) {
    console.error("Error reading tasks:", e);
    throw e;
  }
}

function writeTasksToFile(tasks) {
  try {
    ensureDataDirExists();
    const dataToSave = tasks.map((task) => ({
      ...task,
      taskDate: task.taskDate.toISOString(),
    }));
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(dataToSave, null, 2));
  } catch (e) {
    console.error("Error writing tasks:", e);
    throw e;
  }
}

function filterTasks({ completed, level, sortByDate }) {
  try {
    let tasks = readTasksFromFile();

    if (typeof completed === "boolean") {
      tasks = tasks.filter((t) => t.completed === completed);
    }

    if (level) {
      tasks = tasks.filter((t) => t.level === level);
    }

    if (sortByDate === "asc") {
      tasks.sort((a, b) => a.taskDate.getTime() - b.taskDate.getTime());
    } else if (sortByDate === "desc") {
      tasks.sort((a, b) => b.taskDate.getTime() - a.taskDate.getTime());
    }

    return tasks;
  } catch (e) {
    console.error("Error filtering tasks:", e);
    throw e;
  }
}

function getTaskById(taskId) {
  try {
    const tasks = readTasksFromFile();
    return tasks.find((t) => t.id === taskId) || null;
  } catch (e) {
    console.error(`Error getting task by ID (${taskId}):`, e);
    throw e;
  }
}

function addTask(task) {
  try {
    const tasks = readTasksFromFile();
    tasks.push(task);
    writeTasksToFile(tasks);
    return task;
  } catch (e) {
    console.error("Error adding task:", e);
    throw e;
  }
}

function updateTask(updatedTask) {
  try {
    const tasks = readTasksFromFile();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      writeTasksToFile(tasks);
      return true;
    }
    return false;
  } catch (e) {
    console.error("Error updating task:", e);
    throw e;
  }
}

function deleteTask(taskId) {
  try {
    let tasks = readTasksFromFile();
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      writeTasksToFile(tasks);
      return true;
    }
    return false;
  } catch (e) {
    console.error("Error deleting task:", e);
    throw e;
  }
}

module.exports = {
  readTasksFromFile,
  writeTasksToFile,
  filterTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};