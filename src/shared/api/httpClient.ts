import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://localhost:7146/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!).token : ""}`,
  },
});
