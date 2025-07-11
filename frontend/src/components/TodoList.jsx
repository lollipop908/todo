import React from "react";
import TodoItem from "./TodoItem";
import "../styles/TodoList.css";

function TodoList({ todos, onEdit, onRequestDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
