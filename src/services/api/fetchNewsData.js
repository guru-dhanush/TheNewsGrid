import { toast } from "@/core/hooks/useToast";
import axios from "axios";

export const fetchNewsData = async (url, normalizeFn) => {
  try {
    const response = await axios.get(url);
    const normalizedArticles = normalizeFn(response.data);
    return normalizedArticles;
  } catch (error) {
    console.error("Error fetching news data", error);
    const data = error?.response?.data;
     const code = data?.code || data?.fault?.detail?.errorcode;     
    toast({
      variant: "destructive",
      title: "Error fetching news",
      description: 
        ["corsNotAllowed", "apiKeyInvalid", "rateLimited", "Invalid ApiKey","oauth.v2.InvalidApiKey","policies.ratelimit.QuotaViolation"].includes(code) 
          ? data?.message ||data?.fault?.faultstring ||"Failed to fetch news data." 
          : "An unexpected error occurred.",
    });
    return [];
  }
};
