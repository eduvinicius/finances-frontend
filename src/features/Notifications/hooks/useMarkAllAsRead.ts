import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../api/notificationService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { getErrorMessage } from "@/lib/axiosError";
import { toast } from "sonner";

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications.inbox() });
      toast.success("Todas as notificações foram marcadas como lidas");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
