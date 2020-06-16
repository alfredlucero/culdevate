const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { tsLoader, postCssLoader, devServer, prodOptimization } = require("./webpack.config.base.js");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/Main.tsx",
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [tsLoader, postCssLoader],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
    new MiniCssExtractPlugin({
      filename: "[id].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
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
    // TODO: set up dotenv and separate env files for us to use eventually
    new webpack.DefinePlugin({ "process.env.API_HOST": JSON.stringify(process.env.API_HOST) }),
  ],
  output: {
    path: path.join(__dirname, "/dist/"),
    filename: "[name].[chunkhash].js",
    sourceMapFilename: "[file].map",
    pathinfo: true,
    publicPath: "/",
  },
  devServer,
  optimization: prodOptimization,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};
