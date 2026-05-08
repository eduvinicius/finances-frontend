import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { viaCepService } from "@/shared/api/viaCepService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { IViaCepResponse } from "@/shared/types/viaCep.types";

export function useViaCep(rawCep: string): UseQueryResult<IViaCepResponse, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.viaCep.lookup(rawCep),
    queryFn: () => viaCepService.lookup(rawCep),
    enabled: rawCep.length === 8,
    staleTime: Infinity,
    retry: false,
  });
}
