import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/chat/:chatId",
    element: <ChatPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <main className="bg-zinc-900 min-h-screen h-full  ">
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>
);
