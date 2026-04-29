import { httpClient } from "@/shared/api/httpClient";
import { getApiEndpoint, QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { LoginFormValues, GoogleAuthResponse } from "@/shared/types/login.type";
import type { AxiosResponse } from "axios";

const apiEndpoint = getApiEndpoint(QUERY_KEYS.auth.login());
const googleEndpoint = 'auth/google';

export const authService = {
  async login(data: LoginFormValues): Promise<string> {
    const response: AxiosResponse<string> = await httpClient.post(`/${apiEndpoint}`, data);
    return response.data;
  },

  async googleLogin(idToken: string): Promise<GoogleAuthResponse> {
    const response: AxiosResponse<GoogleAuthResponse> = await httpClient.post(`/${googleEndpoint}`, { idToken });
    return response.data;
  },
};
