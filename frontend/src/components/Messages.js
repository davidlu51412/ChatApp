import React from "react";
import Message from "./Message";

function Messages({ messages }) {
  return (
    <div class="relative">
      {messages.map((message) => (
        <Message text={message.text} isUser={message.isUser} />
      ))}
    </div>
  );
}

export default Messages;
