'use strict';

const config = require('../../config/environment');
const path = require('path');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const crypto = require('crypto');
const Promise = require('bluebird');
const { hexToRgb } = require('./color.js');

function getRealPosition(width, x, y) {
  return (width * y + x) << 2;
}

function scalePaint(bitmap, scale, color, bgColor) {
  const {r, g, b} = hexToRgb(color);
  const {rDef, gDef, bDef} = bgColor;
  const width = bitmap.length * scale;
  const height = bitmap[0].length * scale; 
  const png = new PNG({ width, height });

  for (let x = 0; x < bitmap.length; x++) {
    let element = bitmap[x];
    for (let y = 0; y < element.length; y++) {
      paintPosition(x, y, bitmap[x][y]);
    }
  }
  return {png, width, height};

  function paintPosition(x, y, isColored) {
    x = x * scale;
    y = y * scale;
    for (let j = x; j < x + 60; j++) {
      for (let i = y; i < y + 60; i++) {
        let pos = getRealPosition(width, j, i);
        if (isColored) {
          png.data[pos] = r;
          png.data[pos + 1] = g;
          png.data[pos + 2] = b;
          png.data[pos + 3] = 255;
        } else {
          png.data[pos] = rDef;
          png.data[pos + 1] = gDef;
          png.data[pos + 2] = bDef;
          png.data[pos + 3] = 255;
        }
      }
    }
  }
}

function makeBitmapFromHash(size, hash) {
  var bitmap = [];
  var half = size / 2;
  for (let x = 0; x < half; x++) {
    bitmap[x] = [];
    bitmap[size - x - 1] = [];
    for (let y = 0; y < size; y++) {
      let hex = hash.substr((x * 5) + y + 6, 1);
      hex = Number('0x' + hex);
      bitmap[size - x - 1][y] = bitmap[x][y] = hex % 2 === 0;
    }
  }
  return bitmap;
}


exports.generate = function ({hash, name, isBlack = true}, cb) {
  let bgColor, imgBase;
  hash = crypto.createHash('sha256').update(hash.toString()).digest('hex');
  name = name || Date.now() + '.png';
  if (isBlack) {
    bgColor = {rDef: 0, gDef: 0, bDef: 0};
    imgBase = 'black.png';
  } else {
    bgColor = {rDef: 255, gDef: 255, bDef: 255};
    imgBase = 'white.png';
  }

  return new Promise(function (resolve, reject) {
    const {png, width, height} = scalePaint(
      makeBitmapFromHash(6, hash),
      60,
      '#' + hash.substr(hash.length - 6, hash.length),
      bgColor
    );

    fs.createReadStream(path.join(__dirname, imgBase))
      .pipe(new PNG())
      .on('parsed', function() {
        png.bitblt(this, 0, 0, width, width, 20, 20);
        this.pack().pipe(fs.createWriteStream(path.join(config.FILES_PATH, name)));
        resolve(path.join('/api/images/', name));
      });
  });
}