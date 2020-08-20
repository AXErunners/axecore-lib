/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const commonJSConfig = {
  entry: ['./index.js'],
  module: {
    rules: [],
  },
  target: 'web'
};

const rawConfig = Object.assign({}, commonJSConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'axecore-lib.js',
    library: 'axecore',
    libraryTarget: 'umd',
  }
})
const uglifiedConfig = Object.assign({}, commonJSConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'axecore-lib.min.js',
    library: 'axecore',
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
})

module.exports = [rawConfig, uglifiedConfig];
