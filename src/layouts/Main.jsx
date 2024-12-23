import React, { useState } from "react";
import { useTheme } from "../core/hooks/useTheme";
import Navbar from "@/components/Navbar/Navbar";

const Main = ({ left, right }) => {
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={`app ${theme}`}>
      <div className="flex flex-col h-screen">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex justify-center " style={{ overflow: "hidden" }}>
          <aside
            className={`hidden lg-custom:flex  bg-inherit dark:bg-inherit p-4 justify-end flex flex-col ${
              isMenuOpen ? "flex" : "hidden"
            }`}
            style={{ height: "600px", width: "350px" }}
          >
            {left}
          </aside>
          <main
            className="flex overflow-scroll scrollbar-none justify-center"
            style={{ width: "800px", height: "90vh" }}
          >
            {right}
          </main>
        </div>

        <div
          data-dial-init
          className="fixed bottom-6 right-6 group lg-custom:hidden"
          style={{ zIndex: 30 }}
        >
          {isMenuOpen && <div
            id="speed-dial-menu-dropdown"
            className={` ${isMenuOpen ? "block" : "hidden"}`}
          >
            <aside
              className={`w-full dark:bg-bg_grid m-4 flex rounded-xl`}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "500px",
                width: "300px",
                zIndex: "10",
              }}
            >
              {left}
            </aside>
          </div>}

          <button
            type="button"
            data-dial-toggle="speed-dial-menu-dropdown"
            aria-controls="speed-dial-menu-dropdown"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
            className="flex items-center justify-center ml-auto text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
            <span className="sr-only">Open actions menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
