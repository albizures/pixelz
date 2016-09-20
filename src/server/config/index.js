const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

module.exports = function (app) {
  app.use(express.static(path.resolve(__dirname,'..' ,'..','..','public')));
  app.use(favicon('src/favicon.ico'));
};
