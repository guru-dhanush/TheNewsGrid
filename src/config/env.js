const ENV = {
  NEWS_API_KEY:import.meta.env.VITE_APP_NEWSAPI_KEY || "7f5f8314aa8c428892fba11e7d03648d",
  GUARDIAN_API_KEY:import.meta.env.VITE_APP_GUARDIAN_API_KEY ||"fd4e52f5-3d17-4fda-846f-2c261cffc516",
  NYT_API_KEY:import.meta.env.VITE_APP_NYT_API_KEY || "fd4e52f5-3d17-4fda-846f-2c261cffc516",
};

export default ENV;
