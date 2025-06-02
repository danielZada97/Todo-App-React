const LOCAL_STORAGE_KEY = "todos";

function readStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function writeStorage(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export const api = {
  todos: {
    getAll(params = {}) {
      const todos = readStorage();

      const filtered = todos.filter((todo) => {
        const byCompleted =
          !params.completed ||
          String(todo.completed) === String(params.completed);

        const byPriority =
          !params.priority || todo.priority === params.priority;

        return byCompleted && byPriority;
      });

      return Promise.resolve(filtered);
    },
    create(newTodo) {
      const todos = readStorage();
      const newId = `${Date.now()}`;
      const todo = { id: newId, ...newTodo };
      writeStorage([...todos, todo]);
      return Promise.resolve(todo);
    },

    update(id, updatedTodo) {
      const todos = readStorage().map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );
      writeStorage(todos);
      return Promise.resolve(updatedTodo);
    },

    delete(id) {
      const todos = readStorage().filter((todo) => todo.id !== id);
      writeStorage(todos);
      return Promise.resolve();
    },
  },
};
