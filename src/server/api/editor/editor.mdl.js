const Joi = require('joi');
const db = require('../../components/connect.js');
const collection = 'editor';


const editorSchema = Joi.object().keys({
  _id: Joi.object(),
  user: Joi.object(),
  modifiedAt: Joi.date().default(Date, 'time of modification'),
  palette: Joi.object(),
  layout: Joi.object(),
  sprites: Joi.array().default([])
});


exports.post = function (data, cb) {
  const { value, err} = Joi.validate(
    data,
    editorSchema.width('user')
  );
  if (err) return Promise.reject(error);
  return db.post(collection, value, cb);
};

exports.getAll = function (cb) {
  db.getAll(collection, cb);
};

exports.getLast = function (user) {
  return db.collection(collection).findOne({user}, {sort: {modifiedAt: 1}});
};

exports.getOne = function (id, cb) {
  db.getOne(collection, id, cb);
};

exports.put = function (id, data, cb) {
  db.update(collection, id, data, cb);
};

exports.collection = collection;