const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const config = require('./src/server/config/environment');
const isProd = process.env.NODE_ENV === 'production';

const plugins = [];
let devtool;
let entry;
let devServer;
let externals = [];

const modules = {
  preLoaders: [{
    test: /\.js$/,
    loader: 'eslint',
    exclude: /node_modules/
  }],
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    { test: /\.json$/, loader: 'json' },
    { test: /\.(jade|pug)$/, loader: 'pug' },
    { test: /\.css?$/, loader: ExtractTextPlugin.extract('style', 'css') },
    { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css!stylus') },
    { test: /\.worker\.js?$/,loaders: ['worker?name=workers/[name].[ext]', 'babel'] },
    { test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      loader: 'file',
      query: {
        name: 'assets/[name].[hash:8].[ext]'
      }
    }
  ]
};

const resolve = {
  alias: {
    workers: path.join(config.CLIENT_PATH, 'workers/'),
    utils: path.join(config.CLIENT_PATH, 'utils/'),
    constants: path.join(config.CLIENT_PATH, 'constants/'),
    make: path.join(config.CLIENT_PATH, 'utils/make.js'),
    http: path.join(config.CLIENT_PATH, 'utils/http.js')
  },
  extensions: ['', '.js', '.css', '.styl', '.jade']
};
const resolveLoader = {
  root: config.MODULES_PATH
};
const output = {
  path: config.PUBLIC_PATH,
  publicPath: '/',
  filename: 'bundle.js'
};

if (isProd) {
  entry = {
    index: config.APP_PATH
  };
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Pixore',
      filename: 'index.html',
      template: config.MAIN_TEMPLATE
    }),
    new ExtractTextPlugin('[name].css')
  );
} else {
  entry = [
    require.resolve('react-dev-utils/webpackHotDevClient.js'),
    config.APP_PATH
  ];
  devtool = 'cheap-module-source-map';
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'Pixore',
      filename: 'index.html',
      template: config.MAIN_TEMPLATE
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
    new ExtractTextPlugin('[name].css')
  );
  devServer = {
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },
    port: config.PORT,
    proxy: {
      '**': {
        target: `http://127.0.0.1:${config.PORT + 1}`
      }
    }
  };
}

module.exports = {
  devtool,
  entry,
  output,
  externals,
  module: modules,
  plugins,
  resolve,
  resolveLoader,
  devServer
};