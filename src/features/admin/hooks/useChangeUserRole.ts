import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { getErrorMessage } from "@/lib/axiosError";
import { adminUserService } from "../api/adminUserService";
import { UserRole } from "@/shared/enums/userRoleEnum";

interface ChangeRoleVariables {
  id: string;
  role: UserRole;
}

export function useChangeUserRole(): UseMutationResult<void, Error, ChangeRoleVariables> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: ChangeRoleVariables) => adminUserService.changeRole(id, role),

    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminUsers.detail(id) });
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.adminUsers.all, 'list'] });
      toast.success("Função alterada com sucesso");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
