const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   mode: "development",
   devtool: 'cheap-module-source-map',
   entry: {
      popup: "./src/popup.js",
      content: "./src/content.js",
      background: "./src/background.js",
   },
   output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].js",
      clean: true
   },
   plugins: [
      new CopyWebpackPlugin({
         patterns: [
            {from: "./chrome/manifest.json"},
         ]
      }),
      new HtmlWebpackPlugin({
         template: "./src/popup.html",
         inject: false
      }),
   ],
   module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|ttf)$/,
          type: "asset/inline",
        },
      ]
    },
   resolve: {
      fallback: {
         fs: false,
      },
   }
};