const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const fileLoader = {
  exclude: [
    /\.html$/,
    /\.(js|jsx|ts|tsx)$/,
    /\.css$/,
    /\.scss$/,
    /\.json$/,
    /\.less$/,
  ],
  loader: "file-loader",
  query: {
    name: "static/media/[name].[hash:8].[ext]",
    outputPath: "dist/",
  },
};

const tsLoaderDev = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: path.resolve(__dirname, "./src"),
  exclude: /node_modules/,
  use: [
    {
      loader: "ts-loader",
      options: {
        // No type-checking to speed up builds
        // May also be necessary to load up storybook source
        transpileOnly: true,
        experimentalWatchApi: true,
      },
    },
  ],
};

const tsLoader = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: path.resolve(__dirname, "./src"),
  exclude: /node_modules/,
  use: [
    {
      loader: "ts-loader",
    },
  ],
};

const postCssLoader = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      // Extracts CSS into separate files; CSS file per JS file which contains CSS
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true,
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
};

const devServer = {
  contentBase: [path.join(__dirname, "./dist/")],
  compress: true,
  port: 8080,
  historyApiFallback: true,
  disableHostCheck: true,
  stats: "minimal",
  overlay: {
    warnings: true,
    errors: true,
  },
};

const prodServer = {
  contentBase: path.join(__dirname, "./dist"),
  compress: true,
  port: 8080,
  historyApiFallback: true,
  disableHostCheck: true,
  stats: {
    children: false,
  },
  overlay: {
    warnings: true,
    errors: true,
  },
  inline: false,
};

const prodOptimization = {
  runtimeChunk: "single",
  splitChunks: {
    chunks: "all",
  },
};

module.exports = {
  fileLoader,
  tsLoaderDev,
  tsLoader,
  postCssLoader,
  devServer,
  prodServer,
  prodOptimization,
};
