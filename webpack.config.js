const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  entry: {
    'app': path.resolve(__dirname, 'src', 'index.ts'),
    'service-worker': path.resolve(__dirname, 'src', 'service-worker.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode,
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  devServer: {
    port: 8080,
    open: true,
    watchFiles: ['./src/index.html']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
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
};