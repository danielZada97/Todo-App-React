import { useEffect, useState } from "react";
import { COMPLETED_FILTERS, PRIORITY_FILTERS } from "../constants/filters";
import styles from "./TodoFilters.module.css";
export default function TodoFilters({ onFilter }) {
  const [completed, setCompleted] = useState("all");
  const [priority, setPriority] = useState("all");
  useEffect(() => {
    const filters = {
      completed: COMPLETED_FILTERS[completed].value,
      priority: PRIORITY_FILTERS[priority].value,
    };
    onFilter(filters);
  }, [completed, priority]);
  return (
    <section>
      <h3>Filters</h3>
      <div className={styles.Filters}>
        <label htmlFor="completed">completed</label>
        <select
          id="completed"
          defaultValue={completed}
          onChange={(event) => setCompleted(event.target.value)}
        >
          {Object.entries(COMPLETED_FILTERS).map(([Key, { label }]) => (
            <option key={Key} value={Key}>
              {label}
            </option>
          ))}
        </select>

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          defaultValue={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          {Object.entries(PRIORITY_FILTERS).map(([Key, { label }]) => (
            <option key={Key} value={Key}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
