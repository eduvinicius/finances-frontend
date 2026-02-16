import type { IAccount, ICreateAccount } from "@/shared/types/account.types";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { accountService } from "../api/accountService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { toast } from "sonner";

export function useCreateAccount(): UseMutationResult<IAccount, Error, ICreateAccount> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accountService.createAccount,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.accounts,
      });
    },

    onError: (error) => {
      toast.error(`Erro ao criar conta: ${error.message}`);
    }
  });
}