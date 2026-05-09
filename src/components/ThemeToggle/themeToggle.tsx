import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className="text-white text-xl cursor-pointer hover:opacity-75 transition-opacity"
    >
      {theme === "dark" ? (
        <MdLightMode aria-hidden="true" />
      ) : (
        <MdDarkMode aria-hidden="true" />
      )}
    </button>
  );
}
