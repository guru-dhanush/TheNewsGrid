export const normalizeNewsApiArticle = (data) => {
  const articles = data?.articles || [];
  return articles.map((article) => {
    const {
      source: { name: source = "Unknown Source" } = {},
      author = "Unknown Author",
      title = "No Title Available",
      description = "No Description Available",
      url = "",
      urlToImage: image = "",
      publishedAt = null,
      content = "No Content Available",
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
      webTitle: title = "No title available",
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
      altText: imageAltText = "No description available",
      source = "Unknown source",
    } = mainAsset.typeData || {};

    return {
      title,
      description: null,
      author: null,
      image,
      imageAltText,
      url,
      source,
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
      label = source.name || "Unknown source",
      description = source.description || "No Description Available",
      category = source.category || "general",
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
      title = article?.headline.main || "Untitled",
      description = article?.abstract || "No description available",
      author = article?.byline?.original || "",
      image = `https://www.nytimes.com/${article.multimedia[0].url}` || "",
      url = article?.web_url || "#",
      source = article?.source || "",
      publishedAt = article?.pub_date || "",
      category = article?.section_name || article.subsection_name || "",
    } = article;

    console.log({
      title,
      description,
      author,
      image,
      url,
      source,
      publishedAt,
      category,
    });

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
