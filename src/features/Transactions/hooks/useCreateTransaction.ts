import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionService } from "../api/transactionService";
import type { ITransaction, TransactionFormValues } from "@/shared/types/transactions.types";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useCreateTransaction():UseMutationResult<ITransaction, Error, TransactionFormValues> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionService.createTransaction,

        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.transactions.getAll(),
        });
        },

        onError: (error) => {
        toast.error(`Erro ao criar transação: ${error.message}`);
        }
    });
}