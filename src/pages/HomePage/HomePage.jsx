import withErrorBoundary from "../../components/ErrorBoundary/withErrorBoundary";
import NewsFeedContainer from "../../containers/NewsFeed/NewsFeedContainer";
import React from "react";
import MainLayout from "../../layouts/Main";
import Personalized from "../../components/SidePanel/Personalized/Personalized";

const SafeNewsFeedContainer = withErrorBoundary(
  NewsFeedContainer,
  <h2>Failed to load news!</h2>
);
export default function HomePage() {
  return (
    <MainLayout right={<SafeNewsFeedContainer />} left={<Personalized />} />
  );
}
