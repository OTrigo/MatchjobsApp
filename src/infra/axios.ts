import axios from "axios";

const api = axios.create({
  baseURL: "https://matchjobsbackend-7lo5.onrender.com"
});
export { api };
