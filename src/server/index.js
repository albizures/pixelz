const express = require('express');
const path = require('path');
const config = require('./config/environment');
const app = express();

require('./config/express.js')(app);
require('./router.js')(app);

var a = require('./components/connect.js');

const port = config.PORT;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Run http:${host}:${port}`);
});

module.exports = app;
