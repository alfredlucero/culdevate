const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { tsLoaderDev, postCssLoader } = require("../webpack.config.base.js");

// Merge the dev Webpack rules with the storybook one
// so we can load up TS files and styles
module.exports = ({ config }) => {
  // For PostCSS/TailwindCSS loaders
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    })
  );

  config.module.rules = [
    tsLoaderDev,
    // For Story Source Addon to work with TS
    {
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve("@storybook/source-loader"),
          options: { parser: "typescript" },
        },
      ],
      enforce: "pre",
    },
    postCssLoader,
  ];

  config.resolve = {
    extensions: [".ts", ".tsx", ".js", ".json"],
  };

  return config;
};
