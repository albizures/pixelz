'use strict';

module.exports = function (child, father) {
	child.prototype = Object.create(father.prototype);
	child.prototype.constructor = child;
};
