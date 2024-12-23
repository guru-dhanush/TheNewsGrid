import React, { useState, useEffect } from "react";
import useDebounce from "../../../core/hooks/useDebounce";

export const Searchbar = ({ onSearch, initialKeyword }) => {
  const [searchInput, setSearchInput] = useState(initialKeyword || "");
  const debouncedSearchTerm = useDebounce(searchInput, 1000);

  useEffect(() => {
    if (initialKeyword) {
      setSearchInput(initialKeyword);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm !== initialKeyword) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, initialKeyword]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (!value.trim()) {
      onSearch("");
    }
  };

  return (
    <form
      className="searchbar mx-auto"
      style={{ width: "600px", margin: "0px 10px" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full bg-gray-100 rounded-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-searchbar_bg dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search news"
          value={searchInput}
          onChange={handleInputChange}
          style={{ borderRadius: "3rem" }}
        />
      </div>
    </form>
  );
};
