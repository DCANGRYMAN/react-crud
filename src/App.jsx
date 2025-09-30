import { useState, useEffect } from "react";
import taskService from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTasks = async (controller) => {
    setLoading(true);
    try {
      const data = await taskService.getAll({ signal: controller.signal });
      setTasks(data);
    } catch (err) {
      if (err.name !== "AbortError") console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadTasks(controller);

    return () => controller.abort();
  }, []);

  const handleSave = async (task) => {
    const controller = new AbortController();
    setLoading(true);
    try {
      if (editing) {
        await taskService.update(editing.id, task, { signal: controller.signal });
        setEditing(null);
      } else {
        await taskService.create(task, { signal: controller.signal });
      }
      const updated = await taskService.getAll({ signal: controller.signal });
      setTasks(updated);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const controller = new AbortController();
    setLoading(true);
    try {
      await taskService.delete(id, { signal: controller.signal });
      const updated = await taskService.getAll({ signal: controller.signal });
      setTasks(updated);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>
      <TaskForm onSave={handleSave} task={editing} />
      {loading ? <p className="text-dracula-yellow">Loading...</p> : null}
      <TaskList tasks={tasks} onEdit={(t) => setEditing(t)} onDelete={handleDelete} />
    </div>
  );
}

export default App;
