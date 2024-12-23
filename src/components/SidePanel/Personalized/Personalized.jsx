import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../../UI/Tabs/Tabs";
import Sources from "../Common/Sources";
import Categories from "../Common/Categories";
import { FiRefreshCcw } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  resetAllPreferences,
  resetPreferences,
  setPreferences,
} from "../../../redux/slices/newsFeed";
import Modal from "../../UI/Modal/Modal";
import { NEWS_CATEGORIES } from "@/constants/categories";
import { filterAuthors, toggleItemInArray } from "@/core/utils/helper";
import { useLocalStorage } from "@/core/hooks/useLocalStorage";
import { toast } from "@/core/hooks/useToast";
import Authors from "../Common/Authors";

const Personalized = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    preferences = { categories: [], sources: [], authors: [] },
    sources = { items: [] },
    articles = { items: [] },
  } = useSelector((state) => state.newsFeed);

  const [storedPreferences, setStoredPreferences] = useLocalStorage(
    "preferencesFilter",
    preferences
  );
  const [selectedPreferences, setSelectedPreferences] =
    useState(storedPreferences);

  const handleChange = () => {
    setStoredPreferences(selectedPreferences);
    dispatch(setPreferences(selectedPreferences));
    toast({
      title: (
        <div className="flex items-center gap-2">
          <AiOutlineCheckCircle size={20} />
          <span>Your preferences are updated!</span>
        </div>
      ),
      description:
        "We’ve successfully saved your news preferences. Enjoy personalized articles tailored just for you!",
      duration: 5000,
      className: "bg-green-500 text-black",
    });
  };

  useEffect(() => {
    setSelectedPreferences(preferences);
    setStoredPreferences(preferences);
  }, [preferences]);

  const handlePreferenceChange = (type, value) => {
    setSelectedPreferences((prevPreferences) => {
      const updatedPreferences = {
        ...prevPreferences,
        [type]: toggleItemInArray(prevPreferences[type], value),
      };
      return updatedPreferences;
    });
  };
  const handleConfirm = () => {
    dispatch(resetAllPreferences());
    setSelectedPreferences({ categories: [], sources: [], authors: [] });
    setStoredPreferences({ categories: [], sources: [], authors: [] });
    setModalVisible(false);
    toast({
      title: (
        <div className="flex items-center gap-2">
          <AiOutlineCheckCircle size={20} />
          <span>Preferences reset successfully!</span>
        </div>
      ),
      description:
        "Your preferences have been reset to default. You can update them again anytime.",
      duration: 5000,
      className: "bg-green-500 text-black",
    });
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  
  const tabsData = [
    {
      label: "Category",
      content: (
        <Categories
          categories={NEWS_CATEGORIES}
          state={selectedPreferences}
          onClick={(value) => handlePreferenceChange("categories", value)}
        />
      ),
      resetHandler: () => dispatch(resetPreferences({ type: "categories" })),
    },
    {
      label: "Sources",
      content: (
        <Sources
          sources={sources}
          state={selectedPreferences}
          onClick={(value) => handlePreferenceChange("sources", value)}
        />
      ),
      resetHandler: () => dispatch(resetPreferences({ type: "sources" })),
    },
    {
      label: "Author",
      content: (
        <Authors
          authors={filterAuthors(articles.items)}
          state={selectedPreferences}
          onClick={(value) => handlePreferenceChange("authors", value)}
        />
      ),
      resetHandler: () => dispatch(resetPreferences({ type: "authors" })),
    },
  ];

  const handleReset = () => {
    tabsData[activeTab]?.resetHandler?.();
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-full rounded-xl">
        <div className="w-full h-full p-4 rounded-xl shadow-input dark:shadow-none dark:bg-inherit bg-white border border-light_border_grid dark:border-dark_border_grid w-64">
          <div
            className="flex items-center justify-between mb-4"
            style={{ height: "5%" }}
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Personalized Feed
            </h2>
            <button
              className="text-sm font-medium hover:underline"
              onClick={handleReset}
            >
              <FiRefreshCcw />
            </button>
          </div>

          <Tabs
            tabs={tabsData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div style={{ height: "5%" }}>
            <div className="border-t border-gray-200 dark:border-gray-700" />
            <div className="flex">
              <button
                className="w-full py-2 text-sm font-medium hover:underline"
                onClick={() => setModalVisible(true)}
              >
                Reset all
              </button>
              <button
                className="w-full py-2 text-sm font-medium hover:underline"
                onClick={handleChange}
              >
                Apply changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={handleClose}
        title="Are you sure you want to Reset Personalized Feed?"
        description="This action cannot be undone."
        onConfirm={handleConfirm}
        confirmText="Yes, Reset it"
        cancelText="No, cancel"
      />
    </>
  );
};

export default Personalized;
