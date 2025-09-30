import { useState, useEffect } from "react";

export default function TaskForm({ onSave, task }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (task) setTitle(task.title);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        className="flex-1 px-3 py-2 rounded-lg bg-dracula-current text-dracula-fg border border-dracula-purple focus:outline-none focus:ring-2 focus:ring-dracula-pink"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-dracula-green text-dracula-bg font-bold hover:opacity-90"
      >
        {task ? "Update" : "Add"}
      </button>
    </form>
  );
}
