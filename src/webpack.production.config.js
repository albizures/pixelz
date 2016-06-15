const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const config = require('./server/config/environment');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('../webpack.config.js');

module.exports = {
  entry: config.APP_PATH,
  output: webpackConfig.output,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Pixelz Studio',
      filename: 'index.html',
      template: config.MAIN_TEMPLATE
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ],
  module: webpackConfig.module,
  resolve: webpackConfig.resolve,
  resolveLoader: webpackConfig.resolveLoader
};

webpack(module.exports).run(function (err, stats) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('ended', err);
    console.log(stats.toString({
      colors: true
    }));
    fs.writeFileSync(path.join(config.PUBLIC_PATH , 'CNAME'), 'pixelzstudio.com');
  }
});
