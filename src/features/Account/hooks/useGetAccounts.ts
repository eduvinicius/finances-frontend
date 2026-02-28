import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { accountService } from "../api/accountService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { AccountFiltersValues, IAccount } from "@/shared/types/account.types";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";

export function useGetAccounts(
    pagination: IPaginatedRequest,
    filters?: AccountFiltersValues
): UseQueryResult<IPaginatedBaseResponse<IAccount[]>, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.accounts.paginatedList(pagination, filters),
    queryFn: () => accountService.getAccountsPaginated(pagination, filters),
  });
}