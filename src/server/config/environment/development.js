'use strict';
const path = require('path');//,
	// getConfigWebpack = require('../../../webpack.config.js'),
	// webpack = require('webpack'),
	// webpackDevMiddleware = require('webpack-dev-middleware'),
	// webpackHotMiddleware = require('webpack-hot-middleware');

let configWebpack,
	compiler,
	webpackMiddleware;

module.exports = function (config) {
	config.MAIN_TEMPLATE =  path.join(config.TEMPLATE_PATH, 'development.jade');
	//configWebpack = getConfigWebpack(config);
	//compiler = webpack(configWebpack);
	// webpackMiddleware = webpackDevMiddleware(compiler, {
	// 	publicPath: configWebpack.output.publicPath,
	// 	stats: {
	// 		colors: true,
	// 		hash: false,
	// 		timings: true,
	// 		chunks: false,
	// 		chunkModules: false,
	// 		modules: false
	// 	}
	// });
	return {
		//webpackMiddleware,
		//webpackHotMiddleware : webpackHotMiddleware(compiler),
		MAIN_TEMPLATE : config.MAIN_TEMPLATE
	};
};
