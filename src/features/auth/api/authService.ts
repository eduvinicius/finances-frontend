import { httpClient } from "@/shared/api/httpClient";
import { getApiEndpoint, QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { LoginFormValues } from "@/shared/schemas/loginSchema";
import type { GoogleAuthResponse } from "@/shared/types/login.type";
import type { RegisterFormValues } from "@/shared/types/register.types";
import { unformatCPF } from "@/shared/utils/cpfValidation";
import { unformatPhoneNumber } from "@/shared/utils/phoneNumberMask";
import { unformatPostalCode } from "@/shared/utils/postalCodeMask";
import type { AxiosResponse } from "axios";

const loginEndpoint = getApiEndpoint(QUERY_KEYS.auth.login());
const registerEndpoint = getApiEndpoint(QUERY_KEYS.auth.register());
const googleEndpoint = 'auth/google';
const forgotPasswordEndpoint = getApiEndpoint(QUERY_KEYS.auth.forgotPassword());
const resetPasswordEndpoint = getApiEndpoint(QUERY_KEYS.auth.resetPassword());

export const authService = {
  async login(data: LoginFormValues): Promise<string> {
    const response: AxiosResponse<string> = await httpClient.post(`/${loginEndpoint}`, data);
    return response.data;
  },

  async register(data: RegisterFormValues): Promise<string> {
    const { confirmPassword: _, ...rest } = data;
    const payload = {
      ...rest,
      documentNumber: rest.documentNumber ? unformatCPF(rest.documentNumber) : undefined,
      phoneNumber: rest.phoneNumber ? unformatPhoneNumber(rest.phoneNumber) : undefined,
      postalCode: rest.postalCode ? unformatPostalCode(rest.postalCode) : undefined,
      birthDate: rest.birthDate.toISOString(),
    };
    const response: AxiosResponse<string> = await httpClient.post(`/${registerEndpoint}`, payload);
    return response.data;
  },

  async googleLogin(idToken: string): Promise<GoogleAuthResponse> {
    const response: AxiosResponse<GoogleAuthResponse> = await httpClient.post(`/${googleEndpoint}`, { idToken });
    return response.data;
  },

  async forgotPassword(data: { email: string }): Promise<void> {
    await httpClient.post(`/${forgotPasswordEndpoint}`, data);
  },

  async resetPassword(data: { token: string; email: string; newPassword: string; confirmPassword: string }): Promise<void> {
    await httpClient.post(`/${resetPasswordEndpoint}`, data);
  },
};
