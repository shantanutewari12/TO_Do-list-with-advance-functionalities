import { useState, useEffect } from 'react';
import './App.css';

function App(): JSX.Element {
  const [tasks, setTasks] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  useEffect(() => {
    if (filePath) {
      const updatedContent = tasks.join('\n');
      window.electron.ipcRenderer.send('update-txt-file', { path: filePath, content: updatedContent });
    }
  }, [tasks, filePath]);

  const addTask = (task: string) => {
    if (editingIndex !== null) {
      editTask(editingIndex, task);
    } else {
      setTasks([...tasks, task]);
    }
    setEditingIndex(null);
  };

  const editTask = (index: number, newTask: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTask;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    (document.getElementById('taskInput') as HTMLInputElement).value = tasks[index];
  };

  const openFile = async () => {
    const fileData = await window.electron.ipcRenderer.invoke('dialog:openFile');
    if (fileData) {
      setFilePath(fileData.path);
      setFileContent(fileData.content);
      setTasks(fileData.content.split('\n'));
    }
  };

  const downloadFile = () => {
    if (tasks.length > 0 && filePath) {
      const updatedContent = tasks.join('\n');
      const blob = new Blob([updatedContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filePath.split('/').pop() || 'updated_tasks.txt';
      link.click();
    }
  };

  return (
    <div className="app">
      <h1 className="title">To-Do App</h1>

      <div className="input-section">
        <input type="text" id="taskInput" placeholder="Enter a task" className="input" />
        <button
          className="btn add-btn"
          onClick={() => {
            const task = (document.getElementById('taskInput') as HTMLInputElement).value;
            if (task) addTask(task);
            (document.getElementById('taskInput') as HTMLInputElement).value = '';
          }}
        >
          {editingIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <hr className="dashed-divider" />

      <div className="file-actions">
        <button className="btn upload-btn" onClick={openFile}>
          Upload File
        </button>
        <button className="btn download-btn" onClick={downloadFile}>
          Download Updated File ⬇️
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {task}
            <div className="task-buttons">
              <button className="edit-btn" onClick={() => startEditing(index)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
