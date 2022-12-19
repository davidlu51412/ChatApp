import React from "react";
import { useNavigate } from "react-router-dom";

function InfoPage() {
  const navigate = useNavigate();
  return (
    <main class="bg-zinc-900 text-zinc-200 h-screen p-5">
      {"< "}
      <button
        class="bg-transparent text-xl text-zinc-200 hover:text-zinc-400 border-b-2"
        onClick={() => navigate("/")}
      >
        back
      </button>
      <h1> what </h1>
      <div>
        chat-app.io is an anonymous chatting application similar to the well
        known platform "omegle." users will be able to queue up to find a chat,
        pair with another user, and live chat with the other user for up to 5
        minutes.
      </div>
      <h1> how </h1>
      <div>
        frontend is built using react.js, tailwind css, and bootstrap mdb.
        <br />
        backend is built on the cloud, using amazon web services (aws): lambda,
        dynamodb, websocket api, rest api, and simple queue service.
      </div>
      <h1> why </h1>
      <div>
        the creator wanted to learn more about websocket, aws, and building out
        full stack applications on the cloud. feel free to connect with me on
        linkedin with any questions you want to ask{" "}
        <a href="https://www.linkedin.com/in/davidluprofile">here</a>
      </div>
    </main>
  );
}

export default InfoPage;
