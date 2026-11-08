"use client";

import { Sun } from "lucide-react";
import { useEffect } from "react";

type Theme = "morning" | "night";
const THEME_STORAGE_KEY = "parichayam-theme";

export function ThemeToggle() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const localHour = new Date().getHours();
    const initialTheme =
      savedTheme === "morning" || savedTheme === "night"
        ? savedTheme
        : localHour >= 18 || localHour < 6
          ? "night"
          : "morning";

    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "night" ? "morning" : "night";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Morning Garden and Night Courtyard themes"
      title="Toggle Morning Garden and Night Courtyard themes"
    >
      <Sun size={17} />
      <span>Theme</span>
    </button>
  );
}
