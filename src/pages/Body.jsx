import React, { useRef } from "react";
import { Form, NavLink, useLoaderData, useRevalidator } from "react-router-dom";
import TodoList from "./TodoList";

export async function action({ request }) {
  const formData = await request.formData();
  const todo = {
    id: crypto.randomUUID(),
    text: formData.get("task"),
    completed: false,
  };

  const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
  currentTodos.push(todo);
  localStorage.setItem("task", JSON.stringify(currentTodos));
  return null;
}

export function loader({ request }) {
  const url = new URL(request.url).searchParams.get("isCompleted");
  const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
  return { currentTodos, url };
}

function Body() {
  const loaderObj = useLoaderData();
  const url = loaderObj.url;
  const data = loaderObj.currentTodos;
  const { revalidate } = useRevalidator();

  function deleteTodo(id) {
    const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
    const updatedTodos = currentTodos.filter((el) => el.id !== id);
    localStorage.setItem("task", JSON.stringify(updatedTodos));
    revalidate();
  }

  return (
    <div className="w-full p-4 flex flex-col space-y-5">
      <Form method="post" className="flex space-x-3">
        <input
          type="text"
          placeholder="e.g: Make a coffee"
          name="task"
          className="h-10 rounded-md border-2 w-full px-3 outline-none focus:ring-1"
          required
        />
        <input
          type="submit"
          value="Add"
          className="flex items-center justify-center rounded-md w-20 bg-blue-950 text-[#E1D9D1] font-semibold hover:opacity-90 transition"
        />
      </Form>
      {data.length > 0 && (
        <TodoList todos={data} onDelete={deleteTodo} revalidate={revalidate}  url={url} />
      )}
    </div>
  );
}

export default Body;
