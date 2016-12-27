const { Editor } = require('../../models');
const collection = 'editor';

exports.create = data => Editor.create(data);

exports.findAll = () => Editor.find({}).sort('-updatedAt');

exports.findAllOfUser = user => Editor.find({user}).sort('-updatedAt');

exports.findLastOfUser = user => Editor.findOne({user}).sort('-updatedAt');

exports.findOne = _id => Editor.findOne({_id});

exports.findOneOfUser = (_id, user) => Editor.findOne({_id, user});

exports.update = (id, data) =>
  Editor.findByIdAndUpdate(id, {$set: data}, {new: true})
    .then(function (editor) {
      editor.layout = data.layout;
      editor.markModified('layout');
      return editor.save();
    });

exports.collection = collection;