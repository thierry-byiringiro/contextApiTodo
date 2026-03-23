import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Body, { action as bodyAction, loader as bodyLoader } from "./pages/Body";
import Layout from "./components/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Update, {
  loader as updateLoader,
  action as updateAction,
} from "./pages/Update";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        index
        path="/"
        element={<Body />}
        action={bodyAction}
        loader={bodyLoader}
      />
      <Route
        path=":id"
        element={<Update />}
        action={updateAction}
        loader={updateLoader}
      />
    </Route>,
  ),
);
function App() {
  return (
    <>
      <div className="w-100 h-fit mt-20  flex flex-col  mx-auto items-center border">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
