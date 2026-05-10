import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { getErrorMessage } from "@/lib/axiosError";
import { adminUserService } from "../api/adminUserService";

interface ChangeRoleVariables {
  id: string;
  role: number;
}

export function useChangeUserRole(): UseMutationResult<void, Error, ChangeRoleVariables> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: ChangeRoleVariables) => adminUserService.changeRole(id, role),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminUsers.all });
      toast.success("Role updated successfully");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
