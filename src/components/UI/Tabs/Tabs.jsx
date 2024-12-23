import React, { useState } from "react";

const Tabs = ({ tabs, activeTab, onTabChange }) => {

  return (
    <div className="flex flex-col items-center" style={{ height: "85%" ,overflow:"hidden"}}>
      <div
        className="flex bg-gray-100 hover:bg-gray-200 rounded-full	 transition p-1 dark:bg-neutral-700 dark:hover:bg-neutral-600"
        style={{ width: "max-content" ,height:"10%"}}
      >
        <nav
          className="flex gap-x-1 rounded-full"
          aria-label="Tabs"
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              type="button"
              className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full	 transition 
                ${
                  activeTab === index
                    ? "bg-white text-gray-700"
                    : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-white dark:focus:text-white"
                }`}
              id={`tab-${index}`}
              aria-selected={activeTab === index}
              data-hs-tab={`#content-${index}`}
              aria-controls={`content-${index}`}
              role="tab"
              onClick={() => onTabChange(index)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-5" style={{ width: "100%",overflow:"hidden" ,height:"80%"}}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            id={`content-${index}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            className={activeTab === index ? "" : "hidden"}
             style={{ height: "100%" }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
