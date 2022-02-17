const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode,
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    port: 8080,
    open: true,
    watchFiles: ['./src/index.html']
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src', 'assets'),
          noErrorOnMissing: true, // to cancel Error message when folder is empty
        }
      ]
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};