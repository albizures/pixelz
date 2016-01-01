const webpack = require('webpack'),
      util = require('util'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname),
      APP_PATH = path.resolve(ROOT_PATH,'public','init.js'),
      PUBLIC_PATH = path.resolve(ROOT_PATH,'public'),
      BUILD_PATH = path.resolve(ROOT_PATH,'..' ,'build');

module.exports = {
  devtool : 'eval',//'eval-source-map',
  entry:  APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: "app.js"
  },

  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      {
        test: /\.js$/, include: PUBLIC_PATH,
        loader: "babel-loader"//?stage=0"]
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
        test: /\.js?$/, exclude:  [/build/, /node_modules/],
        loaders: ['eslint-loader', 'jscs-loader']
      }/*,
      {
        test: /\.styl?$/, exclude: /node_modules/,
        loader: 'stylint'
      }*/
    ]
  },
  // eslint: {
  //     emitError: true,
  //     configFile: './.eslintrc'
  // },
  // jscs: {
  //   validateIndentation: 2,
  //   emitErrors: false,
  //   failOnHint: false,
  //   reporter: function (errors) {
  //     console.log(Object.keys(errors));
  //     if (!errors.isEmpty()) {
  //       errors.getErrorList().forEach(function (error) {
  //         this.emitWarning(util.format('line %d, col %d: %s',
  //           error.line, error.column, error.message));
  //       }, this);
  //     }
  //   }
  // },
  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js','.css', '.styl']
  },

}
