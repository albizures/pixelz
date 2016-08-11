const express = require('express');
const livereload = require('express-livereload');
const config = require('./environment');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const morgan = require('morgan');


module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(favicon('src/favicon.ico'));
  app.use(express.static(config.PUBLIC_PATH));
  app.use(morgan('dev'));
};
