import React from "react";

function Message({ text, isUser }) {
  const styling = !isUser
    ? "bg-black text-white max-w-6/12 absolute left-0 rounded-r-lg p-2"
    : "bg-white max-w-6/12 absolute right-0 rounded-l-lg p-2";
  return (
    <div class="flex py-1 h-12">
      <p class={styling}>{text}</p>
    </div>
  );
}

export default Message;
