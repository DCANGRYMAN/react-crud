export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 rounded-lg bg-dracula-current shadow-md">
      <span className="text-dracula-cyan">{task.title}</span>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 rounded bg-dracula-yellow text-dracula-bg font-semibold hover:opacity-90"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 rounded bg-dracula-red text-white font-semibold hover:opacity-90"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
