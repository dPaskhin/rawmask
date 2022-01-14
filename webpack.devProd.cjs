const { merge } = require('webpack-merge');

const { mode, devtool, optimization } = require('./webpack.production.cjs');
const developmentConfig = require('./webpack.development.cjs');

module.exports = merge(developmentConfig, {
  mode,
  devtool,
  optimization,
});
