const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spriteSchema = new Schema({
  title: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  width: Number,
  height: Number,
  private: Boolean,
  colors: [String],
  type: String,
  frames: Number,
  available: Boolean,
  file: String,
  preivew: String
});

module.exports = spriteSchema;