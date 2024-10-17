# Electron.js To-Do List Application

## Description:
This project is a **To-Do List Application** built using **Electron.js** and **React.js**, styled with custom CSS. The app allows users to manage their tasks by adding, editing, and deleting them. Users can also upload a `.txt` file with tasks, and download the updated file after modifying the task list. The Electron main process handles file operations like opening and saving files.

## Features:
- **Add Tasks**: Users can add new tasks to the list using an input field.
- **Edit Tasks**: Each task can be edited after it is added.
- **Delete Tasks**: Tasks can be deleted individually from the list.
- **Upload .txt Files**: Users can upload a `.txt` file containing tasks. The tasks are read and displayed in the app.
- **Download Updated .txt File**: Users can download the task list as a `.txt` file, reflecting any additions, edits, or deletions.
  
---

## Technologies Used:
- **Electron.js**: To create the desktop application and handle the main process (file uploads/downloads).
- **React.js**: For building the interactive user interface and managing the application state.
- **Custom CSS**: For styling the components and creating a clean, dark-themed UI.

---

## Project Structure Overview:

### 1. `main.ts` (Electron Main Process):
   - The **main process** in Electron is handled by `main.ts`. This script is responsible for creating and managing the main application window using Electron's `BrowserWindow`.
   - File operations such as **opening a `.txt` file** and **updating the file** are handled here:
     - **Upload**: Opens a dialog to let users choose a `.txt` file, reads the file, and sends the content back to the React app.
     - **Download**: Updates the content of the uploaded file whenever tasks are modified in the React app.
     - Handles communication between the Electron main process and the React renderer process via **IPC (Inter-Process Communication)**.

### 2. `App.tsx` (React Entry Point):
   - This file acts as the entry point for the React application.
   - It contains the logic for:
     - **Displaying tasks**.
     - **Adding, editing, and deleting tasks**.
     - **Uploading and downloading task files**.
   - The state of the app is managed using React’s `useState` and `useEffect` hooks. The file path, content, and task list are stored and updated dynamically.

### 3. `Task Component` (Task Management):
   - The **task management system** in the app allows users to:
     - **Add a task**: Input a task and add it to the list by clicking the "Add Task" button.
     - **Edit a task**: Modify any task by clicking an "Edit" button next to it, allowing users to update the task in real-time.
     - **Delete a task**: Remove tasks individually by clicking the "Delete" button.
     - **View all tasks**: Tasks are displayed in a scrollable list, making the interface clean and organized.

### 4. **File Actions**:
   - **Upload .txt Files**: 
     - A `.txt` file containing a list of tasks can be uploaded using the **"Upload .txt File"** button. The contents are parsed and shown in the app’s task list.
   - **Download Updated Files**:
     - After tasks are added, edited, or deleted, users can download the updated task list as a `.txt` file using the **"Download Updated File"** button. The file is saved locally with the changes.

---

## Key Concepts:

1. **Electron's Main and Renderer Process**:
   - **Main Process**: Handles the window creation, file operations (uploading/downloading `.txt` files), and communication between the operating system and the app.
   - **Renderer Process**: Runs the React app, managing the user interface and interactions, such as adding/editing tasks.

2. **Task Management**:
   - **State Management**: React’s `useState` hook manages the array of tasks. The list updates dynamically as tasks are added, edited, or removed.
   - **File Handling**: React communicates with the Electron main process via IPC to handle file uploads and downloads.

3. **UI and Styling**:
   - The app uses a dark-themed UI with buttons styled in gray, providing a modern and sleek interface.
   - Each task has **Edit** and **Delete** buttons, which allow quick and easy management of the task list.

---

## How to Run the Application:

1. Clone the repository:
   ```bash
   git clone https://github.com/shantanutewari12/Electron.js.git
