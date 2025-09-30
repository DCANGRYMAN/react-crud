import { useState, useEffect } from "react";
import taskService from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setTasks(taskService.getAll());
  }, []);

  const handleSave = (task) => {
    if (editing) {
      taskService.update(editing.id, task);
      setEditing(null);
    } else {
      taskService.create(task);
    }
    setTasks(taskService.getAll());
  };

  const handleDelete = (id) => {
    taskService.delete(id);
    setTasks(taskService.getAll());
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-dracula-bg p-6 rounded-xl shadow-lg border border-dracula-purple">
        <h1 className="text-3xl font-bold text-dracula-pink mb-6 text-center">
          Task Dashboard
        </h1>
        <TaskForm onSave={handleSave} task={editing} />
        <TaskList
          tasks={tasks}
          onEdit={(t) => setEditing(t)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
