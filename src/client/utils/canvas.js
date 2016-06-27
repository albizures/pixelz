'use strict';

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
  var marginTop = 0, marginLeft = 0;
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