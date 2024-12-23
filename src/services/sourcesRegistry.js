import ENV from "../config/env";
import {
  guardianQueryParams,
  newsOrgQueryParams,
  nytQueryParams,
} from "./utilis/querybuilders";
import {
  normalizeGuardianArticle,
  normalizeNewsApiArticle,
  normalizeNewsApiSource,
  normalizeNycApiArticle,
} from "./adapters/articleData";
import { fetchNewsData } from "./api/fetchNewsData";

export const sourcesRegistry = {
  articles: {
    newsAPI: {
      name: "NewsAPI",
      fetchAPI: fetchNewsData,
      genURL: (query) => {
        return `https://newsapi.org/v2/everything?${query}&apiKey=${ENV.NEWS_API_KEY}&pageSize=20`;
      },
      genNormalizeData: normalizeNewsApiArticle,
      genQuery: newsOrgQueryParams,
    },
    theGuardian: {
      name: "The Guardian",
      fetchAPI: fetchNewsData,
      genURL: (query) => {
        return `https://content.guardianapis.com/search?${query}&api-key=${ENV.GUARDIAN_API_KEY}`;
      },
      genNormalizeData: normalizeGuardianArticle,
      genQuery: guardianQueryParams,
    },
    nyt: {
      name: "The New York Times",
      fetchAPI: fetchNewsData,
      genURL: (query) => {
        return `https://api.nytimes.com/svc/search/v2/articlesearch.json?${query}&api-key=${ENV.NYT_API_KEY}`;
      },
      genNormalizeData: normalizeNycApiArticle,
      genQuery: nytQueryParams,
    },
  },
  sources: {
    newsAPI: {
      name: "NewsAPI",
      fetchAPI: fetchNewsData,
      genURL: (query) => {
        return `https://newsapi.org/v2/top-headlines/sources?${query}&apiKey=${ENV.NEWS_API_KEY}&pageSize=20`;
      },
      genNormalizeData: normalizeNewsApiSource,
      genQuery: newsOrgQueryParams,
    },
  },
  headlines: {
    newsAPI: {
      name: "NewsAPI",
      fetchAPI: fetchNewsData,
      genURL: () => {
        return `https://newsapi.org/v2/top-headlines?country=us&apiKey=${ENV.NEWS_API_KEY}&pageSize=15`;
      },
      genNormalizeData: normalizeNewsApiArticle,
      genQuery: newsOrgQueryParams,
    },
  },
};
