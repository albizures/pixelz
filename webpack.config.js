const webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	path = require('path'),
	config = require('./src/server/config/environment');

module.exports = {
	devtool : '#inline-source-map',
	entry:[
		'webpack-hot-middleware/client?reload=true',
		config.APP_PATH
	],
	output: {
		path: config.PUBLIC_PATH,
		filename: "[name].js",
		publicPath : '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		//new webpack.NoErrorsPlugin(),
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
			loaders: ['eslint-loader', 'jscs-loader']
		}]
	},
	resolve: {
		alias: {
			inheritanceObject : path.join(config.CLIENT_PATH, '/utils/inheritanceObject.js'),
			make : path.join(config.CLIENT_PATH, '/utils/make.js')
		},
		extensions: ['', '.js', '.css', '.styl', '.jade']
	},
	resolveLoader: {
		root: config.MODULES_PATH
	}

};
