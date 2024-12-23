const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  devServer: {
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "articles", // Remote app name
      filename: "remoteEntry.js", // Bundle entry point
      exposes: {
        "./Articles": "./src/features/articles/ArticlesContainer", // Expose feature
      },
      shared: ["react", "react-dom"], // Shared dependencies
    }),
  ],
};
