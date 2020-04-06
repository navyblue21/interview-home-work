const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const DIST_PATH = path.resolve(__dirname, "dist");

module.exports = {
  entry: {
    server: "./src/server/index.js",
  },
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
        test: /\.(png)$/i,
        loader: "url-loader",
        options: {
          name: "images/[name].[ext]",
          publicPath: "/public/",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "styles/[name].[ext]",
          publicPath: "/public/",
        },
      },
    ],
  },
  node: {
    fs: "empty",
    __filename: true,
    __dirname: true,
  },
  optimization: {
    minimize: true,
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
      template: "./src/client/html/index.html",
    }),
  ],
  target: "node",
  externals: [nodeExternals()],
  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
};
