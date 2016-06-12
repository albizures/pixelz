const express = require('express'),
	path = require('path'),
	config = require('./config/environment'),
	app = express();



require("./config/express.js")(app);
require("./router.js")(app);
if (!config.isProduction) {
	require('./config/proxy.js')(app);
}

var a = require('./components/connect.js');

const port = config.PORT;
const server = app.listen(port, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Run http://%s:%s', host, port);
});

module.exports = app;
