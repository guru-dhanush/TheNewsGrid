export const isValidArticle = (article) => {
  try {
    const hasValidImage =
      article?.image &&
      typeof article?.image === "string" &&
      article?.image?.trim() !== "";

    const hasValidTitle =
      article?.title && article?.title?.trim() !== "[Removed]";

    return hasValidImage && hasValidTitle;
  } catch (error) {
    return false;
  }
};

export const sortArticles = (articles) =>
  articles.sort((a, b) => {
    if (!a.image && b.image) return 1;
    if (a.image && !b.image) return -1;
    return 0;
  });

export const TODAY = new Date();
export const WEEK_AGO = new Date(TODAY.getTime() - 7 * 24 * 60 * 60 * 1000);
export const DEFAULT_FROM = WEEK_AGO.toISOString().split("T")[0];
export const DEFAULT_TO = TODAY.toISOString().split("T")[0];

export const buildQuery = (params) =>
  Object.entries(params)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

export const mergeArrays = (arr1 = [], arr2 = []) => [
  ...new Set([...arr1, ...arr2]),
];

export const formatArray = (arr, separator = ",") =>
  arr.filter(Boolean).join(separator);
