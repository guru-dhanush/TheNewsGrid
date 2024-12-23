import React from "react";
import MainLayout from "../../layouts/Main";
import { SearchResultsContainer } from "../../containers/SearchResults/SearchResultsContainer";
import Filters from "../../components/SidePanel/Filters/Filters";
import withErrorBoundary from "@/components/ErrorBoundary/withErrorBoundary";

const SafeSearchResultsContainer = withErrorBoundary(
  SearchResultsContainer,
  <h2>Something went wrong while fetching the news.</h2>
);

const SearchResults = () => {
  return (
    <>
      <MainLayout right={<SafeSearchResultsContainer />} left={<Filters />} />
    </>
  );
};

export default SearchResults;
