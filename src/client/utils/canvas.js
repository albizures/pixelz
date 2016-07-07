'use strict';
const { floor, round } = Math;

exports.walkBitmap = function walkBitmap(bitmap, fn) {
  for (let x = 0; x < bitmap.length; x++) {
    for (let y = 0; y < bitmap[x].length; y++) {
      fn(bitmap[x][y], x, y);
    }
  }
};

exports.imageSmoothing = function imageSmoothing(ctx, value) {
  ctx.imageSmoothingEnabled = value;
  ctx.mozImageSmoothingEnabled = value;
  ctx.msImageSmoothingEnabled = value;
};

exports.imageSmoothingDisabled = function imageSmoothingDisabled(ctx) {
  exports.imageSmoothing(ctx, false);
};

exports.getPreviewSize = function getPreviewSize(size, width, height) {
  var newWidth, newHeight, scale;
  var marginTop = '0px', marginLeft = '0px';
  if (width > height) {
    newWidth = size;
    scale = size / width;
    newHeight = height * scale;
    marginTop = size - newHeight;
    marginTop += 'px';
  } else {
    newHeight = size;
    scale = size / height;
    newWidth = width * scale;
    marginLeft = size - newWidth;
    marginLeft += 'px';
  }
  return {
    width : newWidth,
    height : newHeight,
    marginTop,
    marginLeft,
    scale
  };
};

exports.getNewContext = function getNewContext(data) {
  var newContext = data.context || document.createElement('canvas').getContext('2d');
  if (data.context) {
    newContext.canvas.width = data.width;
    newContext.canvas.height = data.height;
  }
  newContext.fillRect(18, 18, 18, 18);
  return newContext;
};

exports.calculatePosition = function calculatePosition(artboard, x, y) {
  x = floor((x - artboard.x) / artboard.scale);
  y = floor((y - artboard.y) / artboard.scale);
  return {x, y};
};

exports.validCord = function validCord(layer, cord) {
  return cord.x >= 0 && cord.x < layer.width && cord.y >= 0 && cord.y < layer.height;
};