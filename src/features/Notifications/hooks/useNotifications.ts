import { useQuery } from "@tanstack/react-query";
import { notificationService } from "../api/notificationService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useNotifications() {
  const query = useQuery({
    queryKey: QUERY_KEYS.notifications.inbox(),
    queryFn: notificationService.getInbox,
  });

  const unreadCount = query.data?.filter((n) => !n.isRead).length ?? 0;

  return { ...query, unreadCount };
}
