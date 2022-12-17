export const socketURL =
  "wss://n3lntpsij2.execute-api.us-east-1.amazonaws.com/production";
export const restURL =
  "https://6ldwf1qmm9.execute-api.us-east-1.amazonaws.com/production";

export const maxMsInQueue = 5 * 1000; // in ms
export const maxChatTime = 5 * 60 * 1000; // in ms

export let ws = null;
export let liveChatMessages = [];

export const exitChat = () => {
  if (ws) ws.close();
  ws = null;
  liveChatMessages = [];
};

export const setWs = (newWs) => {
  ws = newWs;
};
