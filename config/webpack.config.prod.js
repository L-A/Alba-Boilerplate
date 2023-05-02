const config = require("./webpack.config");
const path = require("path");

module.exports = {
  ...config,
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "script.js",
    clean: true,
  },
};
