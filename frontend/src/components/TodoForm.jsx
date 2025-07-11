import React from "react";
import "../styles/TodoForm.css";

function TodoForm({ onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    onAdd(task, () => e.target.reset());
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        id="task"
        type="text"
        placeholder="✨ Add a task..."
        className="task-input"
      />
      <button type="submit" className="add-button">
        ADD 💕
      </button>
    </form>
  );
}

export default TodoForm;
