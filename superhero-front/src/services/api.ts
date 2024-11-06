import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  },
});
