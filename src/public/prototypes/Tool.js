'use strict';
function Tool(name) {
	this.name = name;
	this.stroke = [];
}
Tool.prototype.addPointStroke = function (point) {
	if (this.stroke.length == 0) {
		this.stroke.push(point);
	}else {
		let lastPoint = this.stroke[this.stroke.length - 1];
		if (point.frame.x !== lastPoint.frame.x || point.frame.y !== lastPoint.frame.y) {
			this.stroke.push(point);
		}
	}

};
Tool.prototype.cleanStroke = function () {
	let tempStroke = this.stroke;
	this.stroke = [];
	return tempStroke;
};
Tool.prototype.clonePoint = function (point) {
	return {
		frame : point.frame.clone(),
		paint : point.paint.clone(),
		out : point.out,
		color : point.color
	};
};
Tool.prototype.getLineBetween = function (point1, point2) {
	point1 = this.clonePoint(point1);
	point2 = this.clonePoint(point2);
	let diff = point1.frame.diffAbs(point2.frame, true),
			err = diff.x - diff.y;

	while (true) {
		let tempPoint = this.clonePoint(point1);
		tempPoint.paint = this.canvas.cordFrameToPaint(tempPoint.frame);
		this.canvas.previewAt(tempPoint.paint, tempPoint.color);
		this.addPointStroke(tempPoint);  // Do what you need to for this
		if ((point1.frame.x == point2.frame.x) && (point1.frame.y == point2.frame.y)) {
			break;
		}
		let e2 = 2 * err;
		if (e2 > -diff.y) {
			err -= diff.y; point1.frame.x  += diff.sx;
		}
		if (e2 < diff.x) {
			err += diff.x; point1.frame.y  += diff.sy;
		}
	}
};
module.exports = Tool;
