const path = require("path"),
	config = require("./config/environment");

function getIndex(req, res) {
	res.sendFile(path.resolve(config.PUBLIC_PATH, 'index.html'));
}

module.exports = function (app) {

	app.use('/api/things/', require('./api/things/things.js'));
	app.use('/api/users/', require('./api/users/users.js'));
	app.use('/api/sprites/', require('./api/sprites/sprites.js'));

	if (config.isProduction) {
		app.use('/', getIndex);
		app.use('/index', getIndex);
		app.use('/index.html', getIndex);
	} 
};
