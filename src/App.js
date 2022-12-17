import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ChatTestPage from "./pages/ChatTestPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/test" element={<ChatTestPage />} />
        <Route path="*" element={<>Error Page</>} />
      </Routes>
    </main>
  );
}

export default App;
