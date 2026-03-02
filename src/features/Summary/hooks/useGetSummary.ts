import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { summaryService } from "../api/summaryService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { ISummary } from "@/shared/types/summary.types";

export function useGetSummary(from: Date, to: Date): UseQueryResult<ISummary, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.summary.get(from, to),
    queryFn: () => summaryService.getSummary(from, to),
  });
}
