'use strict';
let imageSmoothing = function (ctx, value) {
	ctx.imageSmoothingEnabled = value;
	ctx.mozImageSmoothingEnabled = value;
	ctx.webkitImageSmoothingEnabled = value;
	ctx.msImageSmoothingEnabled = value;
};
function createSpan(text) {
	let newSpan = document.createElement('span');
	newSpan.textContent = text;
	let classes = Array.prototype.slice.call(arguments, 1);
	for (let i = 0; i < classes.length; i++) {
		newSpan.classList.add(classes[i]);
	}
	return newSpan;
}
function createBtn(text) {
	let newBtn = document.createElement('button');
	newBtn.textContent = text;
	let classes = Array.prototype.slice.call(arguments, 1);
	for (let i = 0; i < classes.length; i++) {
		newBtn.classList.add(classes[i]);
	}
	return newBtn;
}
function createDiv() {
	let newDiv = document.createElement('div');
	for (let i = 0; i < arguments.length; i++) {
		newDiv.classList.add(arguments[i]);
	}
	return newDiv;
}
function createInputRange(value, min, max) {
	let newInput = document.createElement('input');
	newInput.type = 'range';
	newInput.value = value;
	newInput.min = min;
	newInput.max = max;
	let classes = Array.prototype.slice.call(arguments, 2);
	for (let i = 0; i < classes.length; i++) {
		newInput.classList.add(classes[i]);
	}
	return newInput;
}
module.exports = {
	imageSmoothing,
	createBtn,
	createSpan,
	createDiv,
	createInputRange,
	imageSmoothingDisabled (ctx) {
		imageSmoothing(ctx, false);
	},
	inheritanceObject : function (child, father) {
		child.prototype = Object.create(father.prototype);
		child.prototype.constructor  = child;
	}
};
module.exports.colors = require('./colors.js');
