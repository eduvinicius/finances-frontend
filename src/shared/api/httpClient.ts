import axios from "axios";
import { ENV } from "@/shared/constants/env";

export const httpClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
