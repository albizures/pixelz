const webpack = require('webpack'),
	util = require('util'),
	path = require('path'),
	config = require('./server/config/environment'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = config.ROOT_PATH,
	APP_PATH = config.APP_PATH,
	CLIENT_PATH = config.CLIENT_PATH,
	PUBLIC_PATH = config.PUBLIC_PATH,
	MODULES_PATH = config.MODULES_PATH,
	MAIN_TEMPLATE = config.MAIN_TEMPLATE,
	ASSETS_PATH = config.ASSETS_PATH;
module.exports = {
	devtool: 'eval', //'eval-source-map',
	entry: APP_PATH,
	output: {
		path: PUBLIC_PATH,
		filename: "app.js"
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin(),
		//new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'Pixelz Studio',
			filename: 'index.html',
			template: MAIN_TEMPLATE
		}),
		new ExtractTextPlugin('style.css', {
			allChunks: true
		})
	],

	// Transform source code using Babel and React Hot Loader
	module: {
		loaders: [{
			test: /\.js$/,
			include: CLIENT_PATH,
			loader: "babel-loader" //?stage=0"]
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				'file?name=/assets/images/[name].[ext]',
				'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
			]
		}, {
			test: /\.jade$/,
			loader: 'jade-loader'
		}, {
			test: /\.css?$/,
			loaders: ExtractTextPlugin.extract('style-loader', 'css-loader')
		}, {
			test: /\.styl?$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
				//loader: 'style-loader!css-loader!stylus-loader'
		}, {
			test: /b64/,
			loader: 'exports?encode64'
		}, {
			test: /LZWEncoder/,
			loader: 'exports?LZWEncoder'
		}, {
			test: /GIFEncoder/,
			loader: 'imports?LZWEncoder=>LZWEncoder!exports?GIFEncoder'
		}, {
			test: /NeuQuant/,
			loader: 'exports?NeuQuant'
		}],
		preLoaders: [{
			test: /\.js?$/,
			exclude: [/build/, /node_modules/, /libs/],
			loaders: ['eslint-loader', 'jscs-loader']
		}]
	},
	// Automatically transform files with these extensions
	resolve: {
		alias: {
			b64:  CLIENT_PATH + '\\libs\\b64.js',
			GIFEncoder: CLIENT_PATH + '\\libs\\GIFEncoder.js',
			LZWEncoder: CLIENT_PATH + '\\libs\\LZWEncoder.js',
			NeuQuant: CLIENT_PATH + '\\libs\\NeuQuant.js'
		},
		extensions: ['', '.js', '.css', '.styl', '.jade']
	},
	resolveLoader: {
		root: MODULES_PATH
	}
}
if (!process.env.PRODUCTION) {
	const compiler = webpack(module.exports);
	compiler.apply();
	compiler.watch({ // watch options:
		errorDetails: true,
		aggregateTimeout: 300, // wait so long for more changes
		poll: true // use polling instead of native watchers
			// pass a number to set the polling interval
	}, function (err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('ended', err);
      console.log(stats.toString({
        colors: true
      }));
    }
	});
}
