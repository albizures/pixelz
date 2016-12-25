const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spriteSchema = new Schema({
  title: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  history: [{type: Schema.Types.ObjectId, ref: 'SpriteHistory'}],
  width: {type: Number, required: true},
  height: {type: Number, required: true},
  private: Boolean,
  colors: [String],
  type: String,
  frames: {type: Number, required: true},
  layers: {type: Number, required: true},
  available: Boolean,
  file: String,
  preview: String
});

spriteSchema.statics.getAll = function (cb) {
  return this.find({available: true, private: false}, cb).select({ 
    _id: 1,
    title: 1,
    user: 1,
    width: 1,
    height: 1,
    colors: 1,
    type: 1,
    frames: 1,
    preview: 1
  });
};

spriteSchema.statics.getOne = function (conditions, cb) {
  return this.findOne(conditions, cb).select({ 
    _id: 1,
    title: 1,
    user: 1,
    width: 1,
    height: 1,
    colors: 1,
    type: 1,
    frames: 1,
    preview: 1
  });
};

module.exports = spriteSchema;