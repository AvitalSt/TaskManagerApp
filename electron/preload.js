const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  filterTasks: (params) => ipcRenderer.invoke('filter-tasks', params),
  getTaskById: (id) => ipcRenderer.invoke('get-task-by-id', id),
  addTask: (task) => ipcRenderer.invoke('add-task', task),
  updateTask: (task) => ipcRenderer.invoke('update-task', task),
  deleteTask: (id) => ipcRenderer.invoke('delete-task', id),
});
