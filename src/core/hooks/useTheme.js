import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
  const [storedTheme, setStoredTheme] = useLocalStorage("theme", "light");
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
