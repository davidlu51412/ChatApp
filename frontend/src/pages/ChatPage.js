import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import QueueSpinner from "../components/QueueSpinner";
import Messages from "../components/Messages";
import Sockette from "sockette";
import axios from "axios";

// handle someone closing application early
// chat screen goes off page and typing bar doesnt stay put

const socketURL =
  "wss://n3lntpsij2.execute-api.us-east-1.amazonaws.com/production";
const restURL =
  "https://6ldwf1qmm9.execute-api.us-east-1.amazonaws.com/production";

const maxMsInQueue = 5 * 1000; // in ms
const maxChatTime = 60 * 1000; // in ms

let ws = null;
let liveChatMessages = [];

function ChatPage() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [inQueue, setInQueue] = useState(true);
  const [recipient, setRecipient] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ws = new Sockette(socketURL, {
      timeout: maxChatTime,
      maxAttempts: 1,
      onopen: (e) => onConnect(e),
      onmessage: (e) => onRecieve(e),
      onreconnect: (e) => console.log("Reconnecting...", e),
      onmaximum: (e) => console.log("Stop Attempting!", e),
      onclose: (e) => console.log("Closed!", e),
      onerror: (e) => console.log("Error:", e),
    });
  }, []);

  const onConnect = (e) => {
    ws.json({
      getConnectionId: true,
    });
  };

  const exitChat = () => {
    ws.close();
    liveChatMessages = [];
    navigate("/");
  };

  const timeoutChat = async () => {
    setTimeout(exitChat, maxChatTime);
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
            ws.close();
            console.log("closed connection due to long queue time");
            exitChat();
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
    const { sender, recipient, message, connectionId } = JSON.parse(e.data);
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
    <main class="bg-neutral-900	 h-screen">
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
