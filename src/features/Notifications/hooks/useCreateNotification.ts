import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axiosError";
import { adminNotificationService } from "../api/adminNotificationService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { CreateNotificationDto } from "@/shared/schemas/notification.schema";

export function useCreateNotification(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateNotificationDto) =>
      adminNotificationService.createNotification(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminNotifications.all });
      toast.success("Notificação enviada com sucesso");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
