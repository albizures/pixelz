const express = require('express'),
      path = require('path'),
      app = express(),
      BUILD_PATH = path.resolve(__dirname,'..' ,'build');
require("./server/config")(app);

app.get('/', function(req, res) {
  res.sendFile(path.resolve(BUILD_PATH,'index.html'));
});

if (!process.env.PRODUCTION) {
  var webpack = require('webpack');
  var compiler = webpack(require('./webpack.local.config'));
	var ProgressPlugin = require('webpack/lib/ProgressPlugin');
	compiler.apply(new ProgressPlugin(function(percentage, msg) {
	  console.log((percentage * 100) + '%', msg);
	}));
  compiler.watch({ // watch options:
    errorDetails : true,
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
  }, function(err, stats) {
    console.log('ended');
    console.log(stats.toString({colors : true}));
  });

}

module.exports = app;
