import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { userService } from "../api/userService";
import { toast } from "sonner";

export function useUploadProfileImage(): UseMutationResult<string, Error, File> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.uploadProfileImage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.auth.getCurrentUser(),
      });

      toast.success("Foto de perfil atualizada com sucesso!");
    },

    onError: (error) => {
      toast.error(`Erro ao atualizar foto de perfil: ${error.message}`);
    }
  });
}
