'use strict';
function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}
Vector.prototype.less = function (vector) {
	this.x -= vector.x;
	this.y -= vector.y;
};
Vector.prototype.sum = function (vector) {
	this.x += vector.x;
	this.y += vector.y;
};
Vector.prototype.diffAbs = function (vector) {
	return this.diff(vector, true);
};
Vector.prototype.diff = function (vector, abs) {
	let x = this.x - vector.x,
			y = this.y - vector.y;
	return {
		x : abs ? Math.abs(x) : x,
		y : abs ? Math.abs(y) : y,
		sx : (this.x < vector.x) ? 1 : -1,
		sy : (this.y < vector.y) ? 1 : -1
	};
};
Vector.prototype.clone = function () {
	return new Vector(this.x, this.y);
};
Vector.prototype.importantDiff = function (vector) {
	let diff = this.diff(vector, true);
	return diff.x > 1 || diff.y > 1;
};
module.exports = Vector;
