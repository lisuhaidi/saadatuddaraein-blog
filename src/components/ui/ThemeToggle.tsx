"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setThemeState] = React.useState("light");

  React.useEffect(() => {
    // On mount, read the theme from localStorage and update the state
    const savedTheme = localStorage.getItem("theme") || "light";
    setThemeState(savedTheme);
  }, []);

  const setTheme = (newTheme: "light" | "dark") => {
    // Update state, localStorage, and the class on the <html> element
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex items-center justify-center p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </button>
  );
}
