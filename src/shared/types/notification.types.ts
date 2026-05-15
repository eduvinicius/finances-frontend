export interface UserNotification {
  id: number;
  notificationId: number;
  title: string;
  body: string;
  isRead: boolean;
  readAt: string | null;
  expiresAt: string;
  createdAt: string;
}
