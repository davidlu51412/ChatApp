export const socketURL = process.env.REACT_APP_SOCKET_URL;
export const restURL = process.env.REACT_APP_REST_URL;

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
