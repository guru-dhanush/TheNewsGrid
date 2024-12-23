import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../UI/Modal/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Tabs from "../../UI/Tabs/Tabs";
import Sources from "../Common/Sources";
import Categories from "../Common/Categories";
import DateRangePicker from "../../UI/Calendar/DateRangePicker";
import {
  resetAllFilters,
  resetDateRange,
  resetFilters,
  setFilters,
} from "@/redux/slices/newsFeed";
import { NEWS_CATEGORIES } from "../../../constants/categories";
import { FiRefreshCcw } from "react-icons/fi";
import { formatDate, toggleItemInArray } from "@/core/utils/helper";
import { toast } from "@/core/hooks/useToast";

const Filters = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const { filters, sources } = useSelector((state) => state.newsFeed);
  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState(filters);

  const handleConfirmChange = () => {
    dispatch(setFilters(filter));
    toast({
      title: (
        <div className="flex items-center gap-2">
          <AiOutlineCheckCircle size={20} />
          <span>Filter updated successfully!</span>
        </div>
      ),
      description:
        "Your filters have been updated. Explore articles tailored to your applied filters.",
      duration: 5000,
      className: "bg-blue-500 text-black",
    });
  };

  const handleDateChange = (dates) => {
    if (!dates || !dates?.from || !dates?.to) return;

    setFilter((prevFilter) => {
      const { from, to } = dates;
      const updatedFilter = {
        ...prevFilter,
        from: formatDate(from),
        to: formatDate(to),
      };

      return updatedFilter;
    });
  };

  const handleConfirm = () => {
    dispatch(resetAllFilters());
    setModalVisible(false);
    toast({
      title: (
        <div className="flex items-center gap-2">
          <AiOutlineCheckCircle size={20} />
          <span>All filters reset successfully!</span>
        </div>
      ),
      description:
        "All filters have been reset to default. You can customize them again anytime.",
      duration: 5000,
      className: "bg-blue-500 text-black",
    });
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleFilterChange = (type, value) => {
    setFilter((prevFilter) => {
      const updatedFilter = {
        ...prevFilter,
        [type]: toggleItemInArray(prevFilter[type], value),
      };
      return updatedFilter;
    });
  };

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    setEndDate(formatDate(today));
    setStartDate(formatDate(sevenDaysAgo));
  }, []);

  const tabsData = [
    {
      label: "Sources",
      content: (
        <Sources
          sources={sources}
          state={filter}
          onClick={(value) => handleFilterChange("sources", value)}
          Filters
        />
      ),
      resetHandler: () => dispatch(resetFilters({ type: "sources" })),
    },
    {
      label: "Category",
      content: (
        <Categories
          categories={NEWS_CATEGORIES}
          state={filter}
          onClick={(value) => handleFilterChange("categories", value)}
        />
      ),
      resetHandler: () => dispatch(resetFilters({ type: "categories" })),
    },
    {
      label: "Date",
      content: (
        <DateRangePicker
          initialStartDate={startDate}
          initialEndDate={endDate}
          onDateChange={handleDateChange}
          placeholder="Select date range"
          className="my-4"
        />
      ),
      resetHandler: () => dispatch(resetDateRange()),
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
            className="flex items-center justify-between mb-4 flex justify-center"
            style={{ height: "5%" }}
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ">
              Filters
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
                onClick={handleConfirmChange}
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
        title="Are you sure you want to Reset Filters Feed?"
        description="This action cannot be undone."
        onConfirm={handleConfirm}
        confirmText="Yes, Reset it"
        cancelText="No, cancel"
      />
    </>
  );
};

export default Filters;
