const webpack = require('webpack'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname),
      APP_PATH = path.resolve(ROOT_PATH, 'src','public','init.js'),
      BUILD_PATH = path.resolve(ROOT_PATH, 'build');
console.log(APP_PATH);
module.exports = {
  devtool : 'eval-source-map',
  entry:  [
    "webpack-dev-server/client?http://localhost:9090",
    "webpack/hot/only-dev-server",
    APP_PATH
    ],
  output: {
    path: BUILD_PATH,
    filename: "app.js",
    publicPath: "http://localhost:9090/build/"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('main.css', { allChunks: true })
  ],

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      {
        test: /\.js$/, include: APP_PATH,
        loaders: ["babel-loader"]//?stage=0
      },
      {
        test: /\.css?$/,
        loaders: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.styl?$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
      }
    ],
    preLoaders: [
      {
        test: /\.js?$/, include: APP_PATH,
        loaders: ['eslint', 'jscs']
      }/*,
      {
        test: /\.styl?$/, exclude: /node_modules/,
        loader: 'stylint'
      }*/
    ]
  },

  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js','.css', '.styl']
  },

}
