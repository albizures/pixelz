'use strict';
const { floor, round } = Math;

exports.walkBitmap = function walkBitmap(bitmap, fn) {
  for (let x = 0; x < bitmap.length; x++) {
    for (let y = 0; y < bitmap[x].length; y++) {
      fn(bitmap[x][y], x, y);
    }
  }
};

function imageSmoothing(ctx, value) {
  ctx.imageSmoothingEnabled = value;
  ctx.mozImageSmoothingEnabled = value;
  ctx.msImageSmoothingEnabled = value;
};

function imageSmoothingDisabled(ctx) {
  exports.imageSmoothing(ctx, false);
};

function getPreviewSize(maxWidth, maxHeight, width, height) {
  var newWidth, newHeight, scale;
  var maxSize = 0;
  var marginTop = 0, marginLeft = 0;

  if (width > height) {
    maxSize = newWidth = maxWidth;
    scale = maxWidth / width;
    newHeight = height * scale;
    marginTop = (maxHeight - newHeight) / 2;
  } else {
    maxSize = newHeight = maxHeight;
    scale = maxHeight / height;
    newWidth = width * scale;
    marginLeft = (maxWidth - newWidth) / 2;
  }
  return {
    maxWidth,
    maxHeight,
    width : newWidth,
    height : newHeight,
    marginTop,
    marginLeft,
    scale
  };
}

exports.getNewContext = function getNewContext(data) {
  var newContext = data.context || document.createElement('canvas').getContext('2d');
  if (!data.context) {
    newContext.canvas.width = data.width;
    newContext.canvas.height = data.height;
  }
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

function cloneContext(context) {
  let { width, height } = context.canvas;
  let clone = document.createElement('canvas');
  clone.width = width;
  clone.height = height;
  clone = clone.getContext('2d');
  clone.drawImage(context.canvas,
    0, 0, width, height,
    0, 0, width, height
  );
  return clone;
};

function scaleContext(context, scale = 1) {
  let { width, height } = context.canvas;
  let clone = document.createElement('canvas');
  let scaleHeight = height * scale;
  let scaleWidth = width * scale;
  clone.width = scaleWidth;
  clone.height = scaleHeight;
  clone = clone.getContext('2d');
  imageSmoothingDisabled(clone);
  clone.drawImage(context.canvas,
    0, 0, width, height,
    0, 0, scaleWidth, scaleHeight
  );
  return clone;
}

function getImageData(context) {
  return context.getImageData(0, 0, context.canvas.width, context.canvas.height).data;
};

exports.noTransparent = function (context, scale, transparent) {
  let { width, height } = context.canvas;
  let data = getImageData(context);
  context = scaleContext(context, scale);

  context.fillStyle = transparent;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) {
      let pos = i / 4,
        x = pos % width,
        y = ~~(pos / width);

      context.fillRect(x * scale, y * scale, scale, scale);
    }
  }
  return context;
};

exports.getPreviewSize = getPreviewSize;
exports.getImageData = getImageData;
exports.imageSmoothing = imageSmoothing;
exports.cloneContext = cloneContext;
exports.imageSmoothingDisabled = imageSmoothingDisabled;