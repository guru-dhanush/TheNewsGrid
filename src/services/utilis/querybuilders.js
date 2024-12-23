import {
  buildQuery,
  DEFAULT_FROM,
  DEFAULT_TO,
  formatArray,
  mergeArrays,
} from "./helper";

const buildApiQuery =
  (api) =>
  ([q, preferences = {}, filters = {}]) => {
    const { categories: prefCategories = [], sources: prefSources = [] } =
      preferences;
    const {
      categories: filterCategories = [],
      sources: filterSources = [],
      from = DEFAULT_FROM,
      to = DEFAULT_TO,
    } = filters;

    const categories = mergeArrays(prefCategories, filterCategories);
    const sources = mergeArrays(prefSources, filterSources);

    const queryConfigs = {
      guardian: {
        params: {
          q,
          "from-date": from,
          "to-date": to,
          "page-size": 20,
          section: formatArray(categories),
          "production-office": formatArray(sources),
          "show-elements": "image",
        },
      },
      nyt: {
        params: {
          q,
          begin_date: from.replace(/-/g, ""),
          end_date: to.replace(/-/g, ""),
          fq:
            sources.length || categories.length
              ? `${
                  categories.length
                    ? `${formatArray(categories)}`
                    : ""
                }
           ${sources.length ? `${formatArray(sources)}` : ""}`.trim()
              : "",
        },
      },
      newsOrg: {
        params: {
          q: categories.length
            ? formatArray([...categories, q], "+")
            : q || "general",
          from,
          to,
          // sortBy: "popularity",
          sources: formatArray(sources),
        },
      },
    };

    return buildQuery(queryConfigs[api].params);
  };

export const guardianQueryParams = buildApiQuery("guardian");
export const nytQueryParams = buildApiQuery("nyt");
export const newsOrgQueryParams = buildApiQuery("newsOrg");
