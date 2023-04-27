const config = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  ...config,
  entry: ["./config/preview.ts", "./src/index"],
  plugins: [
    new HtmlWebpackPlugin({
      title: "Alba dev mode",
    }),
  ],
  mode: "development",
  devServer: {
    port: 3000,
    hot: false,
    open: true,
    client: {
      logging: "none",
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
