const webpack = require('webpack');

const base = require('webpack.base.config.js');
base.plugins.push(
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
);
module.exports = base;
