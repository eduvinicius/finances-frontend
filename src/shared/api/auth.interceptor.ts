import { toast } from "sonner";
import { forceLogout } from "../utils/logout";
import { httpClient } from "./httpClient";

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      forceLogout();
      toast.error("A sessão expirou. Por favor, faça login novamente.");
    }

    return Promise.reject(error);
  }
);
