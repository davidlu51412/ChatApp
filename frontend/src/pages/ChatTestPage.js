import React, { useState, useEffect } from "react";
import ChatInput from "../components/ChatInput";
import Messages from "../components/Messages";

let liveChatMessages = [
  { text: "hello world epic boss", isUser: false },
  {
    text: "hello world epic boss hello world epic boss  hello world epic boss",
    isUser: true,
  },
  {
    text: "hello world epic boss hello world epic boss  hello world epic boss",
    isUser: true,
  },
  {
    text: "hello world epic boss hello world epic boss  hello world epic boss",
    isUser: false,
  },
  { text: "hello world epic boss", isUser: false },
  {
    text: "hello world epic boss hello world epic boss  hello world epic boss",
    isUser: true,
  },
  {
    text: "hello world epic boss hello world epic boss  hello world epic boss",
    isUser: true,
  },
  {
    text: "hello world epic boss hello world epic boss  hello world epic boss",
    isUser: false,
  },
  { text: "hello world epic boss", isUser: false },
  {
    text: "hello world epic boss hello world epic boss  hello world epic boss",
    isUser: true,
  },
  {
    text: "hello world epic boss hello world epic boello world epic bosello world epic bosello world epic bosello world epic bosss  hello world epic bosello world epic bosello world epic bosello world epic bosello world epic bosello world epic bosello world epic boss",
    isUser: true,
  },
];

function ChatTestPage() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState(liveChatMessages);
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const inputCallback = (e) => {
    setInputText(e.target.value);
  };

  const sendCallback = () => {
    if (inputText) {
      liveChatMessages.push({ text: inputText, isUser: true });
      setMessages([...liveChatMessages]);
      setInputText("");
    }
  };

  return (
    <main class="bg-zinc-900 h-auto min-h-screen">
      <Messages messages={messages} />
      <ChatInput
        inputCallback={inputCallback}
        sendCallback={sendCallback}
        inputText={inputText}
      />
    </main>
  );
}

export default ChatTestPage;
