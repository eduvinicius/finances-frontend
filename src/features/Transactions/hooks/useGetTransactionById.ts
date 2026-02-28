import type { ITransaction } from "@/shared/types/transactions.types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { transactionService } from "../api/transactionService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useGetTransactionById(id: string): UseQueryResult<ITransaction, Error> {

    return useQuery({
        queryKey: QUERY_KEYS.transactions.byId(id),
        queryFn: () => transactionService.getTransactionById(id),
    });

}