import React, { useState } from "react";
import { json, NavLink } from "react-router-dom";
import del from "../assets/delete.png";
import upd from "../assets/edit.png";

function TodoList({ todos, onDelete, revalidate, url }) {
  function handleIsCompleted(id) {
    const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
    const updateTodos = currentTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    localStorage.setItem("task", JSON.stringify(updateTodos));
    revalidate();
  }
    const filteredTodos = todos.filter((todo) => {
        if (!url) return true;
        return String(todo.completed) === url;
    });
  const getTasks = filteredTodos.map((todo) => {
    return (
      <li
        key={todo.id}
        className="flex justify-between items-center bg-whitesmoke shadow-md rounded-md px-3 py-2 hover:shadow-xl transition cursor-pointer"
      >
        <span className={`truncate ${todo.completed ? "line-through" : ""}`}>
          {todo.text}
        </span>
        <button
          onClick={() => handleIsCompleted(todo.id)}
          className="w-fit h-fit bg-gray-900 text-white p-1 flex justify-center items-center rounded-sm"
        >
          {todo.completed ? "Completed" : "Not completed"}
        </button>
        <div className="flex space-x-4">
          <NavLink
            to={`/${todo.id}`}
            className="w-5 h-5 opacity-70 hover:opacity-100 transition"
          >
            <img src={upd} alt="edit" />
          </NavLink>
          <button
            onClick={() => onDelete(todo.id)}
            className="w-5 h-5 opacity-70 hover:opacity-100 transition"
          >
            <img src={del} alt="delete" />
          </button>
        </div>
      </li>
    );
  });
  return (
    <>
      <div className="flex space-x-2 justify-between">
        <div className="flex space-x-2" >
          <NavLink to="/?isCompleted=true" className="">
            Completed
          </NavLink>
          <NavLink to="/?isCompleted=false" className="">
            NotCompleted
          </NavLink>
        </div>
        <NavLink to="/" className="">
          All
        </NavLink>
      </div>
      <ul className="w-full font-semibold flex flex-col space-y-3">
        {getTasks}
      </ul>
    </>
  );
}

export default TodoList;
