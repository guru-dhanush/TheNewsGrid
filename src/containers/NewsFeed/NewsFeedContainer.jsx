import { useLocalStorage } from "@/core/hooks/useLocalStorage";
import { Discover } from "./Discover/Discover";
import TopHeadlines from "./TopHeadlines/TopHeadlines";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences } from "@/redux/slices/newsFeed";
import { fetchNewsData } from "@/redux/thunks/fetchNewsData";

const NewsFeedContainer = () => {
  const dispatch = useDispatch();
  const { articles ={items: []}, headlines, source, keyword,preferences = { categories: [], sources: [] , authors: []}} = useSelector(
    (state) => state.newsFeed
  );

  const [storedValue] = useLocalStorage("preferencesFilter", preferences);
  const [isPreferencesSet, setPreferencesSet] = React.useState(false);

  useEffect(() => {
    if (storedValue) {
      dispatch(setPreferences(storedValue));
      setPreferencesSet(true);
    }
  }, [dispatch, storedValue]);
  
  useEffect(() => {
    dispatch(fetchNewsData({ type: "sources", queryInfo: [] }));
  }, [dispatch]);

  useEffect(() => {
    if (isPreferencesSet) {
      dispatch(
        fetchNewsData({
          type: "articles",
          queryInfo: [keyword, preferences, []],
        })
      );
      dispatch(
        fetchNewsData({
          type: "headlines",
          queryInfo: [keyword, preferences, []],
        })
      );
    }
  }, [dispatch, source, preferences, keyword, isPreferencesSet]);

  const filteredArticles = useMemo(() => {
    if (!preferences.authors.length) return articles.items;

    return articles.items.filter((article) =>
      preferences.authors.includes(article.author)
    );
  }, [articles.items, preferences.authors]);

  return (
    <div className="flex flex-col m-2">
      {headlines?.items?.length ? <TopHeadlines headlines={headlines} /> : null}
      <Discover articles={{ ...articles, items: filteredArticles }} />
    </div>
  );
};

export default NewsFeedContainer;
