'use strict';
let imageSmoothing = function (ctx, value) {
	ctx.imageSmoothingEnabled = value;
	ctx.mozImageSmoothingEnabled = value;
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
function defineGetter(obj, name, fn) {
	Object.defineProperty(obj, name, {
		get: fn,
		enumerable: true,
		configurable: true
	});
}
//Returns true if it is a DOM node
function isNode(o) {
	return (
		typeof Node === "object" ? o instanceof Node :
		o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
	);
}

//Returns true if it is a DOM element
function isElement(o) {
	return (
		typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
		o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
	);
}
// NOTE: code taken from http://stackoverflow.com/a/2947012/4394520 with a littles chages
function make(desc) {
	if (!Array.isArray(desc)) {
		return make.call(this, Array.prototype.slice.call(arguments));
	}

	let name = desc[0],
			parent = false,
			attributes = desc[1],

			el = typeof name === 'string' ? document.createElement(name) : name,

			start = 1;
	if (typeof attributes === "object" && attributes !== null && !Array.isArray(attributes) && !isElement(attributes)) {
		for (let attr in attributes) {
			if (attr === 'parent') {
				parent = true;
			} else {
				el[attr] = attributes[attr];
			}

		}
		start = 2;
	}

	for (let i = start; i < desc.length; i++) {
		if (isElement(desc[i])) {
			el.appendChild(desc[i]);
		} else if (Array.isArray(desc[i])) {
			el.appendChild(make(desc[i]));
		} else {
			el.appendChild(document.createTextNode(desc[i]));
		}
	}
	if (parent) {
		attributes.parent.appendChild(el);
	}
	return el;
}
module.exports = {
	make,
	defineGetter,
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
		child.prototype.constructor	= child;
	}
};
module.exports.colors = require('./colors.js');
module.exports.browser = require('./browser.js');
