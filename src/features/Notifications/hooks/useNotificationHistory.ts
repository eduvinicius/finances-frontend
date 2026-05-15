import { useQuery } from "@tanstack/react-query";
import { adminNotificationService } from "../api/adminNotificationService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useNotificationHistory() {
  return useQuery({
    queryKey: QUERY_KEYS.adminNotifications.history(),
    queryFn: adminNotificationService.getNotificationHistory,
  });
}
