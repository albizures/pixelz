const db = require('../../components/connect.js');
const collection = 'things';

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
  db.getOne(collection, data, cb);
};

exports.postFile = function (data, cb) {
  db.postFile(data, cb);
};

exports.collection = collection;