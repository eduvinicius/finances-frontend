import { httpClient } from "@/shared/api/httpClient";
import { getApiEndpoint, QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { ISummary, ISummaryService } from "@/shared/types/summary.types";
import type { AxiosResponse } from "axios";

const baseEndpoint = getApiEndpoint(QUERY_KEYS.summary.all);

export const summaryService: ISummaryService = {
  async getSummary(from: Date, to: Date): Promise<ISummary> {
    const response: AxiosResponse<ISummary> = await httpClient.get(`/${baseEndpoint}`, {
      params: {
        from: from.toISOString(),
        to: to.toISOString(),
      },
    });
    return response.data;
  },
};
