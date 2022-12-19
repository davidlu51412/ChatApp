import React from "react";
import { useNavigate } from "react-router-dom";
import { exitChat } from "../globals/globals";

function HomePage() {
  exitChat();
  const navigate = useNavigate();
  return (
    <main class="bg-zinc-900 w-screen h-screen text-zinc-900">
      <button
        style={{ marginLeft: -67, marginTop: -25 }}
        class="rounded-lg px-8 text-4xl py-3 absolute top-2/4 left-2/4 text-center bg-zinc-200 hover:bg-zinc-400"
        onClick={() => navigate("/chat")}
      >
        chat
      </button>
      <button
        style={{ marginLeft: -47, marginBottom: 3 }}
        class="bg-transparent px-8 text-xl text-zinc-200 py-3 left-2/4 absolute bottom-0 text-center bg-zinc-200 hover:text-zinc-400 border-b-2"
        onClick={() => navigate("/info")}
      >
        info
      </button>
    </main>
  );
}

export default HomePage;
