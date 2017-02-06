const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paletteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  private: Boolean,
  colors: {
    type: [String],
    validate: {
      validator (val) {
        return !(val.length === 0);
      },
      message: '{PATH} is empty'
    }
  },
  available: {
    type: Boolean,
    default: true
  }
});

paletteSchema.statics.getAll = function (cb) {
  return this.find({available: true}, cb).select({ 
    title: 1,
    user: 1,
    private: 1,
    colors: 1
  });
};

module.exports = paletteSchema;