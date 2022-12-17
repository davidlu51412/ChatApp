import React from "react";
import Message from "./Message";

function Messages({ messages }) {
  return (
    <main class="p-4">
      {messages.map((message) => (
        <Message text={message.text} isUser={message.isUser} />
      ))}
      <br />
      <br />
    </main>
  );
}

export default Messages;
