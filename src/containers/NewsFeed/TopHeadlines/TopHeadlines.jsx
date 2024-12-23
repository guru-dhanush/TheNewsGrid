import React from "react";
import { Spinner } from "../../../components/UI/Spinner/Spinner";
import Carousel from "../../../components/UI/Carousel/Carousel";

const TopHeadlines = ({ headlines }) => {
  const { items, status } = headlines;

  if (status === "error") return <div>Error: {status}</div>;
  if ((status === "succeeded" && items.length <= 0) || status === "loading")
    return;

  return (
    <div>
      <h1
        className="mb-5 font-bold text-gray-800 dark:text-gray-200"
        style={{ fontSize: "2.5rem" }}
      >
        Top Headlines
      </h1>
      <Carousel images={items} height="h-96" />
    </div>
  );
};

export default TopHeadlines;
