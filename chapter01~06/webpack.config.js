const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./client"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "react-hot-loader/babel",
            "@babel/plugin-proposal-class-properties",
          ],
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "react"),
    filename: "app.js",
    publicPath: "/react",
  },
};
