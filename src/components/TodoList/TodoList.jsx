import styles from "./TodoList.module.css";
import { TodoListItem } from "../TodoListItem/TodoListItem.jsx";

export default function TodoList({ todos, onUpdate, onDelete }) {
  return (
    <section>
      <h3>To-Do's</h3>
      {!todos.length && <p>Sorry, no Todos!</p>}
      <ul className={styles.TodoList}>
        {todos.map((todo) => (
          <TodoListItem
            todo={todo}
            key={todo.id}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
