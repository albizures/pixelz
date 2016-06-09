const express = require('express'),
	path = require('path'),
	config = require('./config/environment'),
	app = express();

	
require('./components/connect.js');

require("./config/express.js")(app);
require("./router.js")(app);



const port = config.PORT;
const server = app.listen(port, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Run http://%s:%s', host, port);
});

module.exports = app;
