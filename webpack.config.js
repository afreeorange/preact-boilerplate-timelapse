const path = require("path");
const outputFolder = "./dist";

module.exports = {
  mode: !process.env.DEBUG ? 'development' : 'production',
  entry: [
    './src/App.js',
  ],
  module: {},
  output: {
    path: path.resolve(__dirname, outputFolder),
    publicPath: '/',
    filename: 'App.js',
  },
  plugins: [],
  devServer: {
    contentBase: path.resolve(__dirname, outputFolder),
    compress: true,
    port: 9000,
  },
}
