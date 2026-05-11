import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { accountService } from "../api/accountService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { AccountFiltersValues, IAccount } from "@/shared/types/account.types";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";

export function useGetAccounts(
  pagination: IPaginatedRequest,
  filters?: AccountFiltersValues
): UseQueryResult<IPaginatedBaseResponse<IAccount[]>, Error> {
  const result = useQuery({
    queryKey: QUERY_KEYS.accounts.paginatedList(pagination, filters),
    queryFn: () => accountService.getAccountsPaginated(pagination, filters),
  });

  useEffect(() => {
    if (result.error) toast.error(`Erro ao carregar contas: ${result.error.message}`);
  }, [result.error]);

  return result;
}