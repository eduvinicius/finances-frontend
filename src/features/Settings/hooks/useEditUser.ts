import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { userService } from "../api/userService";
import { toast } from "sonner";
import type { UserFormValues } from "@/shared/types/user.types";

export function useEditUser(): UseMutationResult<UserFormValues, Error, UserFormValues> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateUser,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.auth.getCurrentUser(),
      });

      toast.success("Usuário atualizado com sucesso!");
    },

    onError: (error) => {
      toast.error(`Erro ao atualizar usuário: ${error.message}`);
    }
  });
}