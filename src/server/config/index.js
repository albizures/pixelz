const livereload = require('express-livereload'),
      path = require('path'),
      express = require('express'),
      favicon = require('serve-favicon');

module.exports = function (app) {
  app.use(express.static(path.resolve(__dirname,'..' ,'..','..','build')));
  app.use(favicon('src/favicon.ico'));
  livereload(app, {
    port : '35730',
    watchDir : path.resolve(__dirname,'..' ,'..','..','build','app.js')
  });
}
