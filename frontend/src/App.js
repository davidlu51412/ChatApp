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
        {/* <Route path="/test" element={<ChatTestPage />} /> */}
        <Route path="/info" element={<InfoPage />} />
        <Route
          path="*"
          element={
            <>This page doesnt exist and I was too lazy to make an error page</>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
