import React from "react";

function ChatInput({ inputCallback, sendCallback, inputText }) {
  return (
    <>
      <input
        placeholder="type message here..."
        type="text"
        class="bg-transparent focus:outline-none text-white absolute bottom-5 right-5 w-2/3 break-words"
        onChange={(e) => inputCallback(e)}
        value={inputText}
        onKeyDown={(e) => (e.key == "Enter" ? sendCallback() : {})}
      />
      <button
        class="bg-white absolute bottom-5 right-2 rounded-full w-10 hover:bg-gray-300"
        onClick={() => sendCallback()}
      >
        <i class="material-icons ml-auto mr-auto block">&#xe163;</i>
      </button>
    </>
  );
}

export default ChatInput;
