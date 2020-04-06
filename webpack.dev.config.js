const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const DIST_PATH = resolve(__dirname, "dist");
const PUBLIC_PATH = resolve(__dirname, "public");

module.exports = {
  devServer: {
    contentBase: DIST_PATH,
    compress: true,
    historyApiFallback: true,
    port: 8000,
  },
  devtool: "source-map",
  entry: "./src/client/app.js",
  output: {
    filename: "js/[name].js",
    chunkFilename: "js/[id].[name].js",
    globalObject: "this",
    path: DIST_PATH,
    publicPath: "/",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            /* eslint-disable */
            loader: "style-loader",
            options: {
              insert: function insertBeforeAt(element) {
                const parent = document.querySelector("head");
                const target = document.querySelector("#customStyle");

                const lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;

                if (!lastInsertedElement) {
                  parent.insertBefore(element, target);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }

                window._lastElementInsertedByStyleLoader = element;
              },
            },
            /* eslint-enable */
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "url-loader",
        options: {
          limit: 100240,
          name: "images/[name].[ext]",
          publicPath: "/",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "styles/[name].[ext]",
          publicPath: "/",
        },
      },
    ],
  },
  node: { fs: "empty" },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
      chunkFilename: "styles/[id].css",
    }),
    new HtmlWebpackPlugin({
      excludeChunks: ["server"],
      template: "./src/client/html/index.html",
    }),
    new CopyPlugin([
      {
        from: DIST_PATH,
        to: PUBLIC_PATH,
        ignore: ["*.js", "*.css", "*.txt", "*.html"],
      },
    ]),
  ],
  target: "web",
  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
};
