
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { userSchema } = require('./user.js');
const spriteSchema = require('./sprite.js');
const paletteSchema = require('./palette.js');

const Sprite = mongoose.model('Sprite', spriteSchema);
const Palette = mongoose.model('Palette', paletteSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  Sprite,
  Palette
};