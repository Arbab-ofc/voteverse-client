import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "https://voteverse-server.onrender.com";
axios.defaults.withCredentials = true;

export default axios;
