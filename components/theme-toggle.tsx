"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate(n => n + 1);
  }, [theme]);

  return (
    <button
      onClick={() => {
        toggleTheme();
        setForceUpdate(n => n + 1);
      }}
      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-slate-700" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
}
