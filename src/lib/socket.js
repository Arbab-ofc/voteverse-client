import { io } from "socket.io-client";

const socketUrl =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_URL ||
  "https://voteverse-server.onrender.com";

const socket = io(socketUrl, {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
