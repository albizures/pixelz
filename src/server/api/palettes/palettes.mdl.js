const db = require('../../components/connect.js');
const collection = 'palettes';
const { Palette } = require('../../models');

exports.create = data => Palette.create(data);

exports.getPublic = () =>
  Palette.find({private: false, available: true})
    .select({private: 0})
    .populate('user username displayName profileImage _id');

exports.getAll = () => Palette.getAll();

exports.getOnePublic = _id =>
  Palette.findOne({_id, private: false, available: true})
    .select({private: 0, available: 0});

exports.getOne = (_id, user) =>
  Palette.findOne({_id, user, available: true})
    .select({available: 0});

exports.getSearch = function (data, cb) {
  db.getSearch(collection, data, cb);
};

exports.update = (id, data) =>
  Palette.findByIdAndUpdate(id, {$set: data}, {new: true});

exports.collection = collection;