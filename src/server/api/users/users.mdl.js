const db = require('../../components/connect.js');
const Joi = require('joi');
const collection = 'users';

//collectionDB.createIndex('twitterID', {unique: true});

userSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  displayName: Joi.string(),
  createdAt: Joi.date(),
  twitterID: Joi.any()
});

exports.post = function (data, cb) {
  data.createdAt = new Date();
  Joi.validate(
    data,
    userSchema.with('username', 'displayName', 'createdAt', 'email'),
    (err, value) => err === null? db.post(collection, data, cb) : null
  );
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

exports.getByTwitterID = function (twitterID, cb) {
  db.collection(collection).createIndex('twitterID', {unique: true}, function () {
    db.getSearch(collection, {twitterID}, cb);
  });
};

exports.collection = collection;