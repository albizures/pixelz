module.exports.cleanAt = function (cord) {
  cord = this.cordLayerToPaint(cord);
  this.main.clearRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
};
module.exports.cleanMain = function () {
  this.main.clearRect(0, 0, this.main.canvas.width, this.main.canvas.height);
};

module.exports.paintAt = function (cord, color) {
  cord = this.cordLayerToPaint(cord);
  this.main.fillStyle = color;
  this.main.clearRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
  this.main.fillRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
  //this.main.fillRect(cord.x - 0.5, cord.y - 0.5, this.sizePointer + 0.5, this.sizePointer + 0.5);
};

module.exports.paintMain = function () {
  var height, width;
  this.cleanMain();

  // TODO: create get for "this.artboard.layer.width * this.artboard.scale" and "this.artboard.layer.height * this.artboard.scale"
  width = this.artboard.layer.width * this.artboard.scale;
  height = this.artboard.layer.height * this.artboard.scale;
  this.paintBackground();
  //imageSmoothingDisabled(this.main);
  this.main.drawImage(this.artboard.layer.context.canvas,
    0, 0, this.artboard.layer.width, this.artboard.layer.height,
    this.artboard.cord.x, this.artboard.cord.y, width, height
  );
};



