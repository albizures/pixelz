const {TRANSPARENT_IMG} = require('../../constants');

module.exports.paintBackground = function () {
	let pattern = this.background.createPattern(TRANSPARENT_IMG, "repeat");
	this.cleanBackground();
	this.background.rect(this.artboard.cord.x, this.artboard.cord.y, this.artboard.layer.width * this.artboard.scale, this.artboard.layer.height * this.artboard.scale);
	this.background.fillStyle = pattern;
	this.background.fill();
};

module.exports.cleanBackground = function () {
	// FIXME: why don't work width clearRect
	this.background.canvas.width = this.background.canvas.width;
	//this.background.clearRect(0, 0, this.background.canvas.width, this.background.canvas.height);
};

