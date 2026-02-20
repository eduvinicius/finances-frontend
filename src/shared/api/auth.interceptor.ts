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
    const status = error.response?.status;

    switch (status) {
      case 401:
        forceLogout();
        toast.error("A sessão expirou. Por favor, faça login novamente.");
        break;
      case 403:
        toast.error("Você não tem permissão para essa ação.");
        break;
      case 404:
        toast.error("Recurso não encontrado.");
        break;
      case 500:
        toast.error("Erro no servidor. Tente novamente mais tarde.");
        break;
      case 503:
        toast.error("Serviço temporariamente indisponível.");
        break;
      default:
        // Other errors (like 400 validation errors) are handled by individual API calls
        break;
    }

    return Promise.reject(error);
  }
);
