import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { getErrorMessage } from "@/lib/axiosError";
import { adminUserService } from "../api/adminUserService";

export function useDeactivateUser(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminUserService.deactivate(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminUsers.all });
      toast.success("User deactivated");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
