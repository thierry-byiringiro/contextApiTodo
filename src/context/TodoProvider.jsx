import React, { Children, useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";
function TodoProvider({ children,todos,revalidate}) {
  function deleteTodo(id) {
    const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
    const updatedTodos = currentTodos.filter((el) => el.id !== id);
    localStorage.setItem("task", JSON.stringify(updatedTodos));

    revalidate();
  }

  function handleIsCompleted(id) {
    const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
    const updateTodos = currentTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    localStorage.setItem("task", JSON.stringify(updateTodos));
    revalidate();
  }
  return (
    <>
      <TodoContext.Provider value={{ todos, deleteTodo,revalidate , handleIsCompleted }}>
        {children}
      </TodoContext.Provider>
    </>
  );
}

export default TodoProvider;
