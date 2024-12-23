import { useState } from "react";

/**
 * A custom hook for managing state with localStorage.
 * @param {string} key - The key to store the value under in localStorage.
 * @param {any} initialValue - The initial value to use if none is found in localStorage.
 * @returns {[any, Function]} - The current value and a function to update it.
 */

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  return [storedValue, setValue];
};
