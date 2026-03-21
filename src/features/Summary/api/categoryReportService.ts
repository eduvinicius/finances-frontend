import { httpClient } from "@/shared/api/httpClient";
import { getApiEndpoint, QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { ICategoryReport, ICategoryReportService } from "@/shared/types/summary.types";
import type { TransactionTypeEnum } from "@/shared/enums/transactionTypeEnum";
import type { AxiosResponse } from "axios";

const baseEndpoint = getApiEndpoint(QUERY_KEYS.categoryReport.all);

export const categoryReportService: ICategoryReportService = {
  async getCategoryReport(from: Date, to: Date, transactionType: TransactionTypeEnum): Promise<ICategoryReport[]> {
    const response: AxiosResponse<ICategoryReport[]> = await httpClient.get(`/${baseEndpoint}`, {
      params: {
        from: from.toISOString(),
        to: to.toISOString(),
        transactionType,
      },
    });
    return response.data;
  },
};
