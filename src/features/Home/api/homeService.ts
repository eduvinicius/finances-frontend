import { httpClient } from "@/shared/api/httpClient";
import type { IHomeDashboard } from "@/shared/types/home.types";
import type { AxiosResponse } from "axios";

export const homeService = {
  async getDashboard(): Promise<IHomeDashboard> {
    const response: AxiosResponse<IHomeDashboard> = await httpClient.get("/home/dashboard");
    return response.data;
  },
};
