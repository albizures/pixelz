
const app = require('./src/app.js');
const port = process.env.PORT || 8080;
// TODO: move server to server folder
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Run http://%s:%s', host, port);
});
