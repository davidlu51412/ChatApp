import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ChatTestPage from "./pages/ChatTestPage";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route
          path="*"
          element={
            <>This page does not exist</>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
