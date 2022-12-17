import React from "react";

function ChatInput({ inputCallback, sendCallback, inputText }) {
  return (
    <main class="p-2">
      <input
        type="text"
        placeholder="chat [enter]"
        class="bg-black border-2 px-4 py-3 text-2xl rounded-2xl focus:outline-none text-zinc-200 fixed right-3 bottom-3 w-10/12 h-16  break-words resize-none"
        onChange={(e) => inputCallback(e)}
        value={inputText}
        onKeyDown={(e) => (e.key == "Enter" ? sendCallback() : {})}
      />
    </main>
  );
}

export default ChatInput;
