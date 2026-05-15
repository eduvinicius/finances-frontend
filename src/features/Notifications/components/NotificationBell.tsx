import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { useNotifications } from "../hooks/useNotifications";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import { USER_ROUTES } from "@/shared/constants/routes.cons";
import type { UserNotification } from "@/shared/types/notification.types";

export function NotificationBell() {
  const navigate = useNavigate();
  const { data: notifications, unreadCount } = useNotifications();
  const markAsRead = useMarkAsRead();

  const recent = (notifications ?? []).slice(0, 5);

  const handleItemClick = (notification: UserNotification) => {
    if (!notification.isRead) {
      markAsRead.mutate(notification.id);
    }
    navigate(USER_ROUTES.NOTIFICATIONS);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Notificações${unreadCount > 0 ? `, ${unreadCount} não lidas` : ""}`}
          className="relative text-white text-xl cursor-pointer hover:opacity-75 transition-opacity"
        >
          <Bell aria-hidden="true" className="h-5 w-5" />
          {unreadCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-semibold text-sm">Notificações</span>
          {unreadCount > 0 && (
            <span className="text-xs text-muted-foreground">{unreadCount} não lida{unreadCount !== 1 ? "s" : ""}</span>
          )}
        </div>
        <ul className="divide-y max-h-72 overflow-y-auto">
          {recent.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">
              Nenhuma notificação
            </li>
          )}
          {recent.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => handleItemClick(n)}
                className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-2">
                  {!n.isRead && (
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                  <div className={!n.isRead ? "" : "pl-4"}>
                    <p className={`text-sm truncate ${!n.isRead ? "font-semibold" : "font-normal"}`}>
                      {n.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{n.body}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: ptBR })}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t px-4 py-2">
          <button
            type="button"
            onClick={() => navigate(USER_ROUTES.NOTIFICATIONS)}
            className="w-full text-center text-xs text-primary hover:underline"
          >
            Ver todas
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
