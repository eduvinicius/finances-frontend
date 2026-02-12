import { httpClient } from "@/shared/api/httpClient";
import type { LoginFormValues, LoginResponse } from "@/shared/types/login.type";
import type { AxiosResponse } from "axios";


export const authService = {
  async login(data: LoginFormValues): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await httpClient.post("/auth/login", data);
    return response.data;
  },
};
