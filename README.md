# TaskManagerApp

## Application Description
TaskManagerApp is a simple and user-friendly desktop task management application built with React and Electron. It allows users to create, edit, delete, and filter tasks by date, importance level, and completion status. All data is saved locally in a JSON file, ensuring complete privacy and enabling full offline functionality.

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AvitalSt/TaskManagerApp.git
   cd TaskManagerApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Build Instructions

### Development
To run the application in development mode:
```bash
npm run dev
```

### Production
To build the application for production:
```bash
npm run build
npm run electron-pack
```

## Architectural Decisions

- Built using **Electron** for a cross-platform desktop environment.
- User interface implemented with **React** for a responsive and dynamic experience.
- Developed in **TypeScript** to ensure type safety and maintainable code.
- The codebase is modular, separating business logic (services, hooks), UI components, and Electron-specific code.
- State management is handled through custom React hooks for clarity and reusability.
- Task data is persisted locally in a JSON file, enabling offline functionality without external databases.
- Inter-process communication (IPC) is used for secure and efficient messaging between Electron's main and renderer processes.
- Error handling and asynchronous operations are carefully managed to ensure reliability and good user experience.

## Known Limitations

- No sync between devices (data is local only).