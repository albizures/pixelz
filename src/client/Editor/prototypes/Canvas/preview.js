const Vector = require('../Vector'),
  Tools = require('../../panels/Tools'),
  {COLOR_POINTER_PREW_DEF, TRANSPARENT_IMG} = require('../../constants');

module.exports.cleanPrev = function () {
  this.preview.clearRect(0, 0, this.preview.canvas.width, this.preview.canvas.height);
};

module.exports.previewAt = function (cord, color) {
  cord = this.cordLayerToPaint(cord);
  this.preview.fillStyle = color;
  this.preview.clearRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
  this.preview.fillRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
};
module.exports.drawPreview = function (evt) {
  this.cleanPrev();
  if (this.artboard.select) {
    this.paintAreaSelect();
  }
  let temp = new Vector(Math.floor(((evt.clientX - this.artboard.cord.x) / this.artboard.scale)), Math.floor(((evt.clientY - this.artboard.cord.y) / this.artboard.scale)));
  let cord = new Vector(temp.x * this.artboard.scale + this.artboard.cord.x, temp.y * this.artboard.scale + this.artboard.cord.y);
  this.preview.strokeStyle = COLOR_POINTER_PREW_DEF;
  this.preview.fillStyle = Tools.getPrimaryColor();
  this.preview.strokeRect(cord.x - 1, cord.y - 1, this.sizePointer + 2, this.sizePointer + 2);
  this.preview.fillRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
};

module.exports.paintAreaSelect = function () {
  let pattern = this.preview.createPattern(TRANSPARENT_IMG, "repeat");
  this.preview.rect(
    (this.artboard.select.originalCord.x * this.artboard.scale) + this.artboard.cord.x,
    (this.artboard.select.originalCord.y * this.artboard.scale) + this.artboard.cord.y,
    this.artboard.select.width * this.artboard.scale, this.artboard.select.height * this.artboard.scale);
  this.preview.fillStyle = pattern;
  this.preview.fill();

  this.preview.drawImage(this.artboard.select.context.canvas,
    0, 0, this.artboard.select.width, this.artboard.select.height,
    this.artboard.cord.x + (this.artboard.select.cord.x * this.artboard.scale),
    this.artboard.cord.y + (this.artboard.select.cord.y * this.artboard.scale),
    this.artboard.select.width * this.artboard.scale,
    this.artboard.select.height * this.artboard.scale
  );
  this.prevSelect(
    this.artboard.select.cord.x,
    this.artboard.select.cord.y,
    this.artboard.select.width,
    this.artboard.select.height
  );
};

module.exports.prevSelect = function (x, y, width, height) {
  let cord1 = this.cordLayerToPaint({x : x, y : y  });

  this.preview.save();
  this.preview.beginPath();
  this.preview.setLineDash([5]);
  this.preview.strokeStyle = 'black';
  this.preview.fillStyle = 'transparent';
  this.preview.strokeRect(cord1.x, cord1.y, width * this.artboard.scale, height * this.artboard.scale);
  this.preview.stroke();
  this.preview.beginPath();
  this.preview.strokeStyle = 'white';
  this.preview.lineDashOffset = 5;
  this.preview.strokeRect(cord1.x, cord1.y, width * this.artboard.scale, height * this.artboard.scale);
  this.preview.stroke();
  this.preview.restore();
};




