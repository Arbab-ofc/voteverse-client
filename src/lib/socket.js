import { io } from "socket.io-client";

const defaultUrl = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://voteverse-server.onrender.com";

const socketUrl =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_URL ||
  defaultUrl;

const socket = io(socketUrl, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

export default socket;
