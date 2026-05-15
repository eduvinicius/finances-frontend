import { httpClient } from "@/shared/api/httpClient";
import type { CreateNotificationDto } from "@/shared/schemas/notification.schema";

export interface AdminNotificationResponse {
  id: number;
  title: string;
  body: string;
  targetingMode: "AllUsers" | "SingleUser" | "SelectedUsers";
  deliveryChannel: "InApp" | "Email" | "Both";
  createdAt: string;
}

export const adminNotificationService = {
  async createNotification(dto: CreateNotificationDto): Promise<void> {
    await httpClient.post("/admin/notifications", dto);
  },

  async getNotificationHistory(): Promise<AdminNotificationResponse[]> {
    const response = await httpClient.get<AdminNotificationResponse[]>(
      "/admin/notifications/history"
    );
    return response.data;
  },
};
