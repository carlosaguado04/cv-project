"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cv-theme";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const handleToggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.classList.remove("hp-theme");
    localStorage.setItem("hp-theme", "off");
    localStorage.setItem(STORAGE_KEY, next);
  };

  const label = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-full border border-border/60 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground"
      aria-label="Toggle theme"
    >
      {label}
    </button>
  );
}
