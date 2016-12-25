const db = require('../../components/connect.js');
const validate = require('../../components/utils/validateSchema');
const collection = 'sprites';
const Joi = require('joi');
const { Sprite, SpriteHistory } = require('../../models');

const spriteHistorySchema = Joi.object().keys({
  file: Joi.string(),
  preview: Joi.string()
}); 

const spriteSchema = Joi.object().keys({
  _id: Joi.object(),
  user: Joi.object(),
  title: Joi.string(),
  width: Joi.number(),
  height: Joi.number(),
  private: Joi.boolean().default(false, 'public by default'),
  colors: Joi.array(),
  type: Joi.string(),
  frames: Joi.number(),
  layers: Joi.number(),
  available: Joi.boolean(),
  file: Joi.string(),
  preview: Joi.string(),
  history: Joi.array()
});


exports.getPublic = function () {
  return db.collection(collection).aggregate([{
    $match: {
      private: false
    }
  }, {
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'user'
    },
  }, {
    $project: {
      name: 1,
      createdAt: 1,
      frames: 1,
      layers: 1,
      preview: 1,
      user: {_id: 1, username: 1, displayName: 1, profileImage: 1}
    }
  }, {
    $unwind: "$user"
  }]).toArray();
};

exports.create = data =>
  validate(data, spriteSchema,
    'user', 'title', 'with',
    'height', 'private', 'colors',
    'type', 'frames', 'layers'
  ).then(data => Sprite.create(data));

exports.getAll = () => Sprite.getAll();


exports.getOnePublic = _id => Sprite.getOne({_id});

exports.getOne = (_id, user) => Sprite.findOne({_id, user});

exports.getHistory = id =>
  Sprite.findOne({_id: id})
    .populate('history')
    .then(function (sprite) {
      console.log(sprite.history);
      return sprite;
    })
    .then(sprite => sprite.history);


exports.getSearch = function (data, fields, cb) {
  db.getOne(collection, data, fields, cb);
};

exports.collection = collection;

exports.createHistory = data =>
 validate(data, spriteHistorySchema, 'file', 'preview')
    .then(data => {
      console.log('history resive',data);
      return data;
    })
    .then(data => SpriteHistory.create(data));

exports.updateName = (id, name) =>
  validate({name}, spriteSchema, 'name')
    .then(data => Sprite.findByIdAndUpdate(id, {$set: data}, {new: true}));

exports.update = (id, data) =>
  validate(data, spriteSchema)
    .then(data => Sprite.findByIdAndUpdate(id, {$set: data}, {new: true}));