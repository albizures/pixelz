const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const GridStore = mongodb.GridStore;
const ObjectID = mongodb.ObjectID;
const response = require('./utils/response.js');
const config = require('../config/environment');
const modelUsers = require('../api/users/users.mdl.js');

let db;
let option = {w: 1};

var url = 'mongodb://localhost:27017/pixelz';

exports.dbPromise = MongoClient.connect(url).then(function(result) {
  console.log("Connected correctly to server");
  db = result;

  if (!config.isProduction) {
    modelUsers.getSearch({
      user: 'albizures'
    }, onSearch);
    function onSearch(result) {
      if (result.code === 0 && !result.data && !result.data.length) {
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
  return result;
});

exports.getOne = function (collection, data, fields, cb) {
  let resolve;
  let reject;

  let defer = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  db.collection(collection).findOne(data, fields, onFindOne);

  return defer;
  
  function onFindOne(err, result) {
    if (cb) return cb(response.commonResult(err, result));
    if (err) return reject(err);
    resolve(result);
  }
};

exports.collection = name => db.collection(name);

exports.newId = function (id) {
  return new ObjectID(id);
};
exports.validId = ObjectID.isValid;
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
  let resolve;
  let reject;

  let defer = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  db.collection(collection).insertOne(data, option, onInserOne);

  return defer;
  function onInserOne(err, r) {
    if (cb) {
      return cb(response.generate(err ? 1 : 0, err, r.insertedId));
    } 
    if (err) {
      return reject(err);
    }
    resolve(r.insertedId);
  }
};
exports.update = function (collection, id, data, cb) {
  let resolve;
  let reject;

  let defer = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  
  db.collection(collection).updateOne({
    _id: new ObjectID(id)},
    {$set: data},
    onUpdate
  );
  return defer;

  function onUpdate(err, r) {
    if (cb) return cb(response.commonResult(err, r));
    if (err) return reject(err);
    resolve(r);
  }
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
          buffer: data,
          meta: gridStore.metadata
        }));
      });
    }
  }
};