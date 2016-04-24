const livereload = require('express-livereload'),
	path = require('path'),
	config = require('./environment'),
	express = require('express'),
	favicon = require('serve-favicon');


module.exports = function (app) {
	if (!config.isProduction) {
		app.use(config.webpackMiddleware);
		app.use(config.webpackHotMiddleware);
	} else {
		app.use(express.static(config.PUBLIC_PATH));
	}
	app.use(favicon('src/favicon.ico'));
	// livereload(app, {
	// 	port: '35730',
	// 	watchDir: config.PUBLIC_PATH
	// });
};
