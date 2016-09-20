const db = require('../../components/connect.js');
const collection = 'sprites';
const historyCollection = 'spriteHistory';
const Joi = require('joi');


const spriteHistorySchema = Joi.object().keys({
  file: Joi.string(),
  preview: Joi.string(),
  credateAt: Joi.date().default(Date.now, 'time of creation')
}); 

const spriteSchema = Joi.object().keys({
  _id: Joi.object(),
  user: Joi.object(),
  name: Joi.string(),
  createdAt: Joi.date().default(Date.now, 'time of creation'),
  modificatedAt: Joi.date().default(Date.now, 'time of modification'),
  width: Joi.number(),
  height: Joi.number(),
  private: Joi.boolean().default(false, 'public by default'),
  colors: Joi.array(),
  type: Joi.string(),
  frames: Joi.number(),
  layers: Joi.number(),
  available: Joi.boolean(),
  file: Joi.string(),
  preview: Joi.string()
});


exports.post = function (data, cb) {
  return db.post(collection, data, cb);
};

exports.getAll = function (cb) {
  db.getAll(collection, cb);
};

exports.getOne = function (id, cb) {
  return db.getOne(collection, {_id: db.newId(id)}, {
    _id: 1,
    name: 1,
    width: 1,
    height: 1,
    colors: 1,
    frames: 1,
    layers: 1,
    type: 1,
    preview: 1
  }, cb);
};

exports.getSearch = function (data, fields, cb) {
  db.getOne(collection, data, fields, cb);
};

exports.collection = collection;

exports.postHistory = function (data, cb) {
  let { error } = Joi.validate(
    data,
    spriteHistorySchema.with('file', 'preview','createdAt')
  );
  if (error) return Promise.reject(error);
  return db.post(historyCollection, data, cb);
};

exports.put = function (id, data, cb) {
  let { error } = Joi.validate(
    data,
    spriteSchema
  );
  if (error) return Promise.reject(error);

  return db.update(collection, id, data, cb);
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