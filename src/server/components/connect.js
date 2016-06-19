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

exports.getOne = function (collection, id, fields, cb) {
  db.collection(collection).findOne({_id : new ObjectID(id)}, {fields : fields}, onFindOne);
  function onFindOne(err, result) {
    cb(response.commonResult(err, result));
  }
};
exports.newId = function (id) {
  return new ObjectID(id);
};
exports.getAll = function (collection, cb) {
  db.collection(collection).find().toArray(onFind);
  function onFind(err, result) {
    cb(response.commonResult(err, result));
  }
};

exports.getSearch = function (collection, data, cb) {
  db.collection(collection).find(data).toArray(onFind);
  function onFind(err, result) {
    cb(response.commonResult(err, result));
  }
};

exports.post = function (collection, data, cb) {
  db.collection(collection).insertOne(data, option, onInserOne);
  function onInserOne(err, r) {
    cb(response.generate(err ? 1 : 0, err, r.insertedId));
  }
};
exports.update = function (collection, id, data, cb) {
  db.collection(collection)
    .updateOne({_id : new ObjectID(id)}, {$set: data}, (err, r) => cb(response.commonResult(err, r)));
};

exports.postFile = function (data, cb) {

  GridStore.exist(db, data.name, onExist);

  function onExist(err, exist) {
    if (err) {
      return cb(response.generate(1, err));
    }
    if (exist) {
      cb(response.generate(0, err, !exist));
    } else {
      new GridStore(db, data.name, "w").open((err, gridStore) => {
        gridStore.metadata = data.meta;
        gridStore.write(data.buffer, true,  onWrite);
      });
    }
  }
  function onWrite(err, gridStore) {
    cb(response.commonResult(err, gridStore.fileId));
  }
};
exports.getFile = function (id, cb) {
  GridStore.exist(db, id, onExist);
  function onExist(err, exist) {
    if (!err && exist) {
      new GridStore(db, id, 'r').open(onOpen);
    } else {
      return cb(response.generate(1, err, exist));
    }
  }
  function onOpen(err, gridStore) {
    if (err) {
      return cb(response.commonResult(err, gridStore));
    } else {
      gridStore.read((err, data) => { 
        cb(response.commonResult( err, {
          buffer : data,
          meta : gridStore.metadata
        }));
      });
    }
  }
};