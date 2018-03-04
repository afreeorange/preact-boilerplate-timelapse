const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const outputFolder = './dist';
const IndexTemplate = new HTMLPlugin({
  template: './src/index.html',
  favicon: './src/favicon.ico',
  minify: {
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
  },
});
const CSSExtractor = new ExtractTextPlugin('App.css');

module.exports = {
  entry: [
    './src/App.js',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ['transform-react-jsx', { pragma: 'h' }],
              ],
            },
          }, // babel-loader
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          }, // eslint-loader
        ],
      }, // Javascript

      {
        test: /\.(sass|css)$/,
        use: CSSExtractor.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            'sass-loader',
          ],
        }),
      }, // Styles

      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader',
      }, // Assets
    ],
  },
  output: {
    path: path.resolve(__dirname, outputFolder),
    publicPath: '/',
    filename: 'App.js',
  },
  plugins: [
    new CleanWebpackPlugin([outputFolder]),
    CSSExtractor,
    IndexTemplate,
    new UglifyJSPlugin(),
    new StyleLintPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, outputFolder),
    compress: true,
    port: 9000,
  },
};
