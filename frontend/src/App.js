import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat.js";

const socket = io.connect("http://localhost:3001/");

function App() {
  const [userName, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setJoinedRoom(true);
    }
  };

  return (
    <div className="App">
      {!joinedRoom ? (
        <>
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="room id"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}> join a room</button>
        </>
      ) : (
        <>
          <Chat socket={socket} userName={userName} room={room} />
        </>
      )}
    </div>
  );
}

export default App;
