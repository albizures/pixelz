const path = require("path");
const config = require("./config/environment");

function getIndex(req, res) {
  res.sendFile(path.resolve(config.PUBLIC_PATH, 'index.html'));
}

module.exports = function (app) {

  app.use('/api/', require('./api/index.js'));

  if (config.isProduction) {
    app.use('/', getIndex);
    app.use('/index', getIndex);
    app.use('/index.html', getIndex);
  } 
};
