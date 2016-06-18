const db = require('../../components/connect.js');
const collection = 'sprites';

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

exports.collection = collection;

exports.update = function (id, data, cb) {
  db.update(collection, id, data, cb);
};

exports.postFile = function (data, cb) {
  db.postFile(data, cb);
};

exports.updateFile = function (data, cb) {
  db.updateFile(data, cb);
};