import { usePrivacy } from "@/hooks/usePrivacy";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ThemeToggle } from "@/components/ThemeToggle/themeToggle";

export function Header() {
  const { isHidden, toggleHidden } = usePrivacy();

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
          {isHidden ? <MdVisibilityOff aria-hidden="true" /> : <MdVisibility aria-hidden="true" />}
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}