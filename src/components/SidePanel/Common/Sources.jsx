import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DynamicList from "./DynamicList";
import { Spinner } from "../../UI/Spinner/Spinner";
import { fetchNewsData } from "@/redux/thunks/fetchNewsData";
import { NEWS_DEFAULT_SOURCES } from "@/constants/categories";

const Sources = ({ onClick, state, sources }) => {

  const { items: NEWS_SOURCES, status } = sources;


  if (status === "loading")
    return (
      <div className="flex justify-center align-center w-full h-full">
        <Spinner text={status} />
      </div>
    );
  if (status === "error") return <div>Error: {status}</div>;

  const selectedSources = [...NEWS_DEFAULT_SOURCES,...NEWS_SOURCES].flat().filter((topic) =>
    state.sources.includes(topic.value)
  );
  const unselectedSources = [...NEWS_DEFAULT_SOURCES,...NEWS_SOURCES].filter(
    (topic) => !state.sources.includes(topic.value)
  );

  const items = [...selectedSources, ...unselectedSources];

  return (
    <>
      {items?.length > 0 ? (
        <DynamicList
          items={items}
          selectedItems={state.sources}
          onItemClick={onClick}
          labelField="label"
          valueField="value"
        />
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          No source found.
        </p>
      )}
    </>
  );
};

export default Sources;
