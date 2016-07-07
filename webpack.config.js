const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./src/server/config/environment');

module.exports = {
  devtool : '#inline-source-map',
  entry:[
    'webpack-dev-server/client?http://localhost:8081', // &reload=true
    config.APP_PATH
  ],
  output: {
    path: config.PUBLIC_PATH,
    filename: "[name].js",
    publicPath : '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Pixelz Studio',
      filename: 'index.html',
      template: config.MAIN_TEMPLATE
    })
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      include: config.CLIENT_PATH,
      loader: "babel-loader"
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?name=assets/images/[name].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }, {
      test: /\.jade$/,
      loader: 'jade-loader'
    }, {
      test: /\.css?$/,
      loaders: ['style-loader', 'css-loader']
    }, {
      test: /\.styl?$/,
      loaders: ['style-loader', 'css-loader', 'stylus-loader']
    }, {
      test : /workers/,
      loaders : ['worker?name=workers/[name].[ext]', 'babel-loader']
    }],
    preLoaders: [{
      test: /\.js?$/,
      exclude: [/build/, /node_modules/],
      loaders: ['eslint-loader']
    }]
  },
  resolve: {
    alias: {
      utils : path.join(config.CLIENT_PATH, 'utils/'),
      constants : path.join(config.CLIENT_PATH, 'constants/'),
      make : path.join(config.CLIENT_PATH, 'utils/make.js'),
      http : path.join(config.CLIENT_PATH, 'utils/http.js')
    },
    extensions: ['', '.js', '.css', '.styl', '.jade']
  },
  resolveLoader: {
    root: config.MODULES_PATH
  }

};
var compiler = webpack(module.exports);

var server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  //hot : true,
  proxy : {
    '*' : {
      target: 'http://localhost:8080/',
      secure: false,
      bypass: function(req, res, proxyOptions) {
        if (req.headers.accept.indexOf('html') !== -1) {
          console.log('Skipping proxy for browser request.');
          return '/index.html';
        }
      }
    }
  },
  headers: {
    "X-Custom-Header": "yes",
    "Access-Control-Allow-Origin": "*"
  }
});

server.listen(8081, "localhost", function() {});