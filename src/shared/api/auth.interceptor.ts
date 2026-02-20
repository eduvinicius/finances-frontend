import { toast } from "sonner";
import { forceLogout } from "../utils/logout";
import { httpClient } from "./httpClient";
import { storage, STORAGE_KEYS } from "../utils/storage";
import type { LoginResponse } from "../types/login.type";

httpClient.interceptors.request.use((config) => {
  const userData = storage.get<LoginResponse>(STORAGE_KEYS.USER_DATA);
  
  if (userData?.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
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
