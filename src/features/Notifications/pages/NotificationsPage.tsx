import { Bell, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/Button";
import { useNotifications } from "../hooks/useNotifications";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import { useMarkAllAsRead } from "../hooks/useMarkAllAsRead";
import { useDeleteNotification } from "../hooks/useDeleteNotification";
import type { UserNotification } from "@/shared/types/notification.types";

function NotificationItem({
  notification,
  onRead,
  onDelete,
}: Readonly<{
  notification: UserNotification;
  onRead: (id: number) => void;
  onDelete: (id: number) => void;
}>) {
  return (
    <article
      className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
        notification.isRead ? "bg-background" : "bg-muted/40 border-primary/20"
      }`}
    >
      {!notification.isRead && (
        <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${notification.isRead ? "font-normal" : "font-semibold"}`}>
          {notification.title}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">{notification.body}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {!notification.isRead && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRead(notification.id)}
            aria-label="Marcar como lida"
            className="border border-input text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Marcar como lida
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(notification.id)}
          aria-label="Excluir notificação"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}

export function NotificationsPage() {
  const { data: notifications, isLoading, unreadCount } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const deleteNotification = useDeleteNotification();

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center gap-3">
        <Bell className="h-7 w-7" />
        <h1 className="text-3xl font-bold">Notificações</h1>
        {unreadCount > 0 && (
          <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
            {unreadCount} não lida{unreadCount !== 1 ? "s" : ""}
          </span>
        )}
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            disabled={markAllAsRead.isPending}
            onClick={() => markAllAsRead.mutate()}
          >
            Marcar todas como lida
          </Button>
        )}
      </header>

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={`skeleton-${i}`} className="h-20 w-full animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {isLoading === false && (notifications ?? []).length === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Nenhuma notificação.
        </p>
      )}

      {isLoading === false && (notifications ?? []).length > 0 && (
        <ul className="flex flex-col gap-3">
          {notifications?.map((n) => (
            <li key={n.id}>
              <NotificationItem
                notification={n}
                onRead={(id) => markAsRead.mutate(id)}
                onDelete={(id) => deleteNotification.mutate(id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
