const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const { NODE_ENV = 'development' } = process.env;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  }
});
