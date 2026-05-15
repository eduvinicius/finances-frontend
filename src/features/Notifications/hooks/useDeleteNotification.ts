import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../api/notificationService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { getErrorMessage } from "@/lib/axiosError";
import { toast } from "sonner";

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => notificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications.inbox() });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
