import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { accountService } from "../api/accountService";
import type { IAccount } from "@/shared/types/account.types";

export function useGetAllAccounts(): UseQueryResult<IAccount[], Error> {
    return useQuery({
        queryKey: QUERY_KEYS.accounts.all,
        queryFn: accountService.getAllAccounts
    })
}