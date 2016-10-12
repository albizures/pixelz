const Joi = require('joi');
const db = require('../../components/connect.js');
const collection = 'editor';


const editorSchema = Joi.object().keys({
  _id: Joi.object().type(db.ObjectID),
  user: Joi.object().type(db.ObjectID),
  modifiedAt: Joi.date().default(Date, 'time of modification'),
  palette: Joi.object(),
  layout: Joi.object(),
  sprites: Joi.array().default([])
});


exports.post = function (data, cb) {
  const { value, err} = Joi.validate(
    data,
    editorSchema.without('post', '_id').with('post', 'user')
  );
  if (err) return Promise.reject(err);
  return db.post(collection, value, cb);
};

exports.getAll = function (user) {
  return db.collection(collection).find({user}, {sort: {modifiedAt: 1}}).toArray();
};

exports.getLast = function (user) {
  return db.collection(collection).findOne({user}, {sort: {modifiedAt: 1}});
};

exports.getOne = function (id, cb) {
  db.getOne(collection, id, cb);
};


exports.put = function (id, user, data) {
  id = db.newId(id);
  user = db.newId(user);
  const { value, err} = Joi.validate(
    data,
    editorSchema.without('put', ['user', '_id'])
  );
  if (err) return Promise.reject(err);

  return db.updateOne(collection, {
    _id: id,
    user
  }, value);
};

exports.collection = collection;