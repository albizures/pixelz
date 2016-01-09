const webpack = require('webpack'),
      util = require('util'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname),
      APP_PATH = path.resolve(ROOT_PATH,'public','init.js'),
      PUBLIC_PATH = path.resolve(ROOT_PATH,'public'),
      BUILD_PATH = path.resolve(ROOT_PATH,'..' ,'build'),
      MODULES_PATH = path.resolve(__dirname , '..','node_modules');
      ASSETS_PATH = path.resolve(BUILD_PATH ,'assets');

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
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?name=/assets/images/[name].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.css?$/,
        loaders: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.styl?$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
				//loader: 'style-loader!css-loader!stylus-loader'
      }
    ],
    preLoaders: [
      {
        test: /\.js?$/, exclude:  [/build/, /node_modules/],
        loaders: ['eslint-loader', 'jscs-loader']
      }
    ]
  },
  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js','.css', '.styl']
  },
  resolveLoader : {
    root : MODULES_PATH
  }
}
