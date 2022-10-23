import React from "react";
import { useState, useEffect } from "react";

function Chat({ socket, userName, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const date = new Date(Date.now());
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time: `${date.getHours()}:${date.getMinutes()}`,
      };
      await socket.emit("send_message", messageData);
      setMessageList([...messageList, messageData]);
      setCurrentMessage("");
      document.getElementById("message-input").value = "";
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div
        className="chat-body"
        style={{
          width: "75%",
          display: "inline-block",
          padding: "20px",
        }}
      >
        {messageList.map((messageContent) => {
          const styles =
            messageContent.author == userName
              ? {
                  display: "flex",
                  justifyContent: "flex-end",
                }
              : {
                  display: "flex",
                  justifyContent: "flex-start",
                };
          return (
            <>
              <h1 style={styles}>{messageContent.message}</h1>
            </>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          id="message-input"
          type="text"
          placeholder="message"
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
