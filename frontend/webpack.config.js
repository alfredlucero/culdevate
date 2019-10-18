const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/Main.tsx",
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
    new HtmlWebpackPlugin({
      template: "src/templates/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
  ],
  output: {
    path: __dirname + "/dist",
    filename: "dist/[name].[contenthash].js",
    // Specifies base path for all the assets within your application
    publicPath: "/",
  },
  devServer: {
    port: 8080,
    // Redirects 404s to /index.html file
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            // Extracts CSS into separate files; CSS file per JS file which contains CSS
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          {
            // Interprets @import and url() like import/require()
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            // Process CSS with PostCSS for plugins like TailwindCSS
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        ],
      },
    ],
  },
};
