import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { accountService } from "../api/accountService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { IAccount } from "@/shared/types/account.types";

export function useGetAccounts(): UseQueryResult<IAccount[], Error> {
  return useQuery({
    queryKey: QUERY_KEYS.accounts,
    queryFn: accountService.getAllAccounts,
  });
}