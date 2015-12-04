const express = require('express');
const app = express();


app.get('/app.js', function(req, res) {
  res.sendFile(__dirname + '/build/app.js');
});


app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/build/style.css');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

if (!process.env.PRODUCTION) {
  var webpack = require('webpack');
  var compiler = webpack(require('./webpack.local.config'));
  compiler.run(function(err, stats) {
    console.log(err,'termino');
  });
}




var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Run http://%s:%s', host, port);
});
