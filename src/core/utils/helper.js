// Utility function to toggle items in an array
export const toggleItemInArray = (array, item) =>
    array.includes(item)
      ? array.filter((current) => current !== item)
    : [...array, item];
      

 export const formatDate = (date) => {
    const dateValue = new Date(date)
    const yyyy = dateValue?.getFullYear();
    const mm = String(dateValue?.getMonth() + 1).padStart(2, "0");
    const dd = String(dateValue?.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};
  
export const filterAuthors = (articles) => {
  const seen = new Set();
  return articles
    .filter(
      (article) => article.author && article.author !== "Unknown Author"
    )
    .reduce((uniqueAuthors, { author }) => {
      if (!seen.has(author)) {
        seen.add(author);
        uniqueAuthors.push({ label: author, value: author });
      }
      return uniqueAuthors;
    }, []);
};
