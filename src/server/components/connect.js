'use strict';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const GridStore = mongodb.GridStore;
const ObjectID = mongodb.ObjectID;
const response = require('./utils/response.js');
const config = require('../config/environment');
const modelUsers = require('../api/users/users.mdl.js');

let db;
let option = {w : 1};

var url = 'mongodb://localhost:27017/pixelz';


MongoClient.connect(url, function(err, result) {
  if (err) {
    throw 'Error mongo';
  }
  console.log("Connected correctly to server");
  db = result;

  if (!config.isProduction) {
    modelUsers.getSearch({
      user: 'albizures'
    }, onSearch);
    function onSearch(result) {
      if (result.code == 0 && !result.data && !result.data.length) {
        modelUsers.post({
          user: 'albizures'
        }, onPost);
      }
    }
    function onPost(result) {
      if (result.code !== 0) {
        throw 'Error master user';
      }
    }
  }
});

exports.getOne = function (collection, id, cb) {
  db.collection(collection).findOne({id : id}, option, onFindOne);
  function onFindOne(err, result) {
    cb(response(err ? 1 : 0, err, result));
  }
};
exports.newId = function (id) {
  return new ObjectID(id);
};
exports.getAll = function (collection, cb) {
  db.collection(collection).find().toArray(onFind);
  function onFind(err, result) {
    cb(response(err ? 1 : 0, err, result));
  }
};

exports.getSearch = function (collection, data, cb) {
  db.collection(collection).find(data).toArray(onFind);
  function onFind(err, result) {
    cb(response(err ? 1 : 0, err, result));
  }
};

exports.post = function (collection, data, cb) {
  db.collection(collection).insertOne(data, option, onInserOne);
  function onInserOne(err, r) {
    cb(response(err ? 1 : 0, err, r.insertedId));
  }
};
exports.update = function (collection, id, data, cb) {
  db.collection(collection)
    .updateOne({_id : new ObjectID(id)}, {$set: data}, (err, r) => cb(response(err ? 1 : 0, err, r)));
};

exports.postFile = function (data, cb) {

  GridStore.exist(db, data.name, onExist);

  function onExist(err, exist) {
    if (err) {
      return cb(response(1, err));
    }
    if (exist) {
      cb(response(0, err, !exist));
    } else {
      new GridStore(db, data.name, "w").open((err, gridStore) => {
        gridStore.metadata = data.meta;
        gridStore.write(data.buffer, true,  onWrite);
      });
    }
  }
  function onWrite(err, gridStore) {
    cb(response(err ? 1 : 0, err, gridStore.fileId));
  }
};
exports.getFile = function (id, cb) {
  GridStore.read(db, id, (err, data) => cb(response(err ? 1 : 0, err, data)));
};