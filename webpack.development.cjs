const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common.cjs');

module.exports = merge(commonConfig, {
  entry: {
    example: path.join(__dirname, 'example', 'index.ts'),
  },
  output: { path: path.join(__dirname, 'exampleBuild') },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    port: 8_080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'example', 'index.html'),
    }),
  ],
});
