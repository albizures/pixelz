const livereload = require('express-livereload'),
      path = require('path'),
      express = require('express'),
      favicon = require('serve-favicon');

module.exports = function (app) {
  app.use(express.static(path.resolve(__dirname,'..' ,'..','..','build')));
  app.use(favicon('src/favicon.ico'));
  livereload(app, {
    watchDir : path.resolve(__dirname,'..' ,'..','..','build','app.js')
  });
}
