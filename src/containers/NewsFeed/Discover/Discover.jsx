import React from "react";
import {
  BentoGrid,
  BentoGridItem,
} from "../../../components/UI/BentoGrid/BentoGridUI";
import { Spinner } from "../../../components/UI/Spinner/Spinner";

export const Discover = ({ articles }) => {
  const { items, status } = articles;

  if (status === "loading") return <Spinner text={status} />;
  if (status === "error") return <div>Error: {status}</div>;

  return (
    <div>
      <h1
        className="mb-5 font-bold text-gray-800 dark:text-gray-200"
        style={{ fontSize: "2.5rem" }}
      >
        Discover
      </h1>
      {items?.length ? (
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              url={item.url}
              title={item.title}
              description={item.description}
              author={item.author}
              header={item.header}
              source={item.source}
              category={item.category}
              image={item.image}
              publishedAt={item.publishedAt}
              className={(i + 1) % 5 === 0 ? "md:col-span-2" : ""}
              isFeatured={(i + 1) % 5 === 0}
            />
          ))}
        </BentoGrid>
      ) : status === "succeeded" || status === "failed" ? (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We couldn’t find any results matching your preferences. Try updating
            your preferences or exploring other topics to discover new articles.
          </p>
        </div>
      ) : null}
    </div>
  );
};
