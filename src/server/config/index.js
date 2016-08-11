const livereload = require('express-livereload'),
      path = require('path'),
      express = require('express'),
      favicon = require('serve-favicon');

module.exports = function (app) {
  app.use(express.static(path.resolve(__dirname,'..' ,'..','..','public')));
  app.use(favicon('src/favicon.ico'));
};
