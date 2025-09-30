class TaskService {
  constructor(storageKey = "tasks") {
    this.key = storageKey;
    this.tasks = JSON.parse(localStorage.getItem(this.key)) || [];
  }

  simulateDelay(ms = 500, signal) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, ms);

      if (signal) {
        signal.addEventListener("abort", () => {
          clearTimeout(timeout);
          reject(new DOMException("Aborted", "AbortError"));
        });
      }
    });
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.tasks));
  }

  async getAll({ signal } = {}) {
    await this.simulateDelay(300, signal);
    return [...this.tasks];
  }

  async create(task, { signal } = {}) {
    await this.simulateDelay(400, signal);
    const newTask = { id: Date.now(), ...task };
    this.tasks.push(newTask);
    this.save();
    return newTask;
  }

  async update(id, updatedTask, { signal } = {}) {
    await this.simulateDelay(400, signal);
    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, ...updatedTask } : t
    );
    this.save();
    return this.tasks.find((t) => t.id === id);
  }

  async delete(id, { signal } = {}) {
    await this.simulateDelay(300, signal);
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.save();
    return true;
  }
}

export default new TaskService();
