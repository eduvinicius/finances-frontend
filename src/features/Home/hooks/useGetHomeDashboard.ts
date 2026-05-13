import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { homeService } from "../api/homeService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { IHomeDashboard } from "@/shared/types/home.types";

export function useGetHomeDashboard(): UseQueryResult<IHomeDashboard, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.home.dashboard(),
    queryFn: () => homeService.getDashboard(),
  });
}
