import { httpClient } from "@/shared/api/httpClient";
import type { UserNotification } from "@/shared/types/notification.types";

export const notificationService = {
  async getInbox(): Promise<UserNotification[]> {
    const response = await httpClient.get<UserNotification[]>("/notifications");
    return response.data;
  },

  async markAsRead(id: number): Promise<void> {
    await httpClient.patch(`/notifications/${id}/read`);
  },

  async deleteNotification(id: number): Promise<void> {
    await httpClient.delete(`/notifications/${id}`);
  },

  async markAllAsRead(): Promise<void> {
    await httpClient.patch("/notifications/read-all");
  },
};
