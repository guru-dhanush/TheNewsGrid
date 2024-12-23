import { sourcesRegistry } from "@/services/sourcesRegistry";
import { isValidArticle } from "@/services/utilis/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNewsData = createAsyncThunk(
  "fetchNews/data",
  async ({ type, queryInfo }) => {
    try {
      const sources = sourcesRegistry[type];
      if (!sources) throw new Error(`Invalid source type: ${type}`);

      const results = await Promise.all(
        Object.keys(sources).map(async (sourceKey) => {
          const source = sources[sourceKey];
          const query = await source.genQuery(queryInfo);
          const url = await source.genURL(query);
          const normalizeFn = source.genNormalizeData;
          return await source.fetchAPI(url, normalizeFn);
        })
      );

      return type === "articles"
        ? results.flat().filter(isValidArticle)
        : results.flat();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
