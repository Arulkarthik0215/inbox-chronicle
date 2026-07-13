import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "orderhub-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem(KEY) as Theme | null)) || "dark";
    setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(KEY, theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}
