import React from "react";

const Theme = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-300 focus:outline-none bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {theme === "light" ? "🌞" : "🌙"}
    </button>
  );
};

export default Theme;
