const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => ({
  mode: process.env.NODE_ENV || "development",
  devtool: argv.mode === "development" ? "inline-source-map" : false,
  entry: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_scripts: path.resolve(__dirname, "src/content_scripts/index.ts"),
    popup: path.resolve(__dirname, "src/popup.ts"),
    background: path.resolve(__dirname, "src/background/index.ts")
  },
  output: {
    filename: "scripts/[name].bundle.js",
    path:
      argv.mode === "development"
        ? path.resolve(__dirname, "dist")
        : path.resolve(__dirname, "build")
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [new CopyPlugin([{ from: "./public", to: "./" }])]
});
