import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { categoryReportService } from "../api/categoryReportService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { ICategoryReport } from "@/shared/types/summary.types";
import type { TransactionTypeEnum } from "@/shared/enums/transactionTypeEnum";

export function useGetCategoryReport(
  from: Date,
  to: Date,
  transactionType: TransactionTypeEnum,
): UseQueryResult<ICategoryReport[], Error> {
  return useQuery({
    queryKey: QUERY_KEYS.categoryReport.get(from, to, transactionType),
    queryFn: () => categoryReportService.getCategoryReport(from, to, transactionType),
  });
}
