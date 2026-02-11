import { AxiosError } from "axios";

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError && error.response) {
    return error.response.data?.message || "Erro desconhecido do backend";
  }
  return (error as Error)?.message || "Erro desconhecido";
}