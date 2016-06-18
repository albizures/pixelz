const db = require('../../components/connect.js');

exports.getFile = function (name, cb) {
  db.getFile(name, cb);
};