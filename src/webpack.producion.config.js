const webpack = require('webpack'),
	fs = require('fs'),
	path = require('path'),
	config = require('./server/config/environment'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: config.APP_PATH,
	output: {
		path: config.PUBLIC_PATH,
		filename: "[name].js"
	},
	plugins: [
		//new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'Pixelz Studio',
			filename: 'index.html',
			template: config.MAIN_TEMPLATE
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true
		})
	],

	// Transform source code using Babel and React Hot Loader
	module: {
		loaders: [{
			test: /\.js$/,
			include: config.CLIENT_PATH,
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
			loaders: ['style-loader', 'css-loader']
		}, {
			test: /\.styl?$/,
			loaders: ['style-loader', 'css-loader', 'stylus-loader']
				//loader: 'style-loader!css-loader!stylus-loader'
		}, {
			test : /workers/,
			loaders : ['worker?name=/workers/[name].[ext]', 'babel-loader']
		}],
		preLoaders: [{
			test: /\.js?$/,
			exclude: [/build/, /node_modules/],
			loaders: ['eslint-loader', 'jscs-loader']
		}]
	},
	// Automatically transform files with these extensions
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
