import React from "react";

function Message({ text, isUser }) {
  const styling = !isUser
    ? "bg-zinc-700 text-zinc-200 rounded-lg float-left p-2 max-w-[60%]"
    : "bg-zinc-200 text-zinc-700 rounded-lg float-right p-2 max-w-[60%]";
  return (
    <div class="w-full overflow-auto">
      <p class={styling}>{text}</p>
    </div>
  );
}

export default Message;
