const db = require('../../components/connect.js');
const collection = 'sprites';
const historyCollection = 'spriteHistory';

exports.post = function (data, cb) {
  db.post(collection, data, cb);
};

exports.getAll = function (cb) {
  db.getAll(collection, cb);
};

exports.getOne = function (id, cb) {
  db.getOne(collection, id, {
    _id : 1,
    name : 1,
    width : 1,
    height : 1,
    colors: 1,
    frames : 1,
    layers : 1,
    type : 1
  }, cb);
};

exports.getSearch = function (data, cb) {
  db.getOne(collection, data, cb);
};

exports.collection = collection;

exports.postHistory = function (data, cb) {
  db.post(historyCollection, data, cb);
};

exports.put = function (id, data, history, cb) {
  if (typeof history === 'function') {
    cb = history;
    history = undefined;
  }
  if (history) {
    db.post(historyCollection, history, onPostHistory);
  } else {
    onPostHistory();
  }
  function onPostHistory(result) {
    db.update(collection, id, data, cb);
  }
};

exports.postFile = function (data, cb) {
  db.postFile(data, cb);
};

exports.updateFile = function (data, cb) {
  db.updateFile(data, cb);
};

exports.putName = function (id, name, cb) {
  db.update(collection, id, {name}, cb);
};