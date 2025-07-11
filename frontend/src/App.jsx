import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS } from "./graphql/query";
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from "./graphql/mutation";
import TodoItem from "./components/TodoItem";
import TopControls from "./components/TopControls";
import TodoForm from "./components/TodoForm";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import "./styles/App.css";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteState, setDeleteState] = useState({ show: false, id: null });

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  const handleEdit = (id, task) => {
    updateTodo({ variables: { id, task }, onCompleted: () => refetch() });
  };

  const handleCheck = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === data.todo.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.todo.map((t) => t.id));
    }
  };

  const handleDeleteSelected = () => {
    setDeleteState({ show: true, id: "multiple" });
  };

  const handleDeleteConfirmed = () => {
    if (deleteState.id === "multiple") {
      selectedIds.forEach((id) => {
        deleteTodo({ variables: { id }, onCompleted: () => refetch() });
      });
      setSelectedIds([]);
    } else {
      deleteTodo({
        variables: { id: deleteState.id },
        onCompleted: () => refetch(),
      });
    }
    setDeleteState({ show: false, id: null });
  };

  return (
    <div className="app-background">
      <div className="container">
        <h1 className="app-title">🌸 Todo List 🌸</h1>

        <TopControls
          selectedCount={selectedIds.length}
          totalCount={data.todo.length}
          onDelete={handleDeleteSelected}
          onToggleSelectAll={handleToggleSelectAll}
          allSelected={selectedIds.length === data.todo.length}
        />

        <TodoForm
          onAdd={(task, done) => {
            createTodo({
              variables: { task },
              onCompleted: () => {
                refetch();
                done();
              },
            });
          }}
        />

        <ul className="todo-list">
          {data?.todo?.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              isChecked={selectedIds.includes(item.id)}
              onCheck={() => handleCheck(item.id)}
              onEdit={handleEdit}
            />
          ))}
        </ul>

        {deleteState.show && (
          <ConfirmDeleteModal
            onConfirm={handleDeleteConfirmed}
            onCancel={() => setDeleteState({ show: false, id: null })}
          />
        )}
      </div>
    </div>
  );
}

export default App;
