const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paletteSchema = new Schema({
  title: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  private: Boolean,
  colors: [String]
});

module.exports = paletteSchema;