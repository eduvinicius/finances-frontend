import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { transactionService } from "../api/transactionService";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";
import type { ITransaction, TransactionFiltersValues } from "@/shared/types/transactions.types";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useGetAllTransactions(
    pagination: IPaginatedRequest,
    filters: TransactionFiltersValues
): UseQueryResult<IPaginatedBaseResponse<ITransaction[]>, Error> {

    return useQuery({
        queryKey: QUERY_KEYS.transactions.filteredList(pagination, filters),
        queryFn: () => transactionService.getTransactions(pagination, filters),
    });

}