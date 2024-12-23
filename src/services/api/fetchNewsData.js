import { toast } from "@/core/hooks/useToast";
import axios from "axios";

export const fetchNewsData = async (url, normalizeFn) => {
  try {
    const response = await axios.get(url);
    const normalizedArticles = normalizeFn(response.data);
    return normalizedArticles;
  } catch (error) {
    console.error("Error fetching news data", error);
    const code = error.response.data.code;
    if (
      code === "corsNotAllowed" ||
      code === "apiKeyInvalid" ||
      code === "rateLimited"
    ) {
      toast({
        variant: "destructive",
        title: "Error fetching news",
        description:
          error.response.data.message ||
          "Failed to fetch news data. Please try again later.",
      });
    }
    return [];
  }
};
