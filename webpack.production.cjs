const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require('./webpack.common.cjs');

module.exports = merge(commonConfig, {
  entry: {
    lib: path.join(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'text-input-mask.min.js',
    library: {
      type: 'umd',
    },
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins:
    process.env.BUNDLE_ANALYZE === 'true' ? [new BundleAnalyzerPlugin()] : [],
});
