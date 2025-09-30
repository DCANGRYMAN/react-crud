class TaskService {
  constructor() {
    this.key = "tasks";
    this.tasks = JSON.parse(localStorage.getItem(this.key)) || [];
  }

  getAll() {
    return this.tasks;
  }

  create(task) {
    const newTask = { id: Date.now(), ...task };
    this.tasks.push(newTask);
    this.save();
    return newTask;
  }

  update(id, updatedTask) {
    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, ...updatedTask } : t
    );
    this.save();
  }

  delete(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.save();
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.tasks));
  }
}

export default new TaskService();
