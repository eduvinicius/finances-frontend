import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://localhost:7146/api",
  headers: {
    "Content-Type": "application/json",
  },
});
