import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./hooks/authProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <main className="bg-zinc-900 min-h-screen h-full overflow-hidden">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="/chat/:conversationId" element={<ChatPage />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </main>
  </React.StrictMode>
);
