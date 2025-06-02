import { useState } from "react";
import styles from "./TodoForm.module.css";
import { useForm } from "react-hook-form";
import { TodoFormFields } from "../TodoFormFields/TodoFormFields.jsx";
import { PRIORITY_DEFAULT } from "../constants/priorities.js";
import { getTodoSchema } from "../../schemas/todo.js";
import { yupResolver } from "@hookform/resolvers/yup";
export function TodoForm({ onCreate }) {
  const [showAllFields, setShowAllFields] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getTodoSchema({ isNew: true })),
    defaultValues: {
      description: "",
      deadline: "",
      priority: PRIORITY_DEFAULT,
      completed: false,
    },
  });

  function handleCreate(data) {
    onCreate(data);
    reset();
  }

  return (
    <section>
      <h3 className={styles.Title}>
        New To-Do
        <button onClick={() => setShowAllFields(!showAllFields)}>
          {showAllFields ? "Hide" : "Show"} all fields
        </button>
      </h3>

      <form className={styles.Form} onSubmit={handleSubmit(handleCreate)}>
        <TodoFormFields
          showAllFields={showAllFields}
          register={register}
          errors={errors}
        />
        <input type="submit" value="Add" />
      </form>
    </section>
  );
}
