import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function TopBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={toggleTheme}
        className="
          p-2 rounded-xl
          bg-gray-200 dark:bg-gray-800
          text-gray-800 dark:text-gray-100
          hover:scale-105 transition
        "
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
