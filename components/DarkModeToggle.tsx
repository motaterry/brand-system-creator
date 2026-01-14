"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply saved theme on mount
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white border border-neutral-dark-40 shadow-lg"
        aria-label="Toggle dark mode"
        disabled
      >
        <Moon className="w-5 h-5 text-neutral-dark-80" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-neutral-dark-80 border border-neutral-dark-40 dark:border-neutral-dark-60 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-primary dark:text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-neutral-dark-80" />
      )}
    </button>
  );
}
