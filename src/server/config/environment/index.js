
const path = require('path'),
	_ = require('lodash'),
	env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
	ROOT_PATH = path.join(__dirname, '..', '..', '..', '..'),
	PUBLIC_PATH = path.join(ROOT_PATH, 'public'),
	CLIENT_PATH = path.join(ROOT_PATH,'src', 'client'),
	APP_PATH = path.join(CLIENT_PATH, 'init.js'),
	MODULES_PATH = path.join(ROOT_PATH, 'node_modules'),
	ASSETS_PATH = path.join(CLIENT_PATH, 'assets'),
	TEMPLATE_PATH = path.join(CLIENT_PATH, 'template'),
	all = {
		isProduction : env != 'development',
		ROOT_PATH,
		PUBLIC_PATH,
		CLIENT_PATH,
		APP_PATH,
		MODULES_PATH,
		TEMPLATE_PATH,
		ASSETS_PATH,
		PORT : 8000
	};
module.exports = _.merge(
	all,
	require('./' + env + '.js')(all)
);
