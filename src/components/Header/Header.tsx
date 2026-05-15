import { usePrivacy } from "@/hooks/usePrivacy";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ThemeToggle } from "@/components/ThemeToggle/themeToggle";
import { NotificationBell } from "@/features/Notifications/components/NotificationBell";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function Header() {
  const { isHidden, toggleHidden } = usePrivacy();
  const { isAdmin } = useAuth();

  return (
    <header className="p-4 mb-2 w-full border-b border-b-(--header-border) bg-(--header-bg) shadow-sm flex items-center justify-between">
      <img
        src="/src/assets/img/fin-verso-logo.png"
        alt="FinVerso Logo"
        className="h-8 w-auto"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleHidden}
          aria-label={isHidden ? "Mostrar valores" : "Ocultar valores"}
          className="text-white text-xl cursor-pointer hover:opacity-75 transition-opacity"
        >
          {!isAdmin && (isHidden ? <MdVisibilityOff aria-hidden="true" /> : <MdVisibility aria-hidden="true" />)}
        </button>
        {!isAdmin && <NotificationBell />}
        <ThemeToggle />
      </div>
    </header>
  );
}