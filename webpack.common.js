//webpack.common.js
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "assets", to: "." }],
    }),
    new HtmlWebpackPlugin({ template: "./src/html/index.html", hash: true }),
  ],
  mode: "development",
  entry: {
    main: "./src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-bundle.[contenthash].js", //
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      // Files
      {
        test: /\.(png|jp(e*)g|svg|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
      // SCSS
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
