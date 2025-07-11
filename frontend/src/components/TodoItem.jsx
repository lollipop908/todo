import React, { useState, useRef, useEffect } from "react";
import "../styles/TodoItem.css";

function TodoItem({ item, onEdit, isChecked, onCheck }) {
  const [isEditing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [task, setTask] = useState(item.task);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggleEdit = async () => {
    if (isEditing) {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onEdit(item.id, task);
      setIsSaving(false);
    }
    setEditing(!isEditing);
  };

  return (
    <li data-id={item.id} className="todo-item">
      <input
        type="checkbox"
        className="circle-checkbox"
        checked={isChecked}
        onChange={onCheck}
      />

      <input
        ref={inputRef}
        className="edit-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        readOnly={!isEditing || isSaving}
      />

      <button
        className="edit-btn"
        onClick={handleToggleEdit}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : isEditing ? "save" : "edit"}
      </button>
    </li>
  );
}

export default TodoItem;
