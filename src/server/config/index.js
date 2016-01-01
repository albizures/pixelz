const livereload = require('express-livereload'),
      path = require('path'),
      favicon = require('serve-favicon');

module.exports = function (app) {

  app.use(favicon('src/favicon.ico'));
  livereload(app, {
    watchDir : path.resolve(__dirname,'..' ,'..','..','build','app.js')
  });
}
