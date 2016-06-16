const proxy = require('proxy-middleware');
const url = require('url');

module.exports = function (app) {
  app.use('/', proxy(url.parse('http://localhost:8081/')));
};
