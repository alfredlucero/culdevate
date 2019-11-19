const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { tsLoader, postCssLoader, devServer } = require("./webpack.config.base");

module.exports = {
  mode: "development",
  entry: "./src/Main.tsx",
  devtool: "cheap-module-source-map",
  module: {
    rules: [tsLoader, postCssLoader],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
    new HtmlWebpackPlugin({
      template: "src/templates/index.html",
      inject: true,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    // TODO: set up dotenv and separate env files for us to use eventually
    new webpack.DefinePlugin({ "process.env.API_HOST": JSON.stringify("http://localhost:3000") }),
  ],
  devServer,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};
