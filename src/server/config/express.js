const livereload = require('express-livereload'),
	path = require('path'),
	proxy = require('proxy-middleware'),
	config = require('./environment'),
	express = require('express'),
	url = require('url'),
	favicon = require('serve-favicon');


module.exports = function (app) {
	app.use(favicon('src/favicon.ico'));
	if (!config.isProduction) {
		console.log('proxy');
		app.use('/', proxy(url.parse('http://localhost:8080/')));
	} else {
		app.use(express.static(config.PUBLIC_PATH));
	}
};
