const Joi = require('joi');
const db = require('../../components/connect.js');
const identicons = require('../../components/utils/identicons.js');
const collection = 'users';
//collectionDB.createIndex('twitterID', {unique: true});

const userSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  displayName: Joi.string(),
  createdAt: Joi.date(),
  twitterID: Joi.any(),
  profileImage: Joi.string()
});

exports.post = function (data, cb) {
  let id;
  data.createdAt = new Date();
  data.profileImage = '/assets/images/profile.png';
  Joi.validate(
    data,
    userSchema.with('username', 'displayName', 'createdAt', 'email'),
    (err) => err === null ? db.post(collection, data, onPost) : null
  );

  function onPost(result) {
    if (result.code !== 0) {
      return cb(result);
    }
    console.log(result);
    id = result.data;
    identicons.generate({
      hash: id
    }).then(onGenerate);
  }
  function onGenerate(uri) {
    exports.put(id, {profileImage: uri}, onPut);
  }
  function onPut(result) {
    cb(result);
  }
};

exports.getAll = function (cb) {
  db.getAll(collection, cb);
};

exports.getOne = function (id, cb) {
  db.getOne(collection, {_id: db.newId(id)},{
    displayName: 1,
    username: 1,
    _id: 1,
    profileImage: 1
  }, cb);
};

exports.getSearch = function (data, cb) {
  db.getSearch(collection, data, cb);
};

exports.getByTwitterID = function (twitterID, cb) {
  db.collection(collection).createIndex('twitterID', {unique: true}, function () {
    db.getSearch(collection, {twitterID}, cb);
  });
};

exports.put = function (id, data, cb) {
  
  db.update(collection, id, data, cb);
  
};

exports.collection = collection;