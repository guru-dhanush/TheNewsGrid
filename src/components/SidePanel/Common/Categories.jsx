import React from "react";
import DynamicList from "./DynamicList";

const Categories = ({ onClick, state, categories }) => {
  // Separate selected and unselected categories
  const selectedCategories = categories.filter((topic) =>
    state.categories.includes(topic.value)
  );
  const unselectedCategories = categories.filter(
    (topic) => !state.categories.includes(topic.value)
  );

  const items = [...selectedCategories, ...unselectedCategories];
  return (
    <>
      {items?.length > 0 ? (
        <DynamicList
          items={items}
          selectedItems={state.categories}
          onItemClick={onClick}
          labelField="label"
          valueField="value"
        />
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          No Category found.
        </p>
      )}
    </>
  );
};

export default Categories;
