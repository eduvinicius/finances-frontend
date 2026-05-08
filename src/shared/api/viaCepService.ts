import axios, { type AxiosResponse } from "axios";
import type { IViaCepResponse, IViaCepService } from "@/shared/types/viaCep.types";

const viaCepClient = axios.create({
  baseURL: "https://viacep.com.br/ws",
  headers: { "Content-Type": "application/json" },
});

export const viaCepService: IViaCepService = {
  async lookup(cep: string): Promise<IViaCepResponse> {
    const response: AxiosResponse<IViaCepResponse> = await viaCepClient.get(`/${cep}/json/`);
    return response.data;
  },
};
