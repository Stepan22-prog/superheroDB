import axios from "axios";

export const api = axios.create({
  baseURL: process.env.SERVER_ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  },
});
