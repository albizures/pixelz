module.exports.paintMask = function () {
  var width = (this.artboard.layer.width * this.artboard.scale),
    height = (this.artboard.layer.height * this.artboard.scale);
  this.mask.fillStyle = 'gray';
  this.mask.fillRect(0, 0, this.mask.canvas.width, this.mask.canvas.width);
  this.mask.clearRect(this.artboard.cord.x, this.artboard.cord.y, width, height);
};
