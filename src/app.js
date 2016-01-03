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
  compiler.watch({ // watch options:
    errorDetails : true,
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
  }, function(err, stats) {
    console.log('termino');
    if(err){
    }else{
      var jsonStats = stats.toJson();
      if(jsonStats.errors.length > 0)
        for(item of jsonStats.errors){
          console.log(item);
        }
      //console.log('termino');
    }
  });
}

module.exports = app;
