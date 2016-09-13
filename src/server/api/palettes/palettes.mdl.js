const db = require('../../components/connect.js');
const collection = 'palettes';

exports.post = function (data, cb) {
  db.post(collection, data, cb);
};

exports.getAll = function (cb) {
  db.getAll(collection, cb);
};

exports.getOne = function (id, cb) {
  db.getOne(collection, id, cb);
};

exports.getSearch = function (data, cb) {
  db.getSearch(collection, data, cb);
};

exports.put = function (id, data, cb) {
  db.update(collection, id, data, cb);
};

exports.collection = collection;