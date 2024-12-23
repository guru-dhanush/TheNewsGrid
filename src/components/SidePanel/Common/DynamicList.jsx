import React from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const DynamicList = ({
  items,
  selectedItems,
  onItemClick,
  labelField,
  valueField,
  isSelectedColor = "bg-blue-100 dark:bg-gray-700",
  unselectedColor = "hover:bg-gray-200 dark:hover:bg-gray-900",
}) => {
  return (
    <ul className="space-y-3 h-70 overflow-y-scroll" style={{ height: "100%" }}>
      {items.map((item, index) => {
        const isSelected = selectedItems.includes(item[valueField]);
        return (
          <li
            key={index}
            className={`flex items-center p-1 rounded-md cursor-pointer ${
              isSelected ? isSelectedColor : unselectedColor
            }`}
            style={{
              justifyContent: "space-between",
              padding: "8px",
              margin: "10px",
            }}
            onClick={() => onItemClick(item[valueField])}
          >
            <div className="flex">
              <span className="ml-3 text-gray-800 dark:text-gray-200">
                {item[labelField]}
              </span>
            </div>
            <span
              className={`ml-3 text-gray-800 dark:text-gray-200 pr-2 ${
                isSelected ? "text-blue-600 dark:text-blue-400" : ""
              }`}
            >
              <MdOutlineAddCircleOutline style={{ cursor: "pointer" }} />
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default DynamicList;
