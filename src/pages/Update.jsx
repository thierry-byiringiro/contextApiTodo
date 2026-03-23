import { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";

export function loader({ params }) {
  return params.id;
}

export async function action({ request,params }) {
    const formData = await request.formData();
    const newTodo = formData.get("task");
    const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
    const updateTodos = currentTodos.map(todo => todo.id === params.id  ? {...todo, text : newTodo } : todo);
    localStorage.setItem("task",JSON.stringify(updateTodos));
    return redirect("/");
}
function Update() {
  const data = useLoaderData();
  const currentTodos = JSON.parse(localStorage.getItem("task") || "[]");
  const getDesiredTodo = currentTodos.find((el) => el.id === data);
  const [text,setText] = useState(getDesiredTodo?.text || "");
  return (
    <>
      <Form method="post" className="flex space-x-3 mt-10 p-4">
        <input
          type="text"
          name="task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-10 rounded-md border-2 w-full px-3 outline-none focus:ring-1"
        />

        <input
          type="submit"
          value="Update"
          className="flex items-center justify-center rounded-md p-2 w-20 bg-blue-950 text-[#E1D9D1] font-semibold hover:opacity-90 transition"
        />
      </Form>
    </>
  );
}
export default Update;
