import { httpClient } from "@/shared/api/httpClient";
import { LoginFormValues, LoginResponse } from "@/shared/types/login.type";

export const authService = {
  async login(data: LoginFormValues): Promise<LoginResponse> {
    const response = await httpClient.post("/auth/login", data);
    return response.data;
  },
};
