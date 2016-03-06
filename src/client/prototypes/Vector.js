'use strict';
var diff, abs = Math.abs;
function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector.prototype.less = function (x, y) {
	if (arguments.length == 1) {
		y = x.y;
		x = x.x;
	}
	this.x -= x;
	this.y -= y;
	return this;
};
Vector.prototype.sum = function (x, y) {
	if (arguments.length == 1) {
		y = x.y;
		x = x.x;
	}
	this.x += x;
	this.y += y;
	return this;
};
Vector.prototype.diffAbs = function (vector) {
	return {
		x : abs(this.x - vector.x),
		y : abs(this.y - vector.y),
		sx : (this.x < vector.x) ? 1 : -1,
		sy : (this.y < vector.y) ? 1 : -1
	};
};
Vector.prototype.diff = function (vector) {
	return {
		x : this.x - vector.x,
		y : this.y - vector.y,
		sx : (this.x < vector.x) ? 1 : -1,
		sy : (this.y < vector.y) ? 1 : -1
	};
};
Vector.prototype.clone = function () {
	return new Vector(this.x, this.y);
};
Vector.prototype.importantDiff = function (vector) {
	diff = this.diffAbs(vector);
	return diff.x > 1 || diff.y > 1;
};
module.exports = Vector;
