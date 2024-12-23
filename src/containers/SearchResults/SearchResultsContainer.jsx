import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../components/UI/Spinner/Spinner";
import {
  BentoGrid,
  BentoGridItem,
} from "../../components/UI/BentoGrid/BentoGridUI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchNewsData } from "@/redux/thunks/fetchNewsData";

export const SearchResultsContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const { articles, filters } = useSelector((state) => state.newsFeed);
  const { items, status } = articles;

  const fetchData = useCallback(() => {
    if (keyword?.trim()) {
      dispatch(
        fetchNewsData({
          type: "articles",
          queryInfo: [keyword, [], filters],
        })
      );
    }
  }, [keyword, filters, dispatch]);

  useEffect(() => {
    if (!keyword?.trim() && window.location.pathname !== "/") {
      navigate("/");
    }
  }, [keyword, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    dispatch(fetchNewsData({ type: "sources", queryInfo: [] }));
  }, [dispatch]);
   
  if (status === "loading") {
    return <Spinner text="Loading..." />;
  }

  if (status === "error") {
    return (
      <div className="text-red-600 dark:text-red-400">
        Error loading search results
      </div>
    );
  }

  return (
    <div className="space-y-4 m-2">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 m-0">
        Search Results
      </h1>

      {keyword ? (
        items.length > 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Showing results for:{" "}
            <strong className="text-blue-600 dark:text-blue-400">
              {keyword}
            </strong>
          </p>
        ) : (
          <div>
          <p className="text-gray-600 dark:text-gray-400">
                Sorry, we couldn't find any results for: { " "}
            <strong className="text-blue-600 dark:text-blue-400">
              {keyword}
            </strong>.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Try adjusting your search. Here are some ideas:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>Make sure all words are spelled correctly</li>
            <li>Try different search terms</li>
                <li>Try more general search terms</li>
                <li>Broaden the date range</li>
    <li>Explore different categories and sources</li>
    
          </ul>
        </div>
        
        )
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No search keyword provided. Please enter a search term to view
          results.
        </p>
      )}

      {items.length > 0 && keyword && (
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={`${item.url}-${i}`}
              {...item}
              className={(i + 1) % 5 === 0 ? "md:col-span-2" : ""}
              isFeatured={(i + 1) % 5 === 0}
            />
          ))}
        </BentoGrid>
      )}
    </div>
  );
};
