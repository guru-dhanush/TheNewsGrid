export const normalizeNewsApiArticle = (data) => {
  const articles = data?.articles || [];
  return articles.map((article) => {
    const {
      source: { name: source = "" } = {},
      author = "",
      title = "",
      description = "",
      url = "",
      urlToImage: image = "",
      publishedAt = null,
      content = "",
    } = article;

    return {
      title,
      description,
      author,
      image,
      url,
      source,
      publishedAt,
      content,
    };
  });
};

// Normalize article for Guardian API
export const normalizeGuardianArticle = (data) => {
  const articles = data?.response?.results || [];
  return articles.map((article) => {
    const {
      webTitle: title = "",
      webUrl: url = "",
      sectionId: category = "General",
      webPublicationDate: publishedAt = null,
      elements = [],
    } = article;

    const mainElement =
      elements.find((el) => el.relation === "thumbnail") || {};
    const assets = mainElement.assets || [];
    const mainAsset = assets[0] || {};
    const {
      secureFile: image = "",
      altText: imageAltText = "",
      source,
    } = mainAsset.typeData || {};

    return {
      title,
      description: null,
      author: null,
      image,
      imageAltText,
      url,
      source: "the guardian",
      category,
      publishedAt,
    };
  });
};

// Normalize article for News API org
export const normalizeNewsApiSource = (data) => {
  const sources = data?.sources || [];
  return sources.map((source) => {
    const {
      value = source.id || "",
      label = source.name || "",
      description = source.description || "",
      category = source.category || "",
    } = source;

    return {
      value,
      label,
      description,
      category,
    };
  });
};

// Normalize article for Nyt API org
export const normalizeNycApiArticle = (data) => {
  const articles = Array.isArray(data.response?.docs) ? data.response.docs : [];
  return articles?.map((article) => {
    const {
      title = article?.headline?.main || "",
      description = article?.abstract || "",
      author = article?.byline?.original || "",
      image = article.multimedia[0]?.url ? `https://www.nytimes.com/${article.multimedia[0]?.url}` : "",
      url = article?.web_url || "#",
      source = article?.source || "",
      publishedAt = article?.pub_date || "",
      category = article?.section_name || article.subsection_name || "",
    } = article;
    return {
      title,
      description,
      author,
      image,
      url,
      source,
      publishedAt,
      category,
    };
  });
};
