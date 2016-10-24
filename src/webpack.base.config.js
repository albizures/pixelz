const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const config = require('./server/config/environment');

module.exports = {
  entry: [
    config.APP_PATH
  ],
  output: {
    path: config.PUBLIC_PATH,
    filename: "bundle.js",
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      title: 'Pixore',
      filename: 'index.html',
      template: config.MAIN_TEMPLATE
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: config.CLIENT_PATH,
      loader: "babel"
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?name=assets/images/[name].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }, {
      test: /\.jade$/,
      loader: 'jade'
    }, {
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.styl?$/,
      loader: ExtractTextPlugin.extract('style', 'css!stylus')
    }, {
      test: /\.worker\.js?$/,
      loaders: ['worker?name=workers/[name].[ext]', 'babel']
    }],
    preLoaders: [{
      test: /\.js?$/,
      exclude: [/node_modules/],
      loaders: ['eslint']
    }]
  },
  resolve: {
    alias: {
      workers: path.join(config.CLIENT_PATH, 'workers/'),
      utils: path.join(config.CLIENT_PATH, 'utils/'),
      constants: path.join(config.CLIENT_PATH, 'constants/'),
      make: path.join(config.CLIENT_PATH, 'utils/make.js'),
      http: path.join(config.CLIENT_PATH, 'utils/http.js')
    },
    extensions: ['', '.js', '.css', '.styl', '.jade']
  },
  resolveLoader: {
    root: config.MODULES_PATH
  }
};