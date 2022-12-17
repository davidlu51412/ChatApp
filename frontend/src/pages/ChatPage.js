import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import QueueSpinner from "../components/QueueSpinner";
import Messages from "../components/Messages";
import Sockette from "sockette";
import axios from "axios";
import {
  liveChatMessages,
  socketURL,
  restURL,
  maxChatTime,
  maxMsInQueue,
  ws,
  exitChat,
  setWs,
} from "../globals/globals";

function ChatPage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [inQueue, setInQueue] = useState(true);
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    if (!ws) {
      const newWs = new Sockette(socketURL, {
        timeout: maxChatTime,
        maxAttempts: 1,
        onopen: (e) => onConnect(e),
        onmessage: (e) => onRecieve(e),
        onreconnect: (e) => console.log("Reconnecting...", e),
        onmaximum: (e) => console.log("Stop Attempting!", e),
        onclose: (e) => exitAndReturnToHome(),
        onerror: (e) => exitAndReturnToHome(),
      });
      setWs(newWs);
    }

    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const onConnect = (e) => {
    ws.json({
      getConnectionId: true,
    });
  };

  const timeoutChat = async () => {
    setTimeout(exitAndReturnToHome, maxChatTime);
  };

  const exitAndReturnToHome = () => {
    exitChat();
    navigate("/");
  };

  const checkForRecipient = async (ms, connectionId) => {
    axios
      .post(restURL, { getRecipient: true, connectionId })
      .then((response) => {
        const connectionData = JSON.parse(response.data.body);
        if (connectionData.recipient) {
          setRecipient(connectionData.recipient);
          setInQueue(false);
          timeoutChat();
          return;
        } else {
          if (ms > maxMsInQueue) {
            console.log("closed connection due to long queue time");
            exitAndReturnToHome();
            return;
          } else {
            const waitMs = 2000;
            setTimeout(
              () => checkForRecipient(ms + waitMs, connectionId),
              waitMs
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const onRecieve = (e) => {
    const { sender, recipient, message, connectionId, recipientDisconnected } =
      JSON.parse(e.data);
    if (connectionId) {
      setUserId(connectionId);
      axios
        .post(restURL, { joinQueue: true, connectionId })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      checkForRecipient(0, connectionId);
    } else if (recipientDisconnected) {
      console.log("recipient disconnected");
      exitAndReturnToHome();
    } else {
      liveChatMessages.push({ text: message, isUser: false });
      setMessages([...liveChatMessages]);
    }
  };

  const inputCallback = (e) => {
    setInputText(e.target.value);
  };

  const sendCallback = () => {
    if (inputText) {
      ws.json({
        action: "sendmessage",
        message: inputText,
        recipient: recipient,
      });
      liveChatMessages.push({ text: inputText, isUser: true });
      setMessages([...liveChatMessages]);
      setInputText("");
    }
  };

  return (
    <main class="bg-zinc-900 h-auto min-h-screen">
      {inQueue && (
        <>
          <QueueSpinner />
        </>
      )}

      {!inQueue && (
        <>
          <Messages messages={messages} />
          <ChatInput
            inputCallback={inputCallback}
            sendCallback={sendCallback}
            inputText={inputText}
          />
        </>
      )}
    </main>
  );
}

export default ChatPage;
